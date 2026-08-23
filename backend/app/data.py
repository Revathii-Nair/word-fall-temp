from collections import Counter
from datetime import datetime, timezone
import boto3

AWS_REGION = "ap-south-1"
USERS_TABLE_NAME = "WordQuestUsers"
GAMES_TABLE_NAME = "WordQuestGames"

dynamodb = boto3.resource("dynamodb", region_name=AWS_REGION)

users_table = dynamodb.Table(USERS_TABLE_NAME)
games_table = dynamodb.Table(GAMES_TABLE_NAME)

def get_user(user_id):
    response = users_table.get_item(Key={"userId": user_id,})
    user = response.get("Item")

    if user:
        return user

    user = {"userId": user_id, "name": "WordQuest Player", "email": "", "best": 0, "words": 0, "rounds": 0, "streak": 0}
    users_table.put_item(Item=user)
    return user

def update_user_after_game(user_id,score,word_count):
    user = get_user(user_id)
    current_best = int(user.get("best", 0))
    current_words = int(user.get("words", 0))
    current_rounds = int(user.get("rounds", 0))
    new_best = max(current_best,score)

    updated_user = {
        "userId": user_id,
        "name": user.get("name","WordQuest Player"),
        "email": user.get("email",""),
        "best": new_best,
        "words": current_words + word_count,
        "rounds": current_rounds + 1,
        "streak": int(user.get("streak", 0)),
    }

    users_table.put_item(Item=updated_user)
    return updated_user

def save_game(user_id,game_id, mode, grid_size, score, words, duration):
    word_count = len(words)
    word_scores = {}
    highest_word = ""
    highest_word_score = 0
    lowest_word = ""
    lowest_word_score = 0
    common_word = ""

    for word in words:
        word_scores[word] = len(word) * 10

    if words:
        highest_word = max(words, key=lambda word: len(word))
        highest_word_score = (len(highest_word) * 10)
        lowest_word = min(words, key=lambda word: len(word))
        lowest_word_score = (len(lowest_word) * 10)

    if words:
        counts = Counter(words)
        common_word = counts.most_common(1)[0][0]

    game = {
        "userId": user_id,
        "gameId": game_id,
        "date": datetime.now(timezone.utc).isoformat(),
        "mode": mode,
        "gridSize": grid_size,
        "score": score,
        "words": words,
        "wordCount": word_count,
        "highestWord": highest_word,
        "highestWordScore": highest_word_score,
        "lowestWord": lowest_word,
        "lowestWordScore": lowest_word_score,
        "commonWord": common_word,
        "duration": duration,
    }

    games_table.put_item(Item=game)
    update_user_after_game(user_id,score,word_count)
    return game

def get_game_history(user_id):
    response = games_table.query(
        KeyConditionExpression="userId = :userId", 
        ExpressionAttributeValues={":userId": user_id}
        )
    
    games = response.get("Items",[])
    games.sort(key=lambda game: game.get("date",""), reverse=True)

    return games

def get_history_with_difficulty(user_id):
    history = get_game_history(user_id)
    for game in history:
        game["difficulty"] = calculate_difficulty(user_id,game.get("wordCount", 0))

    return history

def calculate_difficulty(user_id, words):
    history = get_game_history(user_id)
    if not history:
        return 50

    total_words = 0
    for game in history:
        total_words += int(game.get("wordCount",0))

    average = (total_words / len(history))
    if average <= 0:
        return 50

    difference = (words - average)
    difficulty = 50 - (difference * 5)
    difficulty = max(0,min(100, difficulty))
    return round(difficulty)

def get_leaderboard():
    response = users_table.scan()
    leaderboard = []
    users = response.get("Items",[])
    users.sort(key=lambda user: int(user.get("best",0)), reverse=True)

    for position, user in enumerate(users,start=1):
        leaderboard.append({
                "position": position,
                "userId": user.get("userId",""),
                "name": user.get("name", "WordQuest Player"),
                "best": int(user.get("best",0)),
                "words": int(user.get("words",0))
            })
    return leaderboard

def get_user_position(user_id):
    leaderboard = get_leaderboard()
    for player in leaderboard:
        if player["userId"] == user_id:
            return player["position"]
    return None
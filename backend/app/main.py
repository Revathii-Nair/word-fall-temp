import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .game import GRID_SIZES, collect_word, new_game
from .data import calculate_difficulty,get_game_history,get_history_with_difficulty,get_leaderboard,get_user,save_game

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CURRENT_USER_ID = "user-001"
active_games = {}
next_game_id = 1


@app.get("/")
def root():
    return {"message": "WordQuest API is running."}


@app.get("/api/user")
def user():
    return get_user(CURRENT_USER_ID)


@app.get("/api/user/history")
def user_history():
    return get_history_with_difficulty(CURRENT_USER_ID)


@app.get("/api/leaderboard")
def leaderboard():
    return get_leaderboard()


@app.post("/api/game/start")
def start_game(grid: dict):
    global next_game_id

    grid_size = grid.get("gridSize", 5)
    mode = grid.get("mode", "free")

    if grid_size not in GRID_SIZES:
        return {
            "accepted": False,
            "message": "Grid size must be 5, 6, 7, 8, or 9.",
        }

    game_id = next_game_id
    next_game_id += 1
    game = new_game(grid_size)

    active_games[game_id] = {
        "userId": CURRENT_USER_ID,
        "mode": mode,
        "gridSize": grid_size,
        "game": game,
        "startedAt": time.time(),
    }

    return {
        "accepted": True,
        "gameId": game_id,
        "grid": game.grid,
        "gridSize": grid_size,
        "score": game.score,
        "found": game.found,
    }


@app.post("/api/game/reset")
def reset_game(grid: dict):
    global next_game_id

    grid_size = grid.get("gridSize", 5)

    if grid_size not in GRID_SIZES:
        return {"accepted": False, "message": "Grid size must be 5, 6, 7, 8, or 9." }

    game_id = next_game_id
    next_game_id += 1
    game = new_game(grid_size)

    active_games[game_id] = {
        "userId": CURRENT_USER_ID,
        "mode": "free",
        "gridSize": grid_size,
        "game": game,
        "startedAt": time.time(),
    }

    return {
        "accepted": True,
        "gameId": game_id,
        "grid": game.grid,
        "gridSize": grid_size,
        "score": game.score,
        "found": game.found,
    }


@app.post("/api/game/collect")
def collect(grid: dict):
    game_id = grid.get("gameId")
    cells = grid.get("cells", [])
    active_game = active_games.get(game_id)

    if not active_game:
        return {"accepted": False, "validation": {"reason": "Game not found."}}

    if active_game["userId"] != CURRENT_USER_ID:
        return {"accepted": False, "validation": { "reason": "You cannot access this game."}}

    return collect_word(active_game["game"], cells)

@app.post("/api/game/finish")
def finish_game(game_data: dict):
    game_id = game_data.get("gameId")
    active_game = active_games.get(game_id)

    if not active_game:
        return {"accepted": False, "message": "Game not found."}

    if active_game["userId"] != CURRENT_USER_ID:
        return {"accepted": False, "message": "You cannot finish this game."}

    game = active_game["game"]
    duration = int(time.time() - active_game["startedAt"])

    saved_game = save_game(
        user_id=CURRENT_USER_ID,
        game_id=game_id,
        mode=active_game["mode"],
        grid_size=active_game["gridSize"],
        score=game.score,
        words=game.found,
        duration=duration,
    )

    del active_games[game_id]
    return {"accepted": True, "game": saved_game}


@app.post("/api/daily/difficulty")
def daily_difficulty(grid: dict):
    history = get_game_history(CURRENT_USER_ID)
    words = grid.get("words", 0)

    if not history:
        return {"words": words,"averageWords": 0, "difficulty": 50}
    
    total = 0

    for game in history:
        total += int(game.get("wordCount", 0))

    average = total / len(history)
    return {
        "words": words,
        "averageWords": round(average, 2),
        "difficulty": calculate_difficulty(CURRENT_USER_ID, words)
    }
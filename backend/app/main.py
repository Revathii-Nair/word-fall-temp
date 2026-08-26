import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .game import GRID_SIZES, collect_word, new_game
from .data import get_daily_puzzle,get_game_history,get_history_with_difficulty,get_leaderboard,get_user,save_game

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

active_games = {}
next_game_id = 1


@app.get("/")
def root():
    return {"message": "WordQuest API is running."}


@app.get("/api/user")
def user(username):
    return get_user(username)


@app.get("/api/user/history")
def user_history(username):
    return get_history_with_difficulty(username)


@app.get("/api/leaderboard")
def leaderboard():
    return get_leaderboard()


@app.post("/api/game/start")
def start_game(grid: dict):
    username = grid.get("username")
    global next_game_id

    grid_size = grid.get("gridSize", 5)
    mode = grid.get("mode", "free")
    puzzle_id = None

    if grid_size not in GRID_SIZES:
        return {"accepted": False,"message": "Grid size must be 5, 6, 7, 8, or 9."}

    if mode == "daily":
        puzzle = get_daily_puzzle()
        if not puzzle:
            return {"accepted": False,"message": "Today's puzzle is not available."}

        history = get_game_history(username)
        for game in history:
            if (game.get("mode") == "daily"and game.get("puzzleId") == puzzle.get("puzzleId")):
                return {
                    "accepted": False,
                    "alreadyPlayed": True,
                    "message": "You already played today's daily."}

        grid = puzzle["grid"]
        grid_size = puzzle["gridSize"]
        puzzle_id = puzzle["puzzleId"]
        game = new_game(grid_size)
        game.grid = grid
    else:
        game = new_game(grid_size)

    game_id = next_game_id
    next_game_id += 1

    active_games[game_id] = {
        "username": username,
        "mode": mode,
        "gridSize": grid_size,
        "puzzleId": puzzle_id,
        "game": game,
        "startedAt": time.time(),
    }

    return {
        "accepted": True,
        "gameId": game_id,
        "puzzleId": puzzle_id,
        "grid": game.grid,
        "gridSize": grid_size,
        "score": game.score,
        "found": game.found,
    }


@app.post("/api/game/collect")
def collect(grid: dict):
    username = grid.get("username")
    game_id = grid.get("gameId")
    cells = grid.get("cells", [])
    active_game = active_games.get(game_id)

    if not active_game:
        return {"accepted": False, "validation": {"reason": "Game not found."}}

    if active_game["username"] != username:
        return {"accepted": False, "validation": { "reason": "You cannot access this game."}}

    return collect_word(active_game["game"], cells)

@app.post("/api/game/finish")
def finish_game(grid: dict):
    username = grid.get("username")
    game_id = grid.get("gameId")
    active_game = active_games.get(game_id)

    if not active_game:
        return {"accepted": False, "message": "Game not found."}

    if active_game["username"] != username:
        return {"accepted": False, "message": "You cannot finish this game."}

    game = active_game["game"]
    duration = int(time.time() - active_game["startedAt"])

    saved_game = save_game(
        username=username,
        game_id=game_id,
        mode=active_game["mode"],
        grid_size=active_game["gridSize"],
        score=game.score,
        words=game.found,
        duration=duration,
        puzzle_id=active_game["puzzleId"],
    )

    del active_games[game_id]
    return {"accepted": True, "game": saved_game}

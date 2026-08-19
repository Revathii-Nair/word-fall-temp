from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .game import GRID_SIZES, GameState, collect_word, new_game
from .data import (
    calculate_difficulty,
    get_game_history,
    get_history_with_difficulty,
    get_leaderboard,
    get_user,
)

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

game: GameState = new_game(5)
CURRENT_USER_ID = "user-001"


@app.get("/")
def root():
    return {"message": "Wordfall API is running."}


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
    global game

    grid_size = grid.get("gridSize", 5)

    if grid_size not in GRID_SIZES:
        return {
            "accepted": False,
            "message": "Grid size must be 5, 6, 7, 8, or 9.",
        }

    game = new_game(grid_size)

    return {
        "grid": game.grid,
        "score": game.score,
        "found": game.found,
    }


@app.post("/api/game/reset")
def reset_game(grid: dict):
    global game

    grid_size = grid.get("gridSize", 5)

    if grid_size not in GRID_SIZES:
        return {
            "accepted": False,
            "message": "Grid size must be 5, 6, 7, 8, or 9.",
        }

    game = new_game(grid_size)

    return {
        "grid": game.grid,
        "score": game.score,
        "found": game.found,
    }


@app.post("/api/game/collect")
def collect(grid: dict):
    return collect_word(
        game,
        grid["cells"],
    )


@app.post("/api/daily/difficulty")
def daily_difficulty(grid: dict):
    history = get_game_history(CURRENT_USER_ID)
    words = grid.get("words", 0)

    if not history:
        return {
            "words": words,
            "averageWords": 0,
            "difficulty": 50,
        }
    
    total = 0
    for h in history:
        total += h["words"]

    average = total / len(history) if history else 0


    return {
        "words": words,
        "averageWords": round(average, 2),
        "difficulty": calculate_difficulty(
            CURRENT_USER_ID,
            words,
        ),
    }
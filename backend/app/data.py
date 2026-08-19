DUMMY_USERS = [
    {
        "id": "user-001",
        "name": "Revathi",
        "best": 684,
        "words": 127,
        "rounds": 18,
        "streak": 5,
    },
    {
        "id": "user-002",
        "name": "Aarav",
        "best": 812,
        "words": 164,
        "rounds": 24,
        "streak": 9,
    },
    {
        "id": "user-003",
        "name": "Maya",
        "best": 591,
        "words": 103,
        "rounds": 15,
        "streak": 3,
    },
    {
        "id": "user-004",
        "name": "Arjun",
        "best": 746,
        "words": 142,
        "rounds": 21,
        "streak": 7,
    },
    {
        "id": "user-005",
        "name": "Diya",
        "best": 438,
        "words": 81,
        "rounds": 11,
        "streak": 2,
    },
    {
            "id": "user-002",
            "name": "Aarav",
            "best": 812,
            "words": 164,
            "rounds": 24,
            "streak": 9,
        },{
                "id": "user-002",
                "name": "Aarav",
                "best": 812,
                "words": 164,
                "rounds": 24,
                "streak": 9,
            },
]
DUMMY_GAME_HISTORY = {
    "user-001": [
        {
            "puzzleId": 1835,
            "words": [
                {"word": "TREE", "score": 56},
                {"word": "STAR", "score": 56},
                {"word": "WORD", "score": 56},
                {"word": "FALL", "score": 56},
                {"word": "RAIN", "score": 56},
                {"word": "GAME", "score": 56},
                {"word": "PLAY", "score": 56},
                {"word": "GRID", "score": 56},
            ],
        },
        {
            "puzzleId": 1836,
            "words": [
                {"word": "LIGHT", "score": 70},
                {"word": "WORD", "score": 56},
                {"word": "TREE", "score": 56},
                {"word": "GAME", "score": 56},
                {"word": "STAR", "score": 56},
                {"word": "PLAY", "score": 56},
                {"word": "FALL", "score": 56},
            ],
        },
        {
            "puzzleId": 1837,
            "words": [
                {"word": "RAIN", "score": 56},
                {"word": "CLOUD", "score": 70},
                {"word": "TREE", "score": 56},
                {"word": "GAME", "score": 56},
                {"word": "WORD", "score": 56},
                {"word": "PLAY", "score": 56},
                {"word": "GRID", "score": 56},
            ],
        },
        {
            "puzzleId": 1838,
            "words": [
                {"word": "PUZZLE", "score": 84},
                {"word": "WORD", "score": 56},
                {"word": "GAME", "score": 56},
                {"word": "TREE", "score": 56},
                {"word": "STAR", "score": 56},
                {"word": "PLAY", "score": 56},
                {"word": "GRID", "score": 56},
                {"word": "RAIN", "score": 56},
                {"word": "FALL", "score": 56},
            ],
        },
        {
            "puzzleId": 1839,
            "words": [
                {"word": "STAR", "score": 56},
                {"word": "TREE", "score": 56},
                {"word": "WORD", "score": 56},
                {"word": "GAME", "score": 56},
                {"word": "PLAY", "score": 56},
                {"word": "RAIN", "score": 56},
            ],
        },
        {
            "puzzleId": 1840,
            "words": [
                {"word": "CHALLENGE", "score": 126},
                {"word": "WORD", "score": 56},
                {"word": "GAME", "score": 56},
                {"word": "TREE", "score": 56},
                {"word": "STAR", "score": 56},
                {"word": "PLAY", "score": 56},
                {"word": "GRID", "score": 56},
                {"word": "RAIN", "score": 56},
            ],
        },
        {
            "puzzleId": 1841,
            "words": [
                {"word": "WORD", "score": 56},
                {"word": "TREE", "score": 56},
                {"word": "GAME", "score": 56},
                {"word": "STAR", "score": 56},
                {"word": "PLAY", "score": 56},
                {"word": "GRID", "score": 56},
                {"word": "RAIN", "score": 56},
                {"word": "FALL", "score": 56},
                {"word": "LIGHT", "score": 70},
                {"word": "CLOUD", "score": 70},
            ],
        },
    ]
}


def get_user(user_id):
    return next(
        (
            user
            for user in DUMMY_USERS
            if user["id"] == user_id
        ),
        None,
    )


def get_game_history(user_id):
    history = DUMMY_GAME_HISTORY.get(user_id, [])

    return [
        {
            "puzzleId": game["puzzleId"],
            "words": len(game["words"]),
            "wordList": game["words"],
            "score": sum(
                word["score"]
                for word in game["words"]
            ),
        }
        for game in history
    ]


def get_average_words(user_id):
    history = get_game_history(user_id)

    if not history:
        return 0

    return sum(
        game["words"]
        for game in history
    ) / len(history)


def calculate_difficulty(user_id, current_words):
    average = get_average_words(user_id)

    if average == 0:
        return 50

    difficulty = (
        50
        + ((average - current_words) / average) * 50
    )

    return round(
        max(
            0,
            min(100, difficulty),
        )
    )


def get_history_with_difficulty(user_id):
    history = get_game_history(user_id)
    result = []

    for index, game in enumerate(history):
        previous = history[:index]

        if previous:
            average = sum(
                item["words"]
                for item in previous
            ) / len(previous)

            difficulty = round(
                max(
                    0,
                    min(
                        100,
                        50
                        + (
                            (average - game["words"])
                            / average
                        ) * 50,
                    ),
                )
            )
        else:
            average = game["words"]
            difficulty = 50

        highest = max(
            game["wordList"],
            key=lambda word: word["score"],
        )

        lowest = min(
            game["wordList"],
            key=lambda word: word["score"],
        )

        result.append(
            {
                **game,
                "averageWords": round(
                    average,
                    1,
                ),
                "difficulty": difficulty,
                "highestWord": highest,
                "lowestWord": lowest,
            }
        )

    return result


def get_leaderboard():
    return sorted(
        DUMMY_USERS,
        key=lambda user: user["best"],
        reverse=True,
    )
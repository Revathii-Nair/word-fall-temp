import random
from .words import (LETTERS,WORD_BANK)

GRID_SIZES = [5, 6, 7, 8, 9]
DEFAULT_GRID_SIZE = 5

class GameState:
    def __init__(self,grid,score=0,found=None):
        self.grid = grid
        self.score = score
        self.found = found or []


def random_letter():
    return random.choice(LETTERS)


def make_grid(rows, cols):
    grid = []
    for _ in range(rows):
        row = []
        for _ in range(cols):
            row.append(random.choice(LETTERS))
        grid.append(row)
    return grid


def new_game(grid_size=DEFAULT_GRID_SIZE):
    return GameState( make_grid(grid_size, grid_size))


def get_word_from_cells(grid, cells):
    word = ""
    for row, column in cells:
        word += grid[row][column]
    return word


def is_adjacent(previous, current):
    row_distance = abs(current[0] - previous[0])
    column_distance = abs(current[1] - previous[1])

    if row_distance <= 1 and column_distance <= 1:
        return not (row_distance == 0 and column_distance == 0)
    return False



def validate_cells(grid, cells):
    if not grid or len(cells) < 3:
        return None

    rows, cols = len(grid), len(grid[0])
    previous = None

    for row, col in cells:
        if row < 0 or row >= rows or col < 0 or col >= cols:
            return None
        current = (row, col)

        if previous and not is_adjacent(previous, current):
            return None
        previous = current

    return get_word_from_cells(grid, cells)



def is_word(word):
    upper = word.upper()
    if upper in WORD_BANK:
        return upper

    reverse = upper[::-1]

    if reverse in WORD_BANK:
        return reverse
    return None


def cascade_columns(grid, cells):
    rows, cols = len(grid), len(grid[0])
    next_grid = [row[:] for row in grid]

    removed = {}
    new_cells = []

    for r, c in cells:
        if c not in removed:
            removed[c] = set()
        removed[c].add(r)

    for c, removed_rows in removed.items():
        survivors = []
        for r in range(rows - 1, -1, -1):
            if r not in removed_rows:
                survivors.append(grid[r][c])

        incoming = []
        for _ in range(len(removed_rows)):
            incoming.append(random_letter())

        column_values = survivors + incoming
        column_values = column_values[-rows:]
        column_values.reverse()

        for r in range(rows):
            next_grid[r][c] = column_values[r]
            if r < len(removed_rows):
                new_cells.append((r, c))

    return next_grid, new_cells

def collect_word(state, cells):
    raw = validate_cells(state.grid,cells)

    if not raw:
        return {
            "accepted": False,
            "validation": {"reason": "Select at least 3 adjacent letters."},
            "grid": state.grid,
            "score": state.score,
            "found": state.found,
            "newCells": [],
        }

    candidate = is_word(raw)

    if not candidate:
        return {
            "accepted": False,
            "validation": {"reason": f"{raw} is not a target word."},
            "grid": state.grid,
            "score": state.score,
            "found": state.found,
            "newCells": [],
        }

    points = len(candidate) * 10
    collapsed_grid, new_cells = cascade_columns(state.grid,cells)
    state.grid = collapsed_grid
    state.score += points
    state.found.append(candidate)

    return {
        "accepted": True,
        "word": candidate,
        "points": points,
        "grid": state.grid,
        "score": state.score,
        "found": state.found,
        "newCells": new_cells,
    }
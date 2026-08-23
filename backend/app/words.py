_WORDLIST_PATH = "app/popular.txt"

def _load_word_bank():
    with open(_WORDLIST_PATH, encoding="utf-8") as f:
        return frozenset(line.strip().upper() for line in f if line.strip())

WORD_BANK = _load_word_bank()

LETTERS = list("EEEEEEEEAAAAAAARRRRRIIIIIOOOONNNNTTTTLLLLSSSSPPCCDDMMGGHHBBFF")
GRID_SIZES = [5, 6, 7, 8, 9]
DEFAULT_GRID_SIZE = 5
ROUND_SECONDS = 90

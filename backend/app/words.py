_WORDLIST_PATH = "app/popular.txt"

def _load_word_bank():
    with open(_WORDLIST_PATH, encoding="utf-8") as f:
        return frozenset(line.strip().upper() for line in f if line.strip())

WORD_BANK = _load_word_bank()

LETTERS = list("EEEEEEEEAAAAAAARRRRRIIIIIOOOONNNNTTTTLLLLSSSSPPCCDDMMGGHHBBFF")
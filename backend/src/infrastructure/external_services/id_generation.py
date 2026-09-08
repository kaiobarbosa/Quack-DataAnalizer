import secrets
import string


def generate_id():
    characters = string.ascii_letters + string.digits

    return ''.join(secrets.choice(characters) for _ in range(8))

print(generate_id())
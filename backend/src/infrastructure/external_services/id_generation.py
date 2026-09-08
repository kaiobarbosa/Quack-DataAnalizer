import secrets
import string

from src.infrastructure.repository.chack_id_generated import check_id_generated_repository


def generate_id():
    characters = string.ascii_letters + string.digits

    id_generated = ''.join(secrets.choice(characters) for _ in range(8))

    if check_id_generated_repository(id_generated) == False:
        return generate_id()  # Recursively generate a new ID if it already exists
    
    return id_generated

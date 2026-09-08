import bcrypt

from src.infrastructure.repository.enterprise_repository.verify_password_repository import verify_password_repository

def verify_password(password, data):

    cnpj = data['cnpj']

    password_from_db = verify_password_repository(cnpj)
    
    password_bytes = password.encode("utf-8")
    hashed_password_bytes = password_from_db.encode("utf-8")

    return bcrypt.checkpw(password_bytes, hashed_password_bytes)
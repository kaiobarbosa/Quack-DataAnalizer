import bcrypt

from src.infrastructure.repository.enterprise_repository.verify_password_repository import verify_password_repository
from src.infrastructure.repository.user_pf_repository.verify_password_user_repository import verify_password_by_email_repository

def verify_password(password, data):

    cnpj = data['cnpj']

    password_from_db = verify_password_repository(cnpj)
    
    password_bytes = password.encode("utf-8")
    hashed_password_bytes = password_from_db.encode("utf-8")

    return bcrypt.checkpw(password_bytes, hashed_password_bytes)

def verify_password_email(password, data):

    email = data['email']

    password_from_db = verify_password_by_email_repository(email)
    
    password_bytes = password.encode("utf-8")
    hashed_password_bytes = password_from_db.encode("utf-8")

    return bcrypt.checkpw(password_bytes, hashed_password_bytes)
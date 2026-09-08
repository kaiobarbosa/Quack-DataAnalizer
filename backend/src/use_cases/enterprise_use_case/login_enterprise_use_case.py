from src.domain.enterprise_domain.validation_enterprise.validation_cnpj import validate_cnpj
from src.infrastructure.external_services.verify_password import verify_password

import os
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone


def enterprise_login(data):

    if data.get('cnpj') is None or data.get('password') is None:
        return {"message": "CNPJ and password are required"}, 400

    if validate_cnpj(data['cnpj']) == False:
            return {"message": "Invalid CNPJ format"}, 400

    if verify_password(data['password'], data) == False:
        return {"message": "Invalid password"}, 401
    else:
        return {
            "message": "Enterprise login successfully"
        }, 201

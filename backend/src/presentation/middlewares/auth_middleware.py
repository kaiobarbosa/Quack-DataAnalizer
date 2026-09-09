import jwt
from functools import wraps
from flask import request, jsonify, current_app

def token_obrigatorio(f):
    @wraps(f)
    def decorador(*args, **kwargs):
        # 1. Tenta pegar o token do cookie (Funciona na Web)
        token = request.cookies.get('access_token')

        # 2. Se não tem no cookie, tenta pegar do Header (Funciona no Electron)
        if not token:
            auth_header = request.headers.get('Authorization')
            if auth_header and auth_header.startswith('Bearer '):
                # O header vem assim: "Bearer eyJhbGci..."
                # O .split(' ')[1] pega apenas a parte do token
                token = auth_header.split(' ')[1]

        if not token:
            return jsonify({'message': 'Acesso negado. Token não fornecido!'}), 401

        try:
            dados_token = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'A sessão expirou. Faça login novamente!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token inválido!'}), 401

        return f(dados_token, *args, **kwargs)
    
    return decorador

import jwt
from functools import wraps
from flask import request, jsonify, current_app

# DECORADOR EXCLUSIVO PARA EMPRESAS (PJ)
def token_pj_obrigatorio(f):
    @wraps(f)
    def decorador(*args, **kwargs):
        token = request.cookies.get('access_token')

        if not token:
            auth_header = request.headers.get('Authorization')
            if auth_header and auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]

        if not token:
            return jsonify({'message': 'Acesso negado. Token não fornecido!'}), 401

        try:
            dados_token = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            
            # --- AQUI ACONTECE A VERIFICAÇÃO DE SEGURANÇA ---
            if dados_token.get('role') != 'pj':
                return jsonify({'message': 'Acesso negado. Apenas empresas podem realizar esta ação!'}), 403
                
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'A sessão expirou. Faça login novamente!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token inválido!'}), 401

        return f(dados_token, *args, **kwargs)
    
    return decorador

# DECORADOR EXCLUSIVO PARA FUNCIONÁRIOS (PF)
def token_pf_obrigatorio(f):
    @wraps(f)
    def decorador(*args, **kwargs):
        # 1. Libera a requisição invisível do CORS (OPTIONS)
        if request.method == 'OPTIONS':
            return jsonify({}), 200

        token = None

        # 2. Tenta pegar do Header PRIMEIRO (Sempre será o mais atualizado pelo seu JS)
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]

        # 3. Só se não tiver Header, tenta ler o cookie
        if not token:
            token = request.cookies.get('access_token')

        if not token:
            return jsonify({'message': 'Acesso negado. Token não fornecido!'}), 401

        try:
            dados_token = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            
            if dados_token.get('role') != 'pf':
                return jsonify({'message': 'Acesso negado. Apenas funcionários podem realizar esta ação!'}), 403
                
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'A sessão expirou. Faça login novamente!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token inválido!'}), 401

        return f(dados_token, *args, **kwargs)
    
    return decorador

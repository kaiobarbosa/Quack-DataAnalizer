import jwt
from functools import wraps
from flask import request, jsonify, current_app

def token_obrigatorio(f):
    @wraps(f)
    def decorador(*args, **kwargs):
        # 1. Tenta buscar o cookie chamado 'access_token' que criamos no login
        token = request.cookies.get('access_token')

        # 2. Se não tem token, o usuário não está logado
        if not token:
            return jsonify({'message': 'Acesso negado. Token não fornecido!'}), 401

        # 3. Tenta descriptografar e validar o token
        try:
            # O jwt.decode já verifica se a assinatura é válida usando sua SECRET_KEY
            # e também verifica automaticamente a data de expiração ('exp')
            dados_token = jwt.decode(
                token, 
                current_app.config['SECRET_KEY'], 
                algorithms=['HS256']
            )

            print(f'Dados do token descriptografado: {dados_token}')
            
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'A sessão expirou. Faça login novamente!'}), 401
            
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token inválido!'}), 401

        # 4. Se deu tudo certo, passa os dados descriptografados para a rota
        return f(dados_token, *args, **kwargs)
    
    return decorador

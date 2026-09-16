from flask import Blueprint, jsonify, make_response

blueprint_logout = Blueprint('blueprint_logout', __name__)

@blueprint_logout.route('/logout', methods=['POST'])
def logout():
    # Cria uma resposta de sucesso
    response = make_response(jsonify({"message": "Logout realizado com sucesso!"}), 200)
    
    # Deleta o cookie do navegador sobrescrevendo com uma data expirada
    response.set_cookie('access_token', '', expires=0, httponly=True, samesite='Lax')
    
    return response

from flask import Blueprint, request, jsonify

blueprint_create_user_pj = Blueprint('blueprint_create_user_pj', __name__)

@blueprint_create_user_pj.route('/create_user_pj', methods=['POST'])
def insert_user_pj():
    brute_data = request.get_json()
    print(brute_data)

    return jsonify({"message": "Data received successfully"}), 201
from flask import Blueprint, request, jsonify
from src.use_cases.confirmed_password import compare_passwords

blueprint_create_enterprise = Blueprint('blueprint_create_enterprise', __name__)

@blueprint_create_enterprise.route('/create_enterprise', methods=['POST'])
def insert_enterprise():
    brute_data = request.get_json()
    print(brute_data)

    if compare_passwords(brute_data['password'], brute_data['confirm_password']) == False:
        return jsonify({"message": "Passwords do not match"}), 400

    return jsonify({"message": "Data received successfully"}), 201
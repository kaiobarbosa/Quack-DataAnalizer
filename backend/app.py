import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv() 

from src.presentation.enterprise.route_create_enterprise import blueprint_create_enterprise
from src.presentation.enterprise.login_enterprise_route import blueprint_login_enterprise
from src.presentation.enterprise.route_select_enterprise_data import blueprint_select_enterprise_data
from src.presentation.enterprise.route_select_all_enterprises import blueprint_select_all_enterprises

from src.presentation.department.route_create_department import blueprint_create_department
from src.presentation.department.route_select_all_departments import blueprint_select_all_departments
from src.presentation.department.route_get_departments_by_enterprise import blueprint_select_departments_by_enterprise

app = Flask(__name__)

# ATENÇÃO: supports_credentials=True é OBRIGATÓRIO para o navegador aceitar cookies via API
CORS(app, supports_credentials=True) 

# Passando a chave do .env para a configuração do Flask
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

UPLOAD_FOLDER = 'static/uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.register_blueprint(blueprint_create_enterprise)
app.register_blueprint(blueprint_login_enterprise)
app.register_blueprint(blueprint_select_enterprise_data)
app.register_blueprint(blueprint_create_department)
app.register_blueprint(blueprint_select_all_departments)
app.register_blueprint(blueprint_select_all_enterprises)
app.register_blueprint(blueprint_select_departments_by_enterprise)

if __name__ == "__main__":
    app.run(debug=True, port=5000)

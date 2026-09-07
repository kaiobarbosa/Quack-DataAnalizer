from flask import Flask
from flask_cors import CORS

from src.presentation.enterprise.route_create_enterprise import blueprint_create_enterprise

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'static/uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.register_blueprint(blueprint_create_enterprise)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
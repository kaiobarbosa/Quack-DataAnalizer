from flask import Flask
from flask_cors import CORS

from src.presentation.user_pf.route_create_user_pj import blueprint_create_user_pj

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'static/uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.register_blueprint(blueprint_create_user_pj)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
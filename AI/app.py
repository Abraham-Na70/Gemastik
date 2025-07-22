import os 
from dotenv import load_dotenv
from flask import blueprints
from flask import Flask
from flask_cors import CORS

from routes.routes import api

def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False

    app.register_blueprint(api)
    CORS(app, resources={r"/*": {"origins": "*"}})
    return app

if __name__ == "__main__":
    load_dotenv()
    
    app = create_app()
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5050)), debug=True)


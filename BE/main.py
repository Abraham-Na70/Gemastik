from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from config.config import Config
from extensions.mongo import mongo
from flasgger import Swagger
# import os
# import uvicorn

from routes.routes import api

def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    app.config.from_object(Config)

    mongo.init_app(app)

    # os.environ['WERKZEUG_RUN_MAIN'] = 'true'

    app.register_blueprint(api)
    Swagger(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=8000, debug=True, use_reloader=False)
# if __name__ == "__main__":
#     uvicorn.run("main:app", port=5000, log_level="info")
    # List semua route yang sudah terdaftar
    # with app.test_request_context():
    #     for rule in app.url_map.iter_rules():
    #         methods = ', '.join(rule.methods - {'HEAD', 'OPTIONS'})  # Hilangkan metode default Flask
    #         print(f"URL: {rule.rule}, Methods: {methods}, Endpoint: {rule.endpoint}")
    # app.run(host='0.0.0.0', port=5050, debug=True)

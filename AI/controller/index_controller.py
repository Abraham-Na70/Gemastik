from flask import Blueprint, jsonify

def index():
    return jsonify({
        'message': 'Hello, World!'
    })
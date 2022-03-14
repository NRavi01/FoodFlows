#!/usr/local/bin/python -B
# server.py

from flask import Flask


app = Flask(__name__)


# Home
@app.route('/', methods=['GET'])
def get_home():
    return 'Welcome to FoodFlows!', 200


if __name__ == '__main__':
    app.run('0.0.0.0', 80, debug=False)

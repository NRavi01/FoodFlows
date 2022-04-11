#!/usr/local/bin/python -B
# server.py

from subprocess import Popen, PIPE, DEVNULL
from flask import Flask, jsonify, request, session


app = Flask(__name__)

app.secret_key = Popen(['uuidgen', '-r'], stdout=PIPE, stderr=DEVNULL).communicate()[0].decode().strip()

items = {
    'grapes': {'category': 'fruits', 'price': 5.29},
    'apples': {'category': 'fruits', 'price': 3.63},
    'bananas': {'category': 'fruits', 'price': 4.81},
    'bread': {'category': 'grains', 'price': 2.64}
}


# Home
@app.route('/', methods=['GET'])
def get_home():
    return 'Welcome to FoodFlows!', 200


@app.route('/item/search', methods=['GET'])
def get_item_search():
    search_results = {}
    name = request.args.get('name', '')
    for item in items:
        if name.lower() in item.lower():
            search_results[item] = items[item]
    return jsonify(search_results), 200


@app.route('/item/add', methods=['POST'])
def post_item_add():
    item = request.form.get('name')
    if item in items:
        if 'cart' not in session:
            session['cart'] = {}

        if item not in session.get('cart'):
            new_cart = session.get('cart')
            new_cart[item] = 1
            session['cart'] = new_cart
        else:
            new_cart = session.get('cart')
            new_cart[item] += 1
            session['cart'] = new_cart

        return 'HTTP 200', 200
    return 'HTTP 400', 400


@app.route('/chart/pie', methods=['GET'])
def get_pie_chart():
    categories = {'fruits': 0, 'vegetables': 0, 'grains': 0, 'proteins': 0, 'dairy': 0}
    if 'cart' in session:
        for item, count in session.get('cart').items():
            categories[items[item]['category']] += count
    return jsonify(list(categories.values())), 200


@app.route('/getStoreInformation', methods=['GET', 'POST'])
def get_store_information():
    return jsonify({
        'Fruits': {'Apple': '3.00', 'Orange': '4.00', 'Grape': '2.50'},
        'Vegetables': {'Eggplant': '5.00'},
        'Grains': {'Wholewheat Bread': '2.50'},
        'Proteins': {'Chicken': '7.50'},
        'Dairy': {'Milk': '4.00', 'Yogurt': '3.00'}
    }), 200


@app.route('/logout', methods=['GET'])
def get_logout():
    session.clear()
    return 'HTTP 200', 200


if __name__ == '__main__':
    app.run('0.0.0.0', 80, debug=False)

#!/usr/local/bin/python -B
# server.py

from random import random
from datetime import datetime, timedelta
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


@app.route('/item/list', methods=['GET'])
def get_item_list():
    item_list = []
    if 'cart' in session:
        for item in session.get('cart'):
            item_list.append({'name': item, 'price': items[item]['price'], 'quantity': session.get('cart')[item], 'average_price': 0.0})
    return jsonify(item_list), 200


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
        cart = session.get('cart', {})

        if item not in cart:
            cart[item] = 1
        else:
            cart[item] += 1

        session['cart'] = cart
        return 'HTTP 200', 200
    return 'HTTP 400', 400


@app.route('/item/delete', methods=['DELETE'])
def delete_item():
    item = request.form.get('name')
    if item in items:
        cart = session.get('cart', {})

        if item in cart:
            cart.pop(item)

        session['cart'] = cart
        return 'HTTP 200', 200
    return 'HTTP 400', 400


@app.route('/chart/food_category_pie', methods=['GET'])
def get_food_category_pie_chart():
    categories = {'fruits': 0, 'vegetables': 0, 'grains': 0, 'proteins': 0, 'dairy': 0}
    if 'cart' in session:
        for item, count in session.get('cart').items():
            categories[items[item]['category']] += items[item]['price'] * count
    return jsonify({'labels': list(categories.keys()), 'series': list(categories.values())}), 200


@app.route('/chart/historical_expenses_line', methods=['GET'])
def get_historical_expenses_line_chart():
    current_expenses = sum(count * items[item]['price'] for item, count in session.get('cart', {}).items())

    historical_expenses = session.get('historical_expenses', {})

    if not historical_expenses:
        margin, base = 50, 30
        for trip in range(5):
            timestamp_lower = (datetime.now() - timedelta(days=60)).timestamp()
            timestamp_upper = (datetime.now() - timedelta(days=7)).timestamp()
            date = datetime.fromtimestamp(random() * (timestamp_upper - timestamp_lower) + timestamp_lower).strftime('%Y-%m-%d')
            historical_expenses[date] = round(random() * margin + base, 2)
        session['historical_expenses'] = historical_expenses

    historical_expenses[datetime.now().strftime('%Y-%m-%d')] = current_expenses

    historical_expenses_labels = []
    historical_expenses_series = []
    for date in sorted(historical_expenses.keys()):
        historical_expenses_labels.append(datetime.strptime(date, '%Y-%m-%d').strftime('%-m/%-d'))
        historical_expenses_series.append(historical_expenses[date])

    return jsonify({'labels': historical_expenses_labels, 'series': historical_expenses_series}), 200


@app.route('/getStoreInformation', methods=['GET', 'POST'])
def get_store_information():
    return jsonify({
        'Fruits': {'Apple': '3.00', 'Orange': '4.00', 'Grape': '2.50'},
        'Vegetables': {'Eggplant': '5.00'},
        'Grains': {'Wholewheat Bread': '2.50'},
        'Proteins': {'Chicken': '7.50'},
        'Dairy': {'Milk': '4.00', 'Yogurt': '3.00'}
    }), 200


if __name__ == '__main__':
    app.run('0.0.0.0', 80, debug=False)

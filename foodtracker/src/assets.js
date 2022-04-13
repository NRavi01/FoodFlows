function searchItem () {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onload = function () {
        let items = JSON.parse(this.responseText);
        let domHtmlListString = '';
        for (let item in items) {
            domHtmlListString += `<br>
<li style="float: right;">
    <span style="font-size: 20px;">
        ${item[0].toUpperCase() + item.slice(1)}
        -
        <span style="font-weight: bold;">
            $${(Math.round(items[item]['price'] * 100) / 100).toFixed(2)}
        </span>
    </span>
    &emsp;&emsp;
    <button onclick="addItem(this);" data-item-name="${item}">+ ADD</button>
</li>
`;
        }

        document.querySelector('#item-results').innerHTML = domHtmlListString.slice(4);
    };

    xmlHttpRequest.open('GET', '/api/item/search?name=' + document.querySelector('input#item-search-input').value);
    xmlHttpRequest.send();
}

function updateResults() {
    window.location.hash = '#results'
    window.location.reload();
}

function addItem (element) {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onload = updateResults;

    xmlHttpRequest.open('POST', '/api/item/add');
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpRequest.send('name=' + element.getAttribute('data-item-name'));

    document.querySelector('#item-results').innerHTML = '';
}

function deleteItem (element) {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onload = updateResults;

    xmlHttpRequest.open('DELETE', '/api/item/delete');
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpRequest.send('name=' + element.getAttribute('data-item-name'));
}

function renderTable() {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onload = function () {
        let items = JSON.parse(this.responseText);
        let domHtmlTableString = `<thead>
    <tr>
        <th>Item</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Average Price</th>
        <th>Remove</th>
    </tr>
</thead>
<tbody>`;

        for (let i = 0; i < items.length; ++i) {
            domHtmlTableString += `<tr>
    <td>${items[i]['name'][0].toUpperCase() + items[i]['name'].slice(1)}</td>
    <td>$${(Math.round(items[i]['price'] * 100) / 100).toFixed(2)}</td>
    <td>${items[i]['quantity']}</td>
    <td>$${(Math.round(items[i]['average_price'] * 100) / 100).toFixed(2)}</td>
    <td>
        <button onclick="deleteItem(this);" data-item-name="${items[i]['name']}">Delete</button>
    </td>
</tr>`;
        }

        document.querySelector('table#item-table').innerHTML = domHtmlTableString + '</tbody>';
    }

    xmlHttpRequest.open('GET', '/api/item/list');
    xmlHttpRequest.send();
}


document.querySelector('input#item-search-input').setAttribute('onkeydown', 'if (event.key == "Enter") searchItem();');
document.querySelector('button#item-search-button').setAttribute('onclick', 'searchItem();');

renderTable();

// Hide results section unless explicitly viewing with #results
if (window.location.hash !== '#results') {
    document.querySelector('section#results').style['display'] = 'none';
}

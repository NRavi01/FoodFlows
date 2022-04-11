function searchItem() {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onload = function() {
        let items = JSON.parse(this.responseText);
        let domListString = '';
        for (let item in items) {
            domListString += `<br>
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
        document.querySelector('#item-results').innerHTML = domListString.slice(4);
    };

    xmlHttpRequest.open('GET', '/api/item/search?name=' + document.querySelector('input#item-search-input').value);
    xmlHttpRequest.send();
}

function addItem(element) {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onload = function() {
        window.location.reload();
    }

    xmlHttpRequest.open('POST', '/api/item/add');
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpRequest.send('name=' + element.getAttribute('data-item-name'));

    document.querySelector('#item-results').innerHTML = '';
}

document.querySelector('input#item-search-input').setAttribute('onkeydown', 'if (event.key == "Enter") searchItem();');
document.querySelector('button#item-search-button').setAttribute('onclick', 'searchItem();');

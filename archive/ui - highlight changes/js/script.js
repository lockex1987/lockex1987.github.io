function generateRandomData() {
    var row = Math.floor(Math.random() * (7 - 1)) + 1;
    var weight = Math.floor(Math.random() * 50000);
    weight = weight - (weight % 5000) + 10000;
    var cell = document.querySelector('table tr:nth-child(' + row + ') .weight');
    highlightChange(cell, weight);
}

function highlightChange(cell, text) {
    var className = 'new';

    // Change background to "new"
    cell.classList.add(className);

    // Wait a beat and then show the new value
    setTimeout(function () {
        cell.textContent = text;
    }, 150);

    // Remove the background
    setTimeout(function () {
        cell.classList.remove(className);
    }, 2000);
}

/**
 * Highlight thông tin vừa sửa trong 3 s.
 * @param id DOM ID của thông tin
 */
function highlightChangedField(el) {
    el.classList.add('highlighted');
    setTimeout(function () {
        el.classList.remove('highlighted');
    }, 3000);
}

function highlightMyDiv() {
    var el = document.querySelector('#myDiv');
    highlightChangedField(el);
}

setInterval(generateRandomData, 5 * 1000);

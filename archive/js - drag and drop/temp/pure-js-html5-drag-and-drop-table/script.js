/*
 * NOTE: NOT TESTED IN IE
 * SHOULD WORK IN: IE 10+, Edge, FireFox, Chrome, Safari and Opera
 * WONT WORK IN: Mobile Browsers
 * http://caniuse.com/#feat=dragndrop
 *
 * In Firefox the ghost image doesn't show nicely. I didn't have that issue 
 * when testing in the same version of FireFox on a real project so might
 * somehow be related to codepen. Setting tr opacity on drag to a value 
 * < 0.5 seems to make the ghost disappear entirely so that looks nicer
 *
 * In production the document selectors would need to be more specific if 
 * more than one table exists on the page. Also encapsulating into an 
 * object would probably be a good idea.
 */

var dragged = null;

function updateRows(rowAtInsert) {
    var insertIndex = 0;
    var foundIndex = false;
    var newRows = [];

    var tbody = document.querySelector('tbody');
    var rows = tbody.querySelectorAll('tr');

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (row !== dragged) {
            newRows.push(row);
        }

        if (row === rowAtInsert) {
            foundIndex = true;
        } else if (!foundIndex) {
            insertIndex++;
        }
    }

    newRows.splice(insertIndex, 0, dragged);

    for (var i = 0; i < newRows.length; i++) {
        tbody.appendChild(newRows[i]);
    }
}

// {{{ Drag callbacks
function rowDragStart(e) {
    e.dataTransfer.setData("text/plain", '');
    e.target.style.opacity = '0.49'; //setting less than 0.5 seems to make ghost disapear in FireFox
    dragged = e.target;
}

function rowDragEnd(e) {
    dragged = null;
    e.target.style.opacity = '';
}

function rowDrop(e) {
    e.preventDefault();
}

function rowDragOver(e) {
    e.preventDefault();
    var tr = e.target.parentElement;
    updateRows(tr);
}

// }}}

// Initialization 

var rows = document.querySelectorAll('table > tbody > tr');
for (var i = 0; i < rows.length; i++) {
    rows[i].addEventListener('dragover', rowDragOver);
}

document.addEventListener('dragstart', rowDragStart);
document.addEventListener('dragend', rowDragEnd);
document.addEventListener('drop', rowDrop);
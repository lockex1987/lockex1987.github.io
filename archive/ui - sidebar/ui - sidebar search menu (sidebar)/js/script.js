var input = document.getElementById('mySearch');
var ul = document.getElementById('myMenu');
var li = ul.getElementsByTagName('li');
var links = ul.getElementsByTagName('a');

function myFunction() {
    var filter = input.value.toLowerCase();
    for (var i = 0; i < li.length; i++) {
        li[i].style.display = (links[i].textContent.toLowerCase().indexOf(filter) >= 0) ? '' : 'none';
    }
}

input.onkeyup = myFunction;
var swipeIt = new SwipeMouse('.swipe', { minDistance: 80 })
    .on('swipeRight', function (e) {
        print(`#${this.id} right`);
    })
    .on('swipeLeft', function (e) {
        print(`#${this.id} left`);
    })
    .on('swipeUp', function (e) {
        print(`#${this.id} up`);
    })
    .on('swipeDown', function (e) {
        print(`#${this.id} down`);
    });

function print(_str) {
    var log = document.getElementById('log');
    var li = document.createElement('li');
    var text = document.createTextNode(_str);
    li.appendChild(text);
    log.appendChild(li);
}
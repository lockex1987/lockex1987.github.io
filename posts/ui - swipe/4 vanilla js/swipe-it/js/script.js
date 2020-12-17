var log = document.getElementById('log');

var swipeIt = new SwipeIt('.swipe', { minDistance: 80 });
swipeIt
    .on('swipeRight', function (e) {
        print(`#${this.id} is on swipeRight with ${e.swipe.distance} px!`);
    })
    .on('swipeLeft', function (e) {
        print(`#${this.id} is on swipeLeft with ${e.swipe.distance} px!`);
    })
    .on('swipeUp', function (e) {
        print(`#${this.id} is on swipeUp with ${e.swipe.distance} px!`);
    })
    .on('swipeDown', function (e) {
        print(`#${this.id} is on swipeDown with ${e.swipe.distance} px!`);
    });

function print(_str) {
    var li = document.createElement('li');
    var text = document.createTextNode(_str);
    li.appendChild(text);
    log.appendChild(li);
}

document.getElementById('btn').addEventListener('click', function () {
    while (log.firstChild) {
        log.removeChild(log.firstChild);
    }
});

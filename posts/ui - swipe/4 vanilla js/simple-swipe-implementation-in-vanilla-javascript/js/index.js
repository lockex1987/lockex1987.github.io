var startX;
var startY;
var endX;
var endY;

function handleTouch(cbL, cbR) {
    var xDist = endX - startX;
    var yDist = endY - startY;
    if (endX - startX < 0) {
        cbL();
    } else {
        cbR();
    }
}

var left = () => {
    document.querySelector('.desc').textContent = 'You swipped left!';
    document.querySelector('.container').style.background = '#D8335B'
}

var right = () => {
    document.querySelector('.desc').textContent = 'You swipped right!';
    document.querySelector('.container').style.background = '#2C82C9'
}

window.addEventListener('touchstart', function (evt) {
    startX = evt.touches[0].clientX;
    startY = evt.touches[0].clientY;
});

window.addEventListener('touchend', function (evt) {
    endX = evt.changedTouches[0].clientX;
    endY = evt.changedTouches[0].clientY;

    handleTouch(left, right);
});

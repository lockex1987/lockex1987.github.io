var charElements = [];
var position = [];
var paddingLeft = 50;
var isStart = true;

function anagramAnimation(source, dest) {
    var anagram = document.getElementById('anagram');
    var notMarked = [];
    var i, j;

    // Add DOM elements
    for (i = 0; i < source.length; i++) {
        notMarked.push(true);
        position.push(-1);

        var span = document.createElement('span');
        span.textContent = source.charAt(i);
        span.style.left = (paddingLeft + i * 20) + 'px';
        span.style.top = '100px';
        anagram.appendChild(span);

        charElements.push(span);
    }

    // Calculate the new position of each character in the destination text
    for (i = 0; i < source.length; i++) {
        var c = source.charAt(i);
        for (j = 0; j < dest.length; j++) {
            if (notMarked[j] && dest.charAt(j) == c) {
                notMarked[j] = false;
                position[i] = j;
                break;
            }
        }
    }
}

// Start animation (from source to destination)
// There is a delay between characters
function start() {
    for (var i = 0; i < charElements.length; i++) {
        var span = charElements[i];
        setTimeout(startClosure(i, span), i * 100);
    }
}

function startClosure(ix, spanx) {
    return function () {
        spanx.style.left = (paddingLeft + position[ix] * 20) + 'px';
        spanx.style.top = '200px';
    };
}

// Animation from destination to source
function end() {
    for (var i = 0; i < charElements.length; i++) {
        var span = charElements[i];
        setTimeout(endClosure(i, span), i * 100);
    }
}

function endClosure(ix, spanx) {
    return function () {
        spanx.style.left = (paddingLeft + ix * 20) + 'px';
        spanx.style.top = '100px';
    };
}

function change() {
    if (isStart) {
        start();
    } else {
        end();
    }
    isStart = !isStart;
}

anagramAnimation('tommarvoloriddle', 'iamlordvoldemort');
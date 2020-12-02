function checkLowerRange(lowerRange) {
    lowerRange.value = Math.min(lowerRange.value, lowerRange.parentNode.childNodes[5].value - 1);
    let value = (lowerRange.value / parseInt(lowerRange.max)) * 100
    var children = lowerRange.parentNode.childNodes[1].childNodes;
    children[1].style.width = value + '%';
    children[5].style.left = value + '%';
    children[7].style.left = value + '%';
    children[11].style.left = value + '%';
    children[11].childNodes[1].innerHTML = lowerRange.value;
}

function checkUpperRange(upperRange) {
    upperRange.value = Math.max(upperRange.value, upperRange.parentNode.childNodes[3].value - (-1));
    let value = (upperRange.value / parseInt(upperRange.max)) * 100
    var children = upperRange.parentNode.childNodes[1].childNodes;
    children[3].style.width = (100 - value) + '%';
    children[5].style.right = (100 - value) + '%';
    children[9].style.left = value + '%';
    children[13].style.left = value + '%';
    children[13].childNodes[1].innerHTML = upperRange.value;
}
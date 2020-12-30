const donut = document.querySelector('.donut');

function setThreeqQuarter() {
    donut.className = 'donut three-quarter-filled';
    // setTimeout(setOneQuater, 3000);
}

function setOneQuater() {
    donut.className = 'donut one-quarter-filled';
    setTimeout(setHalf, 3000);
}

function setHalf() {
    donut.className = 'donut half-filled';
    setTimeout(setThreeqQuarter, 3000);
}

// setThreeqQuarter();

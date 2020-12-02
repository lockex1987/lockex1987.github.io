function updateChartValue() {
    let newVal = Math.floor((Math.random() * 179) + 1);

    let mask = document.querySelector('.gauge--3 .semi-circle--mask');
    mask.setAttribute('style', 'transform: rotate(' + newVal + 'deg);');
}

setInterval(updateChartValue, 1000);

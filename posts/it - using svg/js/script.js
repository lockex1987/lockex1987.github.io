function loadSvg(svgUrl, containerId, callback) {
    fetch(svgUrl)
        .then(resp => resp.text())
        .then(code => {
            document.getElementById(containerId).innerHTML = code;
            if (callback) {
                callback();
            }
        });
}

loadSvg('images/kiwi.svg', 'demo');

loadSvg('images/vn-all.svg', 'map');

loadSvg('images/world-map-2.svg', 'countries', () => {
    document.querySelectorAll('#countries path').forEach((path, idx) => {
        const COLORS = ['red', 'green', 'blue', 'yellow'];
        path.style.fill = COLORS[idx % COLORS.length];
        if (!path.dataset.name) {
            console.log(path.id);
        }
    });
});

document.addEventListener('click', (evt) => {
    const path = evt.target.closest('#countries path');
    if (path) {
        // console.log
        alert('You clicked on ' + path.dataset.name);
    }
});


const tooltip = document.querySelector('.map-tooltip');
document.querySelector('#map').addEventListener('mousemove', function (evt) {
    if (evt.target.tagName.toLowerCase() == 'path') {
        tooltip.style.display = 'block';
        tooltip.style.left = (evt.pageX - 50) + 'px';
        tooltip.style.top = (evt.pageY - 60) + 'px';
        tooltip.textContent = evt.target.querySelector('hc-key').textContent;
    } else {
        tooltip.style.display = 'none';
    }
});


function trimSvgWhitespace(svg) {
    const bbox = svg.getBBox();
    const viewBox = [bbox.x, bbox.y, bbox.width, bbox.height].join(' ');
    svg.setAttribute('viewBox', viewBox);
}

trimSvgWhitespace(document.querySelector('#envelopeSvg'));

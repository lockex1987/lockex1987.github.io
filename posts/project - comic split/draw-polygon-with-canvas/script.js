// Đối tượng canvas
const canvas = document.querySelector('#myCanvas');
// Đối tượng context của canvas để vẽ
const context = canvas.getContext('2d');
// Đối tượng ảnh
const imageObj = new Image();
// Danh sách các điểm
const clicks = [];


/**
 * Vẽ đa giác.
 */
function drawPolygon() {
    context.fillStyle = 'rgba(100, 100, 100, 0.5)';
    context.strokeStyle = '#df4b26';
    context.lineWidth = 1;

    context.beginPath();
    context.moveTo(clicks[0].x, clicks[0].y);
    for (let i = 1; i < clicks.length; i++) {
        context.lineTo(clicks[i].x, clicks[i].y);
    }
    context.closePath();
    context.fill();
    context.stroke();
}


/**
 * Vẽ các điểm.
 */
function drawPoints() {
    context.strokeStyle = '#df4b26';
    context.lineJoin = 'round';
    context.lineWidth = 5;

    for (let i = 0; i < clicks.length; i++) {
        context.beginPath();
        context.arc(clicks[i].x, clicks[i].y, 3, 0, 2 * Math.PI, false);
        context.fillStyle = '#ffffff';
        context.fill();
        context.lineWidth = 5;
        context.stroke();
    }
}


function redraw() {
    context.drawImage(imageObj, 0, 0);
    drawPolygon();
    drawPoints();
}


function init() {
    imageObj.addEventListener('load', () => {
        canvas.width = imageObj.width;
        canvas.height = imageObj.height;
        context.drawImage(imageObj, 0, 0);
    });

    imageObj.src = 'https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';

    // Khi click thì thêm điểm
    canvas.addEventListener('mouseup', (evt) => {
        clicks.push({
            x: evt.offsetX,
            y: evt.offsetY
        });

        redraw();
    });

    // TODO: drag điểm
}


init();

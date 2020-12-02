function drawRadarChartWithCanvas() {
    // Config (lib)
    var id = 'noLibRadarChart';
    var width = 300;
    var height = 300;
    var axis = 5;
    var radius = 25;
    var maxPoint = 5;
    var data = [1.5, 2, 3, 4, 2.5, 3, 2.5];
    //var labels = ['SPD', 'SHT', 'MEN', 'TEC', 'STA'];
    var baseStroke = 'rgba(200, 200, 200, 0.8)';
    var outlineStroke = 'rgba(255, 0, 0, 1)';
    var fillStyle = 'rgba(255, 0, 0, 0.6)';

    // Variables
    var midx = width / 2;
    var midy = height / 2;
    var angleAlpha = Math.PI * 2 / axis;
    var a = [];
    var b = [];
    var ctx;
    var canvas;

    function calculateBasicCoordinates() {
        var angle = Math.PI / 2;
        ctx.strokeStyle = baseStroke;
        for (var i = 0; i < axis; i++) {
            a[i] = [];
            for (var k = 0; k < maxPoint; k++) {
                a[i][k] = { x: midx + radius * Math.cos(angle) * (k + 1), y: midy - radius * Math.sin(angle) * (k + 1) };
            }
            b[i] = { x: midx + radius * Math.cos(angle) * data[i], y: midy - radius * Math.sin(angle) * data[i] };
            angle += angleAlpha;
        }
    }

    function calculateDataCoordinates() {
        var angle = Math.PI / 2;
        for (var i = 0; i < axis; i++) {
            b[i] = { x: midx + radius * Math.cos(angle) * data[i], y: midy - radius * Math.sin(angle) * data[i] };
            angle += angleAlpha;
        }
    }

    function drawBasic() {
        ctx.strokeRect(0, 0, width, height);
        var p, i, k;
        for (i = 0; i < axis; i++) {
            p = a[i][maxPoint - 1];
            ctx.moveTo(midx, midy);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
        }
        for (k = 0; k < maxPoint; k++) {
            p = a[axis - 1][k];
            ctx.moveTo(p.x, p.y);
            for (i = 0; i < axis; i++) {
                p = a[i][k];
                ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
        }
    }

    function drawData() {
        ctx.beginPath();
        ctx.strokeStyle = outlineStroke;
        var p = b[axis - 1];
        ctx.moveTo(p.x, p.y);
        for (var i = 0; i < axis; i++) {
            p = b[i];
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }

    function draw() {
        canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        if (canvas.getContext) {
            ctx = canvas.getContext('2d');
            calculateBasicCoordinates();
            calculateDataCoordinates();
            drawBasic();
            drawData();
            document.getElementById(id).appendChild(canvas);
        }
    }

    draw();
}

drawRadarChartWithCanvas();

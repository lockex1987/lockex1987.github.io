var c = document.getElementById("canvas");
c.width = innerWidth;
c.height = innerHeight;
var ctx = c.getContext("2d");

var stars = [];
var starCount = 50;
var starSize = 10;
var maxDepth = 50;
var minDepth = 15;
var camera = {
    x: 0,
    y: 0
}

var lastFrame = Date.now();

var mouse = {
    x: 0,
    y: 0
};
c.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX - c.width / 2,
    mouse.y = e.clientY - c.height / 2
});

for (var i = 0; i < starCount; i++) {
    stars.push({
        x: (Math.random() - 0.5) * c.width * 2,
        y: (Math.random() - 0.5) * c.height * 2,
        depth: Math.random() * (maxDepth - minDepth) + minDepth
    });
}

function loop() {
    update((Date.now() - lastFrame) / 1000);
    render();
    lastFrame = Date.now();
    requestAnimationFrame(loop);
}

function update(time) {
    camera.x += mouse.x * time;
    camera.y += mouse.y * time;
}

function render() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "white";
    for (var i = 0; i < stars.length; i++) {
        var star = stars[i];
        var proj = 1 / star.depth * maxDepth;
        var pos = {
            x: ((star.x - camera.x) / proj + size / 2) % (c.width + size) - size / 2,
            y: ((star.y - camera.y) / proj + size / 2) % (c.height + size) - size / 2
        };
        if (pos.x < -size / 2)
            pos.x += c.width + size;
        if (pos.y < -size / 2)
            pos.y += c.height + size;
        
        var size = starSize / proj;
        ctx.fillRect(pos.x - size / 2, pos.y - size / 2, size, size);
    }
}
loop();
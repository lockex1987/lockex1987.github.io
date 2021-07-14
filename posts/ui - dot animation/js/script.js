const H = 800;
const W = 800;

const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
canvas.width = W;
canvas.height = H;

// Danh sách các điểm
let dots = [];

const DOT = {
    // màu sắc của điểm
    color: 'rgb(256,256,256,0.7)',
    // màu sắc đoạn nối các điểm
    colorLine: 'rgb(256,256,256,0.5)',
    // số lượng điểm xuất hiện cùng lúc trên hình
    count: 40,
    // velocityX vận tốc tối đa theo trục X
    vX: 3,
    // velocityY vận tốc tối đa theo trục Y
    vY: 3,
    // khi dưới khoảng cách này 2 điểm sẽ có đoạn nối
    range: 150
};

const gradient = context.createLinearGradient(0, 0, W, H);
gradient.addColorStop(0, '#92fe9d');
gradient.addColorStop(1, '#00c9ff');


class Dot {
    constructor(x, y, vx, vy, r) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        // Bán kính của điểm
        this.r = r;
        // property xác định danh sách các điểm ở gần,
        // mỗi object gồm tọa độ x y và khoảng cách d giữa 2 điểm
        this.dotsNears = [];
    }

    // vẽ điểm và đoạn nối trên canvas
    draw() {
        context.beginPath();
        // Vẽ đường tròn
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        context.fillStyle = DOT.color;
        // giờ mới chính tức vẽ
        context.fill();

        // vẽ các đoạn thẳng nối điểm hiện tại với các điểm gần đấy
        this.dotsNears.forEach(dotNear => {
            context.beginPath();
            context.moveTo(this.x, this.y);
            context.lineTo(dotNear.x, dotNear.y);
            // độ dày của đoạn thẳng, càng gần nhau thì càng dày, tối đa 2px
            context.lineWidth = (DOT.range - dotNear.d) * (2 / DOT.range);
            context.strokeStyle = DOT.colorLine;
            context.stroke();
        });
    }

    update(dots) {
        // update tọa độ điểm theo vận tốc của điểm đó, nhận vào biến global dots để tìm các điểm gần điểm hiện tại
        // khi điểm ta ngoài phạm vi của canvas thì ta sẽ đặt lại tọa độ và random lại vận tốc cho điểm đó
        if (this.x - this.r >= W) {
            this.x = 0 - this.r;
            this.vy = (Math.random() - 0.5) * DOT.vY;
        }
        if (this.x + this.r < 0) {
            this.x = W + this.r;
            this.vy = (Math.random() - 0.5) * DOT.vY;
        }
        if (this.y - this.r >= H) {
            this.y = 0 - this.r;
            this.vx = (Math.random() - 0.5) * DOT.vX;
        }
        if (this.y + this.r < 0) {
            this.y = H + this.r;
            this.vx = (Math.random() - 0.5) * DOT.vX;
        }

        this.x += this.vx;
        this.y += this.vy;

        // tìm tọa độ điểm gần đó
        this.dotsNears = [];
        dots.forEach(dot => {
            if (dot === this) {
                return;
            }
            const d = Math.sqrt((this.x - dot.x) ** 2 + (this.y - dot.y) ** 2);
            if (d < DOT.range) {
                this.dotsNears.push({
                    x: dot.x,
                    y: dot.y,
                    d: d
                });
            }
        });

        this.draw();
    }
}


function init() {
    // khởi tạo các điểm
    for (let i = 0; i < DOT.count; i++) {
        //  random bán kính của điểm từ 3 đến 6px
        const r = Math.random() * 3 + 3;
        const positionX = Math.random() * W;
        const positionY = Math.random() * H;
        // -0.5 để có cả vận tốc âm, dương, theo trục Y âm sẽ di chuyển từ dưới lên trên
        const vx = (Math.random() - 0.5) * DOT.vX;
        const vy = (Math.random() - 0.5) * DOT.vY;
        dots.push(new Dot(positionX, positionY, vx, vy, r));
    }
}


function animate() {
    requestAnimationFrame(animate);

    // style màu nền của canvas là màu gradient ta định nghĩ ban đầu
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (dots.length > DOT.count) {
        dots = dots.filter(dot =>
            dot.x + dot.r > 0
            && dot.x - dot.r < W
            && dot.y + dot.r > 0
            && dot.y - dot.r < H
        );
    }

    dots.forEach(dot => {
        dot.update(dots);
    });
}

init();
animate();

canvas.addEventListener('click', (evt) => {
    for (let i = 0; i < 3; i++) {
        const r = Math.random() * 3 + 3;
        const positionX = evt.offsetX;
        const positionY = evt.offsetY;
        const vx = (Math.random() - 0.5) * DOT.vX;
        const vy = (Math.random() - 0.5) * DOT.vY;
        dots.push(new Dot(positionX, positionY, vx, vy, r));
    }
});

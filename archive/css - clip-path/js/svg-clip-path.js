const MATHPI2 = Math.PI * 2;

const svgns = 'http://www.w3.org/2000/svg';

const content = document.getElementById('content');
const mask = document.getElementById('mask');
const img = document.getElementById('img');
const control = document.getElementById('controlRange');

//---

let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

let cx = w / 2;
let cy = h / 2;

const circle = {};

circle.position = { x: cx, y: cy };
circle.radius = Math.sqrt(cx * cx + cy * cy);

//---

const gridCellsX = 20;
const gridCellsY = 20;

let gridRectWidth = img.offsetWidth / gridCellsX;
let gridRectHeight = img.offsetHeight / gridCellsY;
let gridRectHolder = [];

let sliderControlPercentSave = -1;

//---

function init() {
    img.style.clipPath = 'url(#mask)';
    let animationFrame = requestAnimFrame(render);
    window.addEventListener('resize', resizeHandler, false);
    resize();
    buildGrid();
}

//---

function buildGrid() {
    for (let y = 0, yl = gridCellsY; y < yl; y++) {
        for (let x = 0, xl = gridCellsX; x < xl; x++) {
            const obj = buildGridRect(x * gridRectWidth, y * gridRectHeight, gridRectWidth, gridRectHeight);
            mask.appendChild(obj.rect);
            gridRectHolder.push(obj);
        }
    }
}

function buildGridRect(x, y, w, h) {
    const angle = Math.random() * MATHPI2;
    const obj = {};
    obj.x = circle.position.x + circle.radius * Math.cos(angle) - content.offsetLeft - gridRectWidth / 2;
    obj.y = circle.position.y + circle.radius * Math.sin(angle) - content.offsetTop - gridRectHeight / 2;
    obj.fromX = obj.x;
    obj.fromY = obj.y;
    obj.fromRotation = (Math.random() * 180) * (Math.round(Math.random()) * 2 - 1);
    obj.toX = x;
    obj.toY = y;
    obj.toRotation = 0;
    obj.width = w;
    obj.height = h;
    obj.registrationPointX = obj.x + gridRectWidth / 2;
    obj.registrationPointY = obj.y + gridRectHeight / 2;
    obj.rect = document.createElementNS(svgns, 'rect');
    obj.rect.setAttributeNS(null, 'x', obj.x);
    obj.rect.setAttributeNS(null, 'y', obj.y);
    obj.rect.setAttributeNS(null, 'width', obj.width);
    obj.rect.setAttributeNS(null, 'height', obj.height);
    obj.rect.setAttributeNS(null, 'transform', 'rotate(' + obj.fromRotation + ' ' + obj.registrationPointX + ' ' + obj.registrationPointY + ')');
    obj.tweenProps = null;
    obj.tweenTime = 0;
    obj.tweenDuration = 0;
    obj.tweenIncrement = 0;
    obj.tweenEasing = Easing.easeOutQuint;
    obj.tweenInit = function (props) {
        this.tweenProps = props;
        for (let i = 0, l = this.tweenProps.length; i < l; i++) {
            const tweenProp = this.tweenProps[i];
            tweenProp.change = tweenProp.to - tweenProp.from;
        }
    }
    obj.tween = function (time, duration) {
        this.tweenTime = time;
        this.tweenDuration = duration;
        this.tweenIncrement = this.tweenDuration / 100;
        this.tweenTime += this.tweenIncrement;

        for (let i = 0, l = obj.tweenProps.length; i < l; i++) {
            const tweenProp = obj.tweenProps[i];
            if (tweenProp.property === 'rotation') {
                this.rotation = this.tweenEasing(this.tweenTime, tweenProp.from, tweenProp.change, this.tweenDuration);
                this.rect.setAttributeNS(null, 'transform', 'rotate(' + this.rotation + ' ' + this.registrationPointX + ' ' + this.registrationPointY + ')');
            } else if (tweenProp.property === 'x') {
                this.x = this.tweenEasing(this.tweenTime, tweenProp.from, tweenProp.change, this.tweenDuration);
                this.rect.setAttributeNS(null, 'x', this.x);
            } else if (tweenProp.property === 'y') {
                this.y = this.tweenEasing(this.tweenTime, tweenProp.from, tweenProp.change, this.tweenDuration);
                this.rect.setAttributeNS(null, 'y', this.y);
            }
        }
    }
    obj.tweenInit([
        { from: obj.fromRotation, to: obj.toRotation, property: 'rotation' },
        { from: obj.fromX, to: obj.toX, property: 'x' },
        { from: obj.fromY, to: obj.toY, property: 'y' },
    ]);
    return obj;
}

//---

function render(timestamp) {
    const sliderControlPercent = control.value / 100;
    let movement = false;
    if (sliderControlPercent !== sliderControlPercentSave) {
        sliderControlPercentSave = sliderControlPercent;
        movement = true;
    }

    //---
    const duration = 1000;
    const time = sliderControlPercent * duration;
    if (time >= duration) {
        img.style.clipPath = 'none';
    } else {
        img.style.clipPath = 'url(#mask)';
    }

    //---
    for (let i = 0, l = gridRectHolder.length; i < l; i++) {
        const obj = gridRectHolder[i];
        if (movement === true) {
            obj.tween(time, duration);
        }
        obj.registrationPointX = obj.x + gridRectWidth / 2;
        obj.registrationPointY = obj.y + gridRectHeight / 2;
    }

    //---
    animationFrame = requestAnimFrame(render);
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };

})();

window.cancelAnimFrame = (function () {
    return window.cancelAnimationFrame ||
        window.mozCancelAnimationFrame;
})();

//---

function resizeHandler(event) {
    resize();
}

function resize() {
    w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    cx = w / 2;
    cy = h / 2;
    circle.position = { x: cx, y: cy };
    circle.radius = Math.sqrt(cx * cx + cy * cy);
}

//---

class Easing {
    static linear(t, b, c, d) {
        return c * t / d + b;
    }

    static easeInQuint(t, b, c, d) {
        t /= d;
        return c * t * t * t * t * t + b;
    }

    static easeOutQuint(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t * t * t + 1) + b;
    }

    static easeInOutQuint(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t * t * t + 2) + b;
    }
}

init();

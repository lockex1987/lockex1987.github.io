(function() {

    var width;
    var height;
    var largeHeader = document.getElementById('particle-animation');
    var canvas = document.getElementById('demo-canvas');
    var ctx = canvas.getContext('2d');
    var circles = [];
    var animateHeader = true;

    function createParticles() {
        // So bong bong
        var num = width * 0.45;
        for (var x = 0; x < num; x++) {
            var c = new Circle();
            circles.push(c);
        }
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        if (document.body.scrollTop > height) {
            animateHeader = false;
        } else {
            animateHeader = true;
        }
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;

    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        init();

        function init() {
            _this.pos = {};
            _this.pos.x = Math.random() * width;
            _this.pos.y = Math.random() * height;
            _this.alpha = 0.1 + Math.random() * 0.3;
            _this.scale = 0.1 + Math.random() * 0.3;
            _this.velocity = Math.random();
        }

        function restart() {
            _this.pos = {};
            _this.pos.x = Math.random() * width;
            _this.pos.y = height + Math.random() * 100;
            _this.alpha = 0.5 + Math.random() * 0.3;
            _this.scale = 0.1 + Math.random() * 0.3;
            _this.velocity = Math.random();
        }

        this.draw = function() {
            if (_this.alpha <= 0) {
                restart();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;

            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255, 255, 255, ' + _this.alpha + ')';
            ctx.fill();
        };
    }

    function init() {
        resize();
        createParticles();
        animate();
        addListeners();
    }
    
    init();
})();

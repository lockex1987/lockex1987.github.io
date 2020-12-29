// https://css-tricks.com/adding-particle-effects-to-dom-elements-with-canvas/

/* An "exploding" particle effect that uses circles */
const ExplodingParticle = function (x, y, colorData) {
    this.rgbArray = colorData;
    this.startX = x;
    this.startY = y;

    // Set the speed for our particle
    this.speed = {
        x: -5 + Math.random() * 10,
        y: -5 + Math.random() * 10
    };

    // Size our particle
    this.radius = 5 + Math.random() * 5;

    // Set a max time to live for our particle
    this.life = 30 + Math.random() * 10;
    this.remainingLife = this.life;

    // This function will be called by our animation logic later on
    this.draw = function (ctx) {
        const p = this;

        if (p.remainingLife > 0 && p.radius > 0) {
            // Draw a circle at the current location
            ctx.beginPath();
            ctx.arc(p.startX, p.startY, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + p.rgbArray[0] + ',' + p.rgbArray[1] + ',' + p.rgbArray[2] + ', 0.8)';
            ctx.fill();

            // Update the particle's location and life
            p.remainingLife--;
            p.radius -= 0.25;
            p.startX += p.speed.x;
            p.startY += p.speed.y;
        }
    };
};

const allCanvas = [];

/**
 * Khoi tao.
 * @param {DOMNode} ele Doi tuong DOM
 */
function createAnimation(ele) {
    // Set how long we want our particle to animate for (in ms)
    const animationDuration = 1000;

    let ctx;
    let particleCtx;
    let particles = [];
    let startTime;

    function createParticleCanvas() {
        // Create our canvas
        const particleCanvas = document.createElement('canvas');
        particleCanvas.className = 'animation-canvas';
        particleCtx = particleCanvas.getContext('2d');

        // Size our canvas
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;

        // Add our canvas to the page
        document.body.appendChild(particleCanvas);

        allCanvas.push(particleCanvas);
    }

    function clickElement() {
        console.log(1);
        // Hide the element
        ele.style.visibility = 'hidden';
        setTimeout(function () {
            ele.style.visibility = 'visible';
        }, 3000);

        // Get the color data for our button
        const width = ele.offsetWidth;
        const height = ele.offsetHeight;
        const colorData = ctx.getImageData(0, 0, width, height).data;

        // Keep track of how many times we've iterated (in order to reduce the total number of particles create)
        const reductionFactor = 77;
        let count = 0;

        const bcr = ele.getBoundingClientRect();

        // Go through every location of our button and create a particle
        for (let localX = 0; localX < width; localX++) {
            for (let localY = 0; localY < height; localY++) {
                if (count % reductionFactor === 0) {
                    const index = (localY * width + localX) * 4;
                    const rgbaColorArr = colorData.slice(index, index + 4);

                    const globalX = bcr.left + localX;
                    const globalY = bcr.top + localY;

                    particles.push(new ExplodingParticle(globalX, globalY, rgbaColorArr));
                }
                count++;
            }
        }

        // Start animation
        startTime = Date.now();
        window.requestAnimationFrame(update);
    }

    html2canvas(ele).then(canvas => {
        ctx = canvas.getContext('2d');
        createParticleCanvas();
        ele.addEventListener('click', clickElement);
    });

    function update() {
        // Clear out the old particles
        particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Draw all of our particles in their new location
        particles.forEach(p => p.draw(particleCtx));

        // Simple way to clean up if the last particle is done animating
        if (Date.now() - startTime > animationDuration) {
            particles = [];
        } else {
            // Animate performantly
            window.requestAnimationFrame(update);
        }
    }
}

createAnimation(document.querySelector('.animation-button'));
createAnimation(document.querySelector('.animation-image'));

window.addEventListener('resize', function () {
    allCanvas.forEach(particleCanvas => {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    });
});

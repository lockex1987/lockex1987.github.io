let element = document.querySelector('.panel');

document.querySelector('#slideUp').addEventListener('click', () => {
    slideUp(element, 400);
});

const easeInOutQuad = (t, b, c, d) => {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
    }
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
};

document.querySelector('#slideDown').addEventListener('click', () => {
    slideDown(element, {
        //duration: 1000,
        //easing: easeInOutQuad
    });
});

document.querySelector('#slideToggle').addEventListener('click', () => {
    slideToggle(element);
});
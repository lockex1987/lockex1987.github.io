let iconBox = document.querySelector('.icon-box');

document.querySelector('#left').addEventListener('click', () => {
    iconBox.className = 'icon-box shape-left';
});

document.querySelector('#right').addEventListener('click', () => {
    iconBox.className = 'icon-box shape-right';
});

document.querySelector('#menu').addEventListener('click', () => {
    iconBox.className = 'icon-box';
});

document.querySelector('#close').addEventListener('click', () => {
    iconBox.className = 'icon-box shape-close';
});

document.querySelector('#add').addEventListener('click', () => {
    iconBox.className = 'icon-box shape-close shape-add';
});


document.addEventListener('click', (evt) => {
    let cta = evt.target.closest('.cta');
    if (cta) {
        cta.classList.toggle('active');
    }
});


let hamburgerIcon = document.querySelector('.hamburger-icon');
hamburgerIcon.addEventListener('click', (evt) => {
    hamburgerIcon.classList.toggle('open');
});
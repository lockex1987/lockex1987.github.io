// Danh sách các blog
const timelineBlocks = document.querySelectorAll('.timeline-container');

function isBelow(el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop;
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const height = window.innerHeight;
    return top > scrollTop + height * 0.75;
}

function isHidden(el) {
    return el.classList.contains('is-hidden');
}

function hideBlock(el) {
    el.classList.add('is-hidden');
}

function showBlock(el) {
    el.classList.remove('is-hidden');
    el.classList.add('bounce-in');
}

// Hide timeline blocks which are outside the viewport
timelineBlocks.forEach((el) => {
    if (isBelow(el)) {
        hideBlock(el);
    } else {
        showBlock(el);
    }
});

// On scolling, show/animate timeline blocks when enter the viewport
window.addEventListener('scroll', () => {
    timelineBlocks.forEach((el) => {
        if (!isBelow(el) && isHidden(el)) {
            showBlock(el);
        }
    });
});

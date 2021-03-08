// Xử lý chỗ timeline
(function () {
    // Danh sách các block
    const timelineBlocks = document.querySelectorAll('.timeline-container');


    function isBelow(el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop;
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const height = window.innerHeight;
        return top > scrollTop + height * 0.75;
    }


    function isHidden(el) {
        return el.classList.contains('invisible');
    }


    function hideBlock(el) {
        el.classList.add('invisible');
    }


    function showBlock(el) {
        el.classList.remove('invisible');
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
})();

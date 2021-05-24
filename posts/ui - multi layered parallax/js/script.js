window.addEventListener('scroll', function (evt) {
    const topDistance = this.pageYOffset;
    document.querySelectorAll('.layer').forEach(layer => {
        const depth = layer.dataset.depth;
        layer.style.transform = 'translate3d(0, ' + -(topDistance * depth) + 'px, 0)';
    });
});

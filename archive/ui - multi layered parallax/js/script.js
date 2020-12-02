window.addEventListener('scroll', function (evt) {
    var topDistance = this.pageYOffset;
    document.querySelectorAll('.layer').forEach(layer => {
        var depth = layer.dataset.depth;
        layer.style.transform = 'translate3d(0, ' + -(topDistance * depth) + 'px, 0)';
    });
});
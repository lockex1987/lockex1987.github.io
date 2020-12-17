var numberOfImages = 16;

function preloadImages() {
    for (var i = 1; i <= numberOfImages; i++) {
        var img = new Image();
        img.src = 'images/mojave_dynamic_' + i + '.jpg';
    }
}

preloadImages();

function loopImages() {
    var domImages = document.querySelectorAll('#cf img');
    var topImage = domImages[1];
    var bottomImage = domImages[0];
    topImage.style.display = '';
    bottomImage.style.display = '';

    var idx = 2;
    topImage.addEventListener('animationend', function() {
        topImage.classList.remove('transparent');
        topImage.src = 'images/mojave_dynamic_' + idx + '.jpg';
        idx++;
        if (idx > numberOfImages) {
            idx = 1;
        }
        bottomImage.src = 'images/mojave_dynamic_' + idx + '.jpg';

        setTimeout(function() {
            topImage.classList.add('transparent');
        }, 10);
    });

    topImage.classList.add('transparent');
}

loopImages();
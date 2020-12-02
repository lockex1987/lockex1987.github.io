(function () {
    var prevScrollPos = window.pageYOffset;
    var header = document.querySelector('header');
    var isHide = false;

    window.addEventListener('scroll', function () {
        var currentScrollPos = window.pageYOffset;

        // Make sure they scroll more than delta
        var delta = 5;
        if (Math.abs(prevScrollPos - currentScrollPos) <= delta) {
            return;
        }

        if (prevScrollPos > currentScrollPos) {
            // Scroll Up
            if (isHide) {
                header.classList.remove('nav-hide');
                isHide = false;
            }
        } else {
            // Scroll Down

            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            var navbarHeight = 50;
            if (currentScrollPos > navbarHeight) {
                if (!isHide) {
                    header.classList.add('nav-hide');
                    isHide = true;
                }
            }
        }

        // Save previous scroll position
        prevScrollPos = currentScrollPos;
    });
}());
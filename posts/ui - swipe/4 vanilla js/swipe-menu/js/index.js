window.SwipeMenu = (function () {
    return function SwipeMenu(container) {
        var menu = container.querySelector("ul"),
        prev = container.querySelector(".prev"),
        next = container.querySelector(".next"),
        center = container.querySelector(".center"),
        wait = false,
        fps = 50,
        loop = 15,
        currentX,
        scrollLeft = 0;

        ['mousedown', 'touchstart'].forEach(function (evt) {
            menu.addEventListener(evt, function (e) {
                currentX = e.type == "mousedown" ? e.pageX : e.targetTouches[0].pageX;
                scrollLeft = menu.scrollLeft;
            });
        });

        ['mouseup', 'touchend'].forEach(function (evt) {
            document.addEventListener(evt, function (e) {
                currentX = 0;
            });
        });

        ['mousemove', 'touchmove'].forEach(function (evt) {
            document.addEventListener(evt, function (e) {
                if (!currentX || wait)
                    return;
                wait = true; //throttle 
                setTimeout(function () {
                    wait = false;
                }, 1000 / fps);
                var offset = e.type == "mousemove" ? e.pageX : e.targetTouches[0].pageX;
                menu.scrollLeft = scrollLeft + currentX - offset;
            });
        });

        menu.addEventListener("scroll", function (e) {
            updateControlStatus();
        });

        prev.addEventListener("click", function (e) {
            anim(-menu.offsetWidth / loop, 0);
        });

        next.addEventListener("click", function (e) {
            anim(+menu.offsetWidth / loop, 0);
        });

        center.addEventListener("click", function (e) {
            var active = container.querySelector("li.active");
            console.log(menu.offsetWidth, active.offsetWidth);
            anim((active.offsetLeft - menu.scrollLeft - menu.offsetWidth / 2 + active.offsetWidth / 2) / loop, 0);
        });

        var anim = function (r, l) {
            if (l >= loop)
                return;
            menu.scrollLeft += r;
            requestAnimationFrame(function () {
                return anim(r, l + 1);
            });
        };

        var updateControlStatus = function () {
            prev.classList.toggle("disabled", menu.scrollLeft == 0);
            next.classList.toggle("disabled", menu.scrollLeft + menu.offsetWidth >= menu.scrollWidth);
        };
    };
})();

new SwipeMenu(document.querySelector(".swipe"));

function initComparisons() {
    // find all elements with an "overlay" class
    var x = document.getElementsByClassName("img-comp-overlay");
    for (var i = 0; i < x.length; i++) {
        // once for each "overlay" element: pass the "overlay" element as a parameter when executing the compareImages function
        compareImages(x[i]);
    }

    function compareImages(img) {
        var clicked = 0;

        // get the width and height of the img element
        var w = img.offsetWidth;
        var h = img.offsetHeight;

        // set the width of the img element to 50%
        //img.style.width = (w / 2) + "px";

        // create slider
        var slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");

        // insert slider
        img.parentElement.insertBefore(slider, img);

        // position the slider in the middle
        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        //slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

        slide(w / 2);

        // execute a function when the mouse button is pressed
        // or touched (for touch screens)
        slider.addEventListener("mousedown", slideReady);
        slider.addEventListener("touchstart", slideReady);

        // and another function when the mouse button is released
        // and released (for touch screens)
        window.addEventListener("mouseup", slideFinish);
        window.addEventListener("touchstop", slideFinish);

        // execute a function when the slider is moved
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);

        function slideReady(e) {
            // prevent any other actions that may occur when moving over the image
            e.preventDefault();
            // the slider is now clicked and ready to move
            clicked = 1;
        }

        function slideFinish() {
            // the slider is no longer clicked
            clicked = 0;
        }

        function slideMove(e) {
            // if the slider is no longer clicked, exit this function
            if (clicked == 0) {
                return false;
            }

            // get the cursor's x position
            var pos = getCursorPos(e);

            // prevent the slider from being positioned outside the image
            if (pos < 0) {
                pos = 0;
            }
            if (pos > w) {
                pos = w;
            }

            // execute a function that will resize the overlay image according to the cursor
            slide(pos);
        }

        function getCursorPos(e) {
            e = e || window.event;

            // get the x positions of the image
            var a = img.getBoundingClientRect();

            // calculate the cursor's x coordinate, relative to the image
            var x = e.pageX - a.left;

            // consider any page scrolling
            x = x - window.pageXOffset;

            return x;
        }

        function slide(x) {
            // resize the image
            img.style.width = x + "px";

            // position the slider:
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }
    }
}

// Execute a function that will execute an image compare function for each element with the img-comp-overlay class
initComparisons();

// 1. Basic object for our stuff
window.slider = {};

// 2. Settings
slider.sliderPanelSelector = '.slider-panel';
slider.sliderPaginationSelector = '.slider-pagination';
slider.sensitivity = 25 // horizontal % needed to trigger swipe

// 2. Placeholder to remember which slide we’re on
slider.activeSlide = 0;

// 3. Slide counter
slider.slideCount = 0;

// 4. Initialization + event listener
slider.init = function (selector) {

    // 4a. Find the container
    slider.sliderEl = document.querySelector(selector);

    // 4b. Count stuff
    slider.slideCount = slider.sliderEl.querySelectorAll(slider.sliderPanelSelector).length;

    // 4c. Populate pagination
    var n = 0;
    for (n; n < slider.slideCount; n++) {
        var activeStatus = n == slider.activeSlide ? ' class="is-active"' : '';
        slider.sliderEl.parentElement.querySelector(slider.sliderPaginationSelector).innerHTML += '<div ' + activeStatus + '></div>';
    }

    // 4d. Set up HammerJS
    var sliderManager = new Hammer.Manager(slider.sliderEl);
    sliderManager.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
    sliderManager.on('pan', function (e) {

        // 4e. Calculate pixel movements into 1:1 screen percents so gestures track with motion
        var percentage = 100 / slider.slideCount * e.deltaX / window.innerWidth;

        // 4f. Multiply percent by # of slide we’re on
        var percentageCalculated = percentage - 100 / slider.slideCount * slider.activeSlide;

        // 4g. Apply transformation
        slider.sliderEl.style.transform = 'translateX( ' + percentageCalculated + '% )';

        // 4h. Snap to slide when done
        if (e.isFinal) {
            if (e.velocityX > 1) {
                slider.goTo(slider.activeSlide - 1);
            } else if (e.velocityX < -1) {
                slider.goTo(slider.activeSlide + 1)
            } else {
                if (percentage <= -(slider.sensitivity / slider.slideCount)) {
                    slider.goTo(slider.activeSlide + 1);
                } else if (percentage >= (slider.sensitivity / slider.slideCount)) {
                    slider.goTo(slider.activeSlide - 1);
                } else {
                    slider.goTo(slider.activeSlide);
                }
            }
        }
    });
};

// 5. Update current slide
slider.goTo = function (number) {

    // 5a. Stop it from doing weird things like moving to slides that don’t exist
    if (number < 0)
        slider.activeSlide = 0;
    else if (number > slider.slideCount - 1)
        slider.activeSlide = slider.slideCount - 1
    else
        slider.activeSlide = number;

    // 5b. Apply transformation & smoothly animate via .is-animating CSS
    slider.sliderEl.classList.add('is-animating');
    var percentage = -(100 / slider.slideCount) * slider.activeSlide;
    slider.sliderEl.style.transform = 'translateX( ' + percentage + '% )';
    clearTimeout(slider.timer);
    slider.timer = setTimeout(function () {
        slider.sliderEl.classList.remove('is-animating');
    }, 400);

    // 5c. Update the counters
    var pagination = slider.sliderEl.parentElement.querySelectorAll(slider.sliderPaginationSelector + ' > *');
    var n = 0;
    for (n; n < pagination.length; n++) {
        var className = n == slider.activeSlide ? 'is-active' : '';
        pagination[n].className = className;
    }
};

// Initialize
slider.init('#slider');
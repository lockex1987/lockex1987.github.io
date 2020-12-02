(function () {

    const defaults = {
        duration: 400,
        easing: (currentTime, startValue, diffValue, duration) => {
            return -diffValue * (currentTime /= duration) * (currentTime - 2) + startValue;
        }
    };

    const directions = {
        OPEN: 1,
        CLOSE: 2
    };

    const slideToggle = (element, args = {}) => {
        if (element.style.display == 'none') {
            slideDown(element, args);
        } else {
            slideUp(element, args);
        }
    };

    const slideUp = (element, args = {}) => {
        if (isInteger(args)) {
            args = { duration: args };
        }
        const options = extend(defaults, args);
        options.direction = directions.CLOSE;
        options.to = 0;
        options.startingHeight = element.scrollHeight;
        options.distanceHeight = -options.startingHeight;
        setElementAnimationStyles(element);
        window.requestAnimationFrame((timestamp) => animate(element, options, timestamp));
    };

    const slideDown = (element, args = {}) => {
        if (isInteger(args)) {
            args = { duration: args };
        }
        element.style.height = '0px';
        setElementAnimationStyles(element);
        const options = extend(defaults, args);
        options.direction = directions.OPEN;
        options.to = element.scrollHeight;
        options.startingHeight = 0;
        options.distanceHeight = options.to;
        window.requestAnimationFrame((timestamp) => animate(element, options, timestamp));
    };

    const animate = (element, options, now) => {
        if (!options.startTime) {
            options.startTime = now;
        }
        const currentTime = now - options.startTime;
        let animationContinue = currentTime < options.duration;
        let newHeight = options.easing(currentTime, options.startingHeight, options.distanceHeight, options.duration);
        if (animationContinue) {
            element.style.height = `${newHeight.toFixed(2)}px`;
            window.requestAnimationFrame((timestamp) => animate(element, options, timestamp));
        } else {
            element.style.display = (options.direction === directions.CLOSE) ? 'none' : 'block';
            removeElementAnimationStyles(element);
        }
    };

    const setElementAnimationStyles = (element) => {
        element.style.display = 'block';
        element.style.overflow = 'hidden';
        element.style.marginTop = '0';
        element.style.marginBottom = '0';
        element.style.paddingTop = '0';
        element.style.paddingBottom = '0';
    };

    const removeElementAnimationStyles = (element) => {
        element.style.height = null;
        element.style.overflow = null;
        element.style.marginTop = null;
        element.style.marginBottom = null;
        element.style.paddingTop = null;
        element.style.paddingBottom = null;
    };

    const isInteger = (value) => {
        if (Number.isInteger) {
            return Number.isInteger(value);
        } else {
            return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
        }
    };

    const extend = (defaults, options) => {
        const extendedOptions = {};
        for (let key in defaults) {
            extendedOptions[key] = options[key] || defaults[key];
        }
        return extendedOptions;
    };

    window.slideDown = slideDown;
    window.slideUp = slideUp;
    window.slideToggle = slideToggle;
}());

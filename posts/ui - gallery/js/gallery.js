
import images from './images.js';

new Vue({
    el: '#app',

    data() {
        return {
            effectClasses: [
                'scale',
                'sparkles',
                'shine'
            ],
            images: images
        };
    }
});

// lazyloadImages();
// lazyloadOld(document.querySelectorAll(".photos img"));

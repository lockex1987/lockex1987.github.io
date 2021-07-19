import HEROES from './heroes.js';

new Vue({
    el: '#app',

    data() {
        return {
            heroes: HEROES
        };
    },

    mounted() {
        // Tự động chuyển
        // Carousel.autoPlay(carouselInner, 2 * 1000);

        this.$nextTick(() => {
            this.adjustCarouselWidth();
        });
        window.addEventListener('resize', this.adjustCarouselWidth);
    },

    methods: {
        adjustCarouselWidth() {
            const carousel = this.$refs.gallery;

            const windowWidth = window.innerWidth;
            if (windowWidth >= 1200) {
                const gutterWidth = 32;
                const gapWidth = 16;
                const numberOfItem = 3;
                carousel.style.width = Carousel.computePreferWidth(carousel, gutterWidth, gapWidth, numberOfItem);
            } else if (windowWidth >= 1200) {
                const gutterWidth = 32;
                const gapWidth = 16;
                const numberOfItem = 2;
                carousel.style.width = Carousel.computePreferWidth(carousel, gutterWidth, gapWidth, numberOfItem);
            } else {
                carousel.style.width = 'auto';
            }
        }
    }
});

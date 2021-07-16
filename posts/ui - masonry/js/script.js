import IMAGES from './data.js';

new Vue({
    el: '#app',

    data() {
        return {
            urls: [],

            // Đối tượng Masonry
            masonry: null
        };
    },

    mounted() {
        this.initMasonry();
        this.urls = this.getImageUrls();

        this.$nextTick(() => {
            this.reLayout();
        });
    },

    methods: {
        getImageUrls() {
            const urls = [];
            const imageNum = 27;
            for (let i = 0; i < imageNum; i++) {
                const j = i;
                // const j = Math.floor(Math.random() * IMAGES.length);
                urls.push(IMAGES[j]);
            }
            return urls;
        },

        /**
         * Khởi tạo đối tượng Masonry.
         */
        initMasonry() {
            const elem = document.querySelector('.masonry-js');
            this.masonry = new Masonry(elem, {
                itemSelector: '.masonry-item'
            });
        },

        /**
         * Hiển thị lại.
         */
        reLayout() {
            this.masonry.reloadItems();
            this.masonry.layout();
        },

        checkLoadImagesComplete() {
            setTimeout(() => {
                this.reLayout();
            }, 100);
        }
    }
});

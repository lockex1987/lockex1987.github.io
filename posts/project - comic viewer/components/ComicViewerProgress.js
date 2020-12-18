const template = `
<div class="current-progress zindex-10 position-fixed top-left mt-2 ml-2">
    <div class="bar"
            :style="{ width: percent + '%'}"></div>

    <span class="current-index-label">
        {{text}}
    </span>
</div>`;

export default {
    template,

    props: [
        'currentIndex',
        'imageListLength'
    ],

    computed: {
        /**
         * Phần trăm hoàn thành.
         */
        percent() {
            if (this.imageListLength == 0) {
                return 0;
            }
            return (this.currentIndex + 1) * 100 / this.imageListLength;
        },

        /**
         * Text hiển thị.
         */
        text() {
            if (this.imageListLength == 0) {
                return '...';
            }
            return (this.currentIndex + 1) + ' / ' + this.imageListLength;
        }
    }
};

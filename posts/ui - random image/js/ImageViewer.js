const template = `
<div class="viewer text-center">
    <div class="mb-3 text-success">
        <span v-html="currentImage.name"></span>
    </div>

    <div class="mb-3">
        <img :src="'https://www.oldmasterq.com' + currentImage.url"
                v-if="currentImage.url"/>
    </div>
</div>
`;


const styles = `
`;

CommonUtils.addCssStyles(styles);

export default {
    template,

    data() {
        return {
            // Mảng các ảnh
            images: [],

            // Index của ảnh hiện tại
            currentIndex: 0
        };
    },

    mounted() {
        this.getImages();
    },

    computed: {
        currentImage() {
            if (!this.images.length) {
                return {};
            }
            return this.images[this.currentIndex];
        }
    },

    methods: {
        async getImages() {
            const data = await fetch('data/oldmasterq.json').then(response => response.json());
            this.images = data;
            this.gotoRandomImage();
        },

        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        gotoRandomImage() {
            this.currentIndex = this.getRandomInt(0, this.images.length - 1);
        }
    }
};

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


export default {
    template,

    data() {
        return {
            // Mảng các ảnh
            imageList: [],

            // Index của ảnh hiện tại
            currentIndex: 0
        };
    },

    mounted() {
        this.getImageList();
    },

    computed: {
        currentImage() {
            if (!this.imageList.length) {
                return {};
            }
            return this.imageList[this.currentIndex];
        }
    },

    methods: {
        async getImageList() {
            const data = await fetch('data/oldmasterq.json').then(response => response.json());
            this.imageList = data;
            this.currentIndex = CommonUtils.getRandomBetween(0, this.imageList.length - 1);
        }
    }
};

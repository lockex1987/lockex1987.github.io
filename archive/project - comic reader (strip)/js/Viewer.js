const template = `
<div class="viewer">
    <div class="mb-3 text-danger">
        #{{currentIndex + 1}}.
        <span v-html="currentImage.name"></span>
    </div>

    <div class="controls d-flex justify-content-between mb-4">
        <div>
            <button @click="gotoPrevImage()" type="button" class="btn btn-primary">
                PREV
            </button>
            <button @click="gotoRandomImage()" type="button" class="btn btn-secondary">
                RANDOM
            </button>
            <button @click="gotoNextImage()" type="button" class="btn btn-success">
                NEXT
            </button>

            <i class="spinner-border spinner-border-sm text-primary ml-3"
                    v-show="isLoading"></i>
        </div>


        <div>
            <input v-model="inputNumber" type="number" placeholder="#..."
                    class="form-control d-inline-block input-number"/>

            <button @click="gotoNumber()" type="button" class="btn btn-outline-primary">
                GO
            </button>
        </div>
    </div>

    <div class="text-center">
        <img ref="mainImage"
                :src="currentImage.url ? 'https://www.oldmasterq.com' + currentImage.url : null"
                v-show="currentImage.url"/>
    </div>
</div>
`;


const styles = `
.viewer .input-number {
    width: 5rem;
}
`;

CommonUtils.addCssStyles(styles);


export default {
    template,

    data() {
        return {
            // Mảng các ảnh
            images: [],

            // Index của ảnh hiện tại
            currentIndex: 0,

            isLoading: false,

            inputNumber: ''
        };
    },

    mounted() {
        this.getImages();

        this.$refs.mainImage.addEventListener('load', () => {
            this.isLoading = false;
        });
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
            this.showCurrentImage();
        },
        
        showCurrentImage() {
            this.isLoading = true;
        },
        
        gotoPrevImage() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.showCurrentImage();
            }
        },
        
        gotoNextImage() {
            if (this.currentIndex + 1 < this.images.length) {
                this.currentIndex++;
                this.showCurrentImage();
            }
        },
        
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        
        gotoRandomImage() {
            this.currentIndex = this.getRandomInt(0, this.images.length - 1);
            this.showCurrentImage();
        },
        
        gotoNumber() {
            this.currentIndex = parseInt(this.inputNumber) - 1;
            this.showCurrentImage();
        }
    }
};

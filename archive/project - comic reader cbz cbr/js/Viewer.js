const template = `
    <div>
        <div class="d-flex align-items-center justify-content-center viewer flex-column">
            <template v-if="images && images.length">
                <div class="position-fixed top-left h-100 d-flex align-items-center">
                    <button class="btn btn-primary rounded font-size-1.25vw opacity-0.5 ml-2 prev-button" @click="prevPanel()">
                        &lt;
                    </button>
                </div>

                <div class="position-fixed top-right h-100 d-flex align-items-center">
                    <button class="btn btn-primary rounded font-size-1.25vw opacity-0.5 mr-2 next-button" @click="nextPanel()">
                        &gt;
                    </button>
                </div>

                <div class="position-fixed bottom-left w-100 d-flex align-items-end p-1">
                    <span class="ml-3 text-info font-size-1.25vw">
                        {{curPanel + 1}} / {{totalPage}}
                    </span>

                    <button class="btn btn-danger ml-auto rounded font-size-1.25vw" @click="closeViewer()">
                        &times;
                    </button>
                </div>
            </template>

            <img class="mw-none h-auto d-block"
                    :style="{
                        'max-width': viewerWidth + 'px',
                        'max-height': viewerHeight + 'px'
                    }"
                    :src="images[curPanel]"
                    v-if="images && curPanel < images.length"/>

            <div v-for="p in panels" class="">
                <img :src="p" class=""/>
            </div>

            <div ref="smallPanelsContainer"></div>
        </div>
    </div>
`;


import ImageSpliter from './ImageSpliter.js';

export default {
    template,

    props: [
        'images',
        'totalPage'
    ],

    data() {
        return {
            curPanel: 0,
            // Kích thước của ảnh bằng kích thước của viewer
            // Không sử dụng 100% để có thể zoom được
            viewerWidth: null,
            viewerHeight: null,

            // Các ảnh nhỏ
            panels: [],
        };
    },

    mounted() {
        this.computeViewerDimension();

        // window.addEventListener('resize', this.computeViewerDimension);
    },

    methods: {
        computeViewerDimension() {
            const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            this.viewerWidth = vw; // - 10
            this.viewerHeight = vh;
            console.log(this.viewerWidth);
        },

        splitImage() {
            // 'images/origin.jpg'
            new ImageSpliter().split(this.images[this.curPanel], (images) => {
                this.$refs.smallPanelsContainer.innerHTML = '';
                images.forEach(img => {
                    img.className = 'd-block mb-5 mx-auto';
                    this.$refs.smallPanelsContainer.appendChild(img);
                });
            });
        },

        resetCurPanel() {
            this.curPanel = 0;
        },

        drawPanel(num) {
            this.curPanel = num;

            this.splitImage();
        },

        prevPanel() {
            if (this.curPanel > 0) {
                this.scrollToTop();
                this.drawPanel(this.curPanel - 1);
            }
        },

        nextPanel() {
            if (this.curPanel + 1 < this.images.length) {
                this.scrollToTop();
                this.drawPanel(this.curPanel + 1);
            }
        },

        scrollToTop() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },

        closeViewer() {
            this.$emit('close');
        }
    }
};

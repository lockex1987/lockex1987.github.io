import ComicViewerClose from './ComicViewerClose.js';
import ComicViewerProgress from './ComicViewerProgress.js';
import ImageSpliter from './ImageSpliter.js';

const template = `
<div v-show="screen == 'comic-viewer'">
    <comic-viewer-progress
            :current-index="currentIndex"
            :image-list-length="imageList.length"/>

    <comic-viewer-close />

    <div ref="readerBox"
            class="text-center d-flex justify-content-center align-items-center vw-100 vh-100">
        <img v-for="(image, idx) in imageList"
                class="mw-100 mh-100 h-auto"
                :src="image"
                v-if="idx == currentIndex"/>

        <!--img class="mw-none h-auto d-block"
                :style="{
                    'max-width': viewerWidth + 'px',
                    'max-height': viewerHeight + 'px'
                }"
                :src="imageList[currentIndex]"
                v-if="imageList && currentIndex < imageList.length"/-->

        <!--div v-for="p in panels" class="">
            <img :src="p" class=""/>
        </div-->
        <div ref="smallPanelsContainer"></div>
    </div>

    <div class="pointer-events-none zindex-20 position-fixed top-left h-100 d-flex align-items-center">
        <button class="pointer-events-auto btn btn-primary rounded font-size-1.25vw opacity-0.5 ml-2 prev-button"
                @click="prevPanel()">
            &lt;
        </button>
    </div>

    <div class="pointer-events-none zindex-20 position-fixed top-right h-100 d-flex align-items-center">
        <button class="pointer-events-auto btn btn-primary rounded font-size-1.25vw opacity-0.5 mr-2 next-button"
                @click="nextPanel()">
            &gt;
        </button>
    </div>
</div>`;

export default {
    template,

    props: [
        // 'imageListLength'
    ],

    components: {
        ComicViewerClose,
        ComicViewerProgress
    },

    data() {
        return {
            // Mảng các phần tử ảnh
            imageList: [],

            // Chỉ số index của trang hiện tại
            currentIndex: 0,

            // Kích thước của ảnh bằng kích thước của viewer
            // Không sử dụng 100% để có thể zoom được
            viewerWidth: null,
            viewerHeight: null,

            // Các ảnh nhỏ
            panels: []
        };
    },

    computed: {
        ...Vuex.mapState({
            screen: state => state.layout.screen,
            comic: state => state.comic.comic,
            issue: state => state.comic.issue,
            viewZip: state => state.comic.viewZip,
            zipImageList: state => state.comic.zipImageList
        })
    },

    watch: {
        /**
         * Lắng nghe sự kiện 'viewIssue' để hiện thị các trang của một tập truyện nào đó.
         */
        issue() {
            // Lấy danh sách các tập
            if (this.issue.imagesLink) {
                this.viewIssue();
            }
        },

        zipImageList() {
            this.imageList = this.zipImageList;
        },

        viewZip() {
            this.currentIndex = 0;
        }
    },

    mounted() {
        this.listenToSwipeEvent();
        this.computeViewerDimension();

        // window.addEventListener('resize', this.computeViewerDimension);
        // this.toggleFullScreen();
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
            new ImageSpliter().split(this.imageList[this.currentIndex], (images) => {
                this.$refs.smallPanelsContainer.innerHTML = '';
                images.forEach(img => {
                    img.className = 'd-block mb-5 mx-auto';
                    this.$refs.smallPanelsContainer.appendChild(img);
                });
            });
        },

        async viewIssue() {
            this.currentIndex = 0;
            const url = `data/${this.comic.id}/${this.issue.imagesLink}`;
            const data = await fetch(url).then(res => res.json());
            this.imageList = data;
        },

        /**
         * Chuyển trang.
         * @param {Integer} offset Đến trang tiếp (1) hoặc trang trước đó (-1)
         */
        gotoImage(offset) {
            this.currentIndex += offset;
        },

        /**
         * Chuyển đến ảnh trước đó.
         */
        prevPanel() {
            if (this.currentIndex > 0) {
                this.scrollToTop();
                this.drawPanel(this.currentIndex - 1);
            }
        },

        /**
         * Chuyển đến ảnh tiếp theo.
         */
        nextPanel() {
            if (this.currentIndex + 1 < this.imageList.length) {
                this.scrollToTop();
                this.drawPanel(this.currentIndex + 1);
            }
        },

        drawPanel(num) {
            this.currentIndex = num;

            // this.splitImage();
        },

        /**
         * Chuyển về đầu trang.
         */
        scrollToTop() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },

        /**
         * Xử lý full-screen.
         */
        toggleFullScreen() {
            if (isFullscreen()) {
                escapeFullscreen();
            } else {
                fullscreen(this.$refs.readerBox);
            }
        },

        toggleFullScreenx() {
            if (!document.fullscreenElement) {
                try {
                    // $refs.viewer
                    this.$el.requestFullscreen();
                    alert(2);
                } catch (ex) {
                    alert(ex);
                }
            } else {
                document.exitFullscreen();
            }
        },

        /**
         * Load ảnh của chapter.
         * @param index Index của ảnh
         * @param chap Index của chương (có thể có trường hợp chưa load xong chương này người dùng đã chuyển sang chương khác)
         */
        loadImage(index, chap) {
            if (index < links.length && chap == curChapIdx) {
                // Tạo đối tượng ảnh
                // Sau khi load xong thì load ảnh tiếp theo
                const img = new Image();
                const nextIndex = index + 1;
                img.onload = function () {
                    loadImage(nextIndex, chap);
                };
                img.src = links[index];

                // Thêm vào vùng hiển thị
                $('#viewer').append($('<div></div>').append(img));
            }
        },

        /**
         * Thêm sự kiện swipe trái và phải.
         */
        listenToSwipeEvent() {
            const hammer = new Hammer(this.$refs.readerBox);
            hammer.on('swipeleft swiperight tap', (evt) => {
                if (evt.isFinal) {
                    if (evt.type == 'swipeleft') {
                        if (this.currentIndex + 1 < this.imageList.length) {
                            this.gotoImage(1);
                        }
                    } else if (evt.type == 'swiperight') {
                        if (this.currentIndex - 1 >= 0) {
                            this.gotoImage(-1);
                        }
                    } else if (evt.type == 'tap') {
                        // this.toggleFullScreen();
                    }
                }
            });
        }
    }
};

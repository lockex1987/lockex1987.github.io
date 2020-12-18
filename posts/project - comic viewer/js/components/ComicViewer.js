import ImageSpliter from './ImageSpliter.js';

const template = `
<div v-show="screen == 'comic-viewer'">
    <div class="current-progress zindex-10 position-fixed top-left mt-2 ml-2">
        <div class="bar"
                :style="{ width: percent + '%'}"></div>
    
        <span class="current-index-label">
            {{text}}
        </span>
    </div>

    <span class="position-fixed top-right mt-2 mr-2 cursor-pointer font-weight-500 font-size-1.5 text-danger zindex-10 la la-times"
            @click="returnIssueListScreen()">
    </span>

    <!-- Toggle fullscreen -->
    <i class="la font-size-1.5 zindex-10 cursor-pointer position-fixed top-right mr-5 mt-2 text-success"
            :class="[isFullScreen ? 'la-compress-arrows-alt' : 'la-expand-arrows-alt']"
            @click="toggleFullscreen()"
            :title="isFullScreen ? 'Thoát toàn màn hình' : 'Xem toàn màn hình'"></i>

    <div ref="readerBox"
            class="text-center d-flex justify-content-center align-items-center vw-100 vh-100">
        <img v-for="(image, idx) in imageList"
                class="mw-100 mh-100 h-auto"
                :src="image"
                v-show="idx == currentIndex"/>

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
        <button class="pointer-events-auto btn btn-primary rounded font-size-1.25vw opacity-0.5 hover:opacity-1 ml-2 prev-button"
                @click="prevPanel()">
            &lt;
        </button>
    </div>

    <div class="pointer-events-none zindex-20 position-fixed top-right h-100 d-flex align-items-center">
        <button class="pointer-events-auto btn btn-primary rounded font-size-1.25vw opacity-0.5 hover:opacity-1 mr-2 next-button"
                @click="nextPanel()">
            &gt;
        </button>
    </div>
</div>`;

export default {
    template,

    data() {
        return {
            // Mảng các phần tử ảnh
            imageList: [],

            // Chỉ số index của trang hiện tại
            currentIndex: 0,

            // Có đang ở chế độ toàn màn hình hay không
            isFullScreen: false,

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
            zipImageList: state => state.comic.zipImageList
        }),

        /**
         * Phần trăm hoàn thành.
         */
        percent() {
            if (this.imageList.length == 0) {
                return 0;
            }
            return (this.currentIndex + 1) * 100 / this.imageList.length;
        },

        /**
         * Text hiển thị.
         */
        text() {
            if (this.imageList.length == 0) {
                return '...';
            }
            return (this.currentIndex + 1) + ' / ' + this.imageList.length;
        }
    },

    watch: {
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
        this.handleFullScreenChangeEvent();
    },

    methods: {
        /**
         * Chuyển về trang danh sách issue.
         */
        returnIssueListScreen() {
            this.$store.commit('layout/setScreen', 'comic-list');

            // Thoát khỏi toàn màn hình (nếu đang ở trong chế độ toàn màn hình)
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }

            // TODO: Free objectUrl
        },

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
         * Khi ở chế độ toàn màn hình thì đổi icon và title.
         */
        handleFullScreenChangeEvent() {
            document.addEventListener('fullscreenchange', () => {
                this.isFullScreen = !!document.fullscreenElement;
            });
        },

        /**
         * Hiển thị chế độ toàn màn hình
         */
        toggleFullscreen() {
            if (!document.fullscreenElement) {
                this.$el.requestFullscreen();
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

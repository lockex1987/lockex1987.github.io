// import CHAPTERS from '../data/dong_chu_liet_quoc.js';
import CHAPTERS from '../data/video_truyen_co_tich.js';
import YoutubePlayer from './YoutubePlayer.js';


const template = `
<div class="container-fluid mx-auto"
        style="max-width: 1000px;">
    <div class="row">
        <div class="col-lg-5 pl-0">
            <div class="top-left w-100 bg-white p-3 top-panel zindex-10">
                <input class="form-control"
                        v-model="filterInput"
                        type="text"
                        placeholder="Tìm kiếm..">
            </div>

            <div class="playlist overflow-auto custom-slim-scrollbar">
                <div v-for="chapterObj in filterChapters"
                        class="px-3 py-2 d-flex mb-3 cursor-pointer chapter-item border-bottom-x"
                        :class="{ 'bg-light': chapterObj.idx == currentChapterIndex }"
                        @click="setCurrentChapter(chapterObj.idx)">
                    <img :src="chapterObj.imageLink"
                            style="width: 8rem; height: 4.5rem"
                            class="mr-3 object-fit-cover"
                            v-if="chapterObj.imageLink"/>

                    <div class="flex-1">
                        <div class="text-primary">
                            {{chapterObj.title}}
                        </div>

                        <div class="text-muted"
                                v-if="chapterObj.subtitle">
                            {{chapterObj.subtitle}}
                        </div>

                        <div class='text-orange'
                                v-if="chapterObj.duration">
                            {{chapterObj.duration}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-7 px-0">
            <div class="bottom-left w-100 bg-white p-3 bottom-panel zindex-10">
                <div class="font-size-0.875 text-success mb-1 text-truncate">
                    {{currentChapterObject.title}}
                </div>
            
                <div class="font-weight-700 mb-3 text-truncate">
                    {{currentChapterObject.subtitle}}
                </div>
            
                <!--div>
                    <audio ref="myAudio"
                            :src="currentChapterObject.audioLink"></audio>
                </div-->

                <!-- Nội dung nhúng YouTube -->
                <youtube-player
                        v-if="currentChapterObject.youtubeId"
                        :id="currentChapterObject.youtubeId"
                        :key="currentChapterObject.youtubeId"
                        :autoplay="firstPlay == true"/>
            </div>
        </div>
    </div>
</div>
`;




export default {
    template,

    components: {
        YoutubePlayer
    },

    data() {
        return {
            chapters: CHAPTERS.map((e, idx) => ({
                ...e,
                idx
            })),
            currentChapterIndex: -1,
            filterInput: '',
            firstPlay: false
        };
    },

    computed: {
        /**
         * Chương hiện tại.
         */
        currentChapterObject() {
            if (this.currentChapterIndex < 0 || this.currentChapterIndex > this.chapters.length) {
                return {};
            }
            return this.chapters[this.currentChapterIndex];
        },

        filterChapters() {
            if (!this.filterInput) {
                return this.chapters;
            }
            const value = this.filterInput.toLowerCase();
            return this.chapters.filter(e => e.title.toLowerCase().includes(value) || (e.subtitle && e.subtitle.toLowerCase().includes(value)));
        }
    },

    mounted() {
        this.loadDefaultChapter();

        // createMediaPlayer(this.$refs.myAudio);

        // Load ảnh chậm
        // lazyload(document.querySelectorAll('#storyList img'));
    },

    methods: {
        /**
         * Ban đầu hiển thị một chương nào đó.
         */
        loadDefaultChapter() {
            let oldItemIndex = localStorage.getItem('currentChapterIndex');
            if (!oldItemIndex) {
                oldItemIndex = 0;
            } else {
                oldItemIndex = parseInt(oldItemIndex);
            }
            this.setCurrentChapter(oldItemIndex);
        },

        /**
         * Chọn chương nào đó.
         * @param {Integer} idx Chỉ số của chương
         */
        setCurrentChapter(idx) {
            this.currentChapterIndex = idx;
            localStorage.setItem('currentChapterIndex', idx);

            // Chờ thuộc tính currentChapterObject thay đổi
            this.$nextTick(() => {
                this.playMedia();
            });
        },

        /**
         * Tinh giảm lại tên truyện.
         */
        normalizeTitle(title) {
            if (title.includes('": ')) {
                title = title.split('": ')[0] + '"';
            }

            const regex = /["“’]([^"]*?)["”’]/g;
            let arr;
            const retval = [];
            while ((arr = regex.exec(title)) !== null) {
                retval.push(arr[1]);
            }

            if (retval.length == 0) {
                return title;
            } else if (retval.length == 1) {
                return retval[0];
            } else {
                return retval.map(s => `"${s}"`).join(', ');
            }
        },

        // https://github.com/tuupola/jquery_lazyload
        lazyload(images) {
            // Cập nhật lại source của ảnh
            const updateImageSource = function (img) {
                img.src = img.getAttribute('data-src');
            };

            // Nếu không hỗ trợ đối tượng IntersectionObserver thì load bình thường
            if (!window.IntersectionObserver) {
                images.forEach(function (img) {
                    updateImageSource(img);
                });
                return;
            }

            // Khởi tạo đối tượng IntersectionObserver
            const observerConfig = {
                root: null,
                rootMargin: '0px',
                threshold: [0]
            };
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.intersectionRatio > 0) {
                        // Lấy đối tượng img
                        const img = entry.target;

                        // Bỏ không theo dõi nữa
                        observer.unobserve(img);

                        // Cập nhật ảnh
                        updateImageSource(img);
                    }
                });
            }, observerConfig);

            // Theo dõi các ảnh
            images.forEach(function (img) {
                observer.observe(img);
            });
        },

        /**
         * Chơi file âm thanh.
         */
        playMedia() {
            if (!this.firstPlay) {
                this.firstPlay = true;
            } else {
                if (this.currentChapterObject.audioLink) {
                    const audioTag = this.$refs.myAudio;
                    audioTag.currentTime = 0;
                    audioTag.play();
                }
            }
        },

        /**
         * Kiểm tra ảnh minh họa.
         * @param {String} src Đường dẫn ảnh
         */
        checkImage(src) {
            // Bỏ ?w=180 ở cuối ảnh để lấy ảnh gốc
            src = src.replace('?w=180', '');

            const avatar = document.getElementById('avatar');
            const img = new Image();
            img.onload = function () {
                avatar.src = src;
            };
            img.onerror = function () {
                avatar.src = 'cttd.jpg';
            };
            img.src = src; // fires off loading of image
        }
    }
};

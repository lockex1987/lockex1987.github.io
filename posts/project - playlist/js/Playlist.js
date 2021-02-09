// import CHAPTERS from '../data/dong_chu_liet_quoc.js';
// import CHAPTERS from '../data/video_truyen_co_tich.js';
import CHAPTERS from '../data/sherlock_holmes.js';
import YoutubePlayer from './YoutubePlayer.js';


// Sử dụng ở History API
const baseUrl = location.href;

export default {
    components: {
        YoutubePlayer
    },

    data() {
        return {
            chapters: CHAPTERS.map((e, idx) => ({
                ...e,
                idx,
                slug: this.normalizeFileName(e.title)
            })),
            currentChapterIndex: -1,
            filterInput: '',
            firstPlay: false,
            showList: true,
            currentText: ''
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

        createMediaPlayer(this.$refs.myAudio);

        // Load ảnh chậm
        // lazyload(document.querySelectorAll('#storyList img'));

        // Người dùng nhấn phím Back/Forward
        /*
        window.addEventListener('popstate', function (event) {
            const historyStateObj = event.state;
            console.log('historyStateObj: ', historyStateObj);
            if (!historyStateObj || !historyStateObj.id) {
                this.showList = true;
            } else {
                // app.showStory(historyStateObj.id);
            }
        });
        */
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

                if (oldItemIndex >= this.chapters.length) {
                    oldItemIndex = 0;
                }
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

            // Thêm vào history, để sử dụng được nút Back của trình duyệt và mobile
            // Sử dụng hàm history.pushState
            // Truyền vào đối tượng state, title, url
            const currentChapter = this.chapters[idx];
            // console.log(story, this.chapters, idx);
            /*
            const historyStateObj = { id: currentChapter.slug };
            const historyTitle = currentChapter.title;
            const historyUrl = baseUrl + '#' + currentChapter.slug;
            // console.log('Change to story ' + historyTitle + ', ' + JSON.stringify(historyStateObj) + ', ' + historyUrl);
            history.pushState(historyStateObj, historyTitle, historyUrl);
            */

            // Chờ thuộc tính currentChapterObject thay đổi
            this.$nextTick(() => {
                this.playMedia();
            });

            if (currentChapter.slug) {
                this.loadText(currentChapter.slug);
            }
        },

        /**
         * Load text của chương truyện.
         * @param {String} slug Đường dẫn chương truyện
         */
        async loadText(slug) {
            const url = 'text/' + slug;
            const htmlCode = await fetch(url).then(resp => resp.text());
            this.showList = false;
            this.currentText = htmlCode;
        },

        /**
         * Chuyển về trang danh sách.
         */
        returnListView() {
            this.showList = true;
            // history.replaceState({}, 'Main', baseUrl);
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
        },

        normalizeFileName(title) {
            return title.toLowerCase().replace(/\s+/g, '_').replace(/'/g, '') + '.html';
        }
    }
};

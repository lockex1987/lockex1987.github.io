// https://github.com/codedread/bitjs
import * as bitjs from '../../libs/bitjs/archive/archive.js';

export default {
    data() {
        return {
            // Màn hình hiện tại
            // Có thể có các giá trị 'comic-list', 'comic-viewer'
            screen: 'comic-list',

            // Mảng các phần tử ảnh (URL.createObjectURL) trong file cbz, cbr
            imageList: [],

            // Mảng tên các ảnh,
            nameList: [],

            // Hiển thị toolbar
            showToolbar: false,

            // Tổng số ảnh trong file cbz, cbr
            imageListLength: 0,

            // Chỉ số index của trang hiện tại
            currentIndex: 0,

            // Có đang ở chế độ toàn màn hình hay không
            isFullScreen: false,

            // Đối tượng của thư viện Bitjs để giải nén
            unarchiver: null,

            // Chế độ xem ảnh (actual-size, best-fit, fit-width, fit-height)
            viewMode: 'best-fit',

            // Kích thước của ảnh bằng kích thước của viewer
            // Không sử dụng 100% hoặc 100vh, 100vw để có thể zoom được
            viewerWidth: null,
            viewerHeight: null,

            // Các ảnh nhỏ
            panels: []
        };
    },

    computed: {
        /**
         * Phần trăm hoàn thành.
         */
        viewProgress() {
            if (this.imageListLength == 0) {
                return {
                    percent: 0,
                    label: '...'
                };
            }
            return {
                percent: (this.currentIndex + 1) * 100 / this.imageListLength,
                label: (this.currentIndex + 1) + ' / ' + this.imageListLength
            };
        },

        /**
         * Tên của ảnh hiện tại.
         */
        currentImageName() {
            if (this.currentIndex >= this.nameList.length) {
                return '';
            }
            return this.nameList[this.currentIndex];
        }
    },

    mounted() {
        this.handleSwipeEvent();
        this.handleFullScreenChangeEvent();
        this.handleKeyboardShortcuts();
        this.handleClickEvent();

        this.computeViewerDimension();
        window.addEventListener('resize', this.computeViewerDimension);
    },

    methods: {
        /**
         * Bắt các sự kiện phím tắt.
         */
        handleKeyboardShortcuts() {
            document.addEventListener('keydown', (evt) => {
                const key = evt.key.toLowerCase();
                // console.log(key);

                if (this.screen == 'comic-viewer') {
                    if (key == 'pageup') {
                        evt.preventDefault();
                        this.gotoPreviousImage();
                    } else if (key == 'pagedown') {
                        evt.preventDefault();
                        this.gotoNextImage();
                    } else if (key == 'escape') {
                        this.closeViewer();
                    } else if (key == 'f') {
                        this.toggleFullscreen();
                    } else if (key == 'escape') {
                        // exit fullscreen hoặc thoát chương trình
                    } else if (key == 'a') {
                        this.viewMode = 'actual-size';
                    } else if (key == 'b') {
                        this.viewMode = 'best-fit';
                    } else if (key == 'w') {
                        this.viewMode = 'fit-width';
                    } else if (key == 'h') {
                        this.viewMode = 'fit-height';
                    } else if (key == 't') {
                        this.showToolbar = !this.showToolbar;
                    }

                    // H: Home (hiển thị danh sách ảnh dạng grid)
                } else {
                    if (key == 'o') {
                        this.$refs.inputFileChooser.click();
                    }
                }
            });
        },

        /**
         * Xử lý khi chọn file.
         * @param {Event} evt Đối tượng sự kiện.
         */
        handleChooseFile(evt) {
            const files = evt.target.files;
            if (files.length) {
                const file = files[0];
                // console.log(file);
                document.title = file.name;
                this.handleFile(file);

                evt.target.value = '';
            }
        },

        /**
         * Kiểm tra có phải là file ảnh hay không.
         * @param {String} url Đường dẫn
         */
        isImageFile(url) {
            const fileExtension = url.split('.')
                .pop()
                .toLowerCase();
            return ['jpg', 'jpeg', 'png'].includes(fileExtension);
        },

        /**
         * Xử lý file được chọn.
         * @param {Object} file Đối tượng file được chọn.
         */
        handleFile(file) {
            // Hiển thị viewer
            this.screen = 'comic-viewer';

            // Reset thông tin
            this.currentIndex = 0;
            this.imageListLength = 0;
            this.imageList = [];
            this.nameList = [];

            // this.handleFileWithLibUncompess(file);
            this.handleFileWithLibBitjs(file);
        },

        handleFileWithLibUncompess(file) {
            archiveOpenFile(file, null, (archive, err) => {
                // Nếu có lỗi
                if (!archive) {
                    alert(err);
                    return;
                }

                // console.info('Uncompressing ' + file.name + ' (' + archive.archive_type + ') ...');

                // Chỉ lọc ra file ảnh
                const arr = archive.entries.filter(e => e.is_file && this.isImageFile(e.name));
                // console.log(arr);
                this.imageListLength = arr.length;

                // Đọc từng file ảnh một
                // Hiển thị ảnh đầu tiên nhanh nhất có thể
                let idx = 0;
                this.nameList = arr.map(e => e.name);
                const readImage = () => {
                    arr[idx].readData(data => {
                        this.imageList.push(URL.createObjectURL(new Blob([data])));

                        // console.log(`${idx + 1} / ${arr.length}`);

                        idx++;
                        if (idx < arr.length) {
                            readImage();
                        }
                    });
                };

                readImage();
            });
        },

        handleFileWithLibBitjs(file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const ab = fileReader.result;
                this.loadFromArrayBuffer(ab);
            };
            fileReader.readAsArrayBuffer(file);
        },

        loadFromArrayBuffer(ab) {
            const start = (new Date()).getTime();
            const signatureBits = new Uint8Array(ab, 0, 10);
            const pathToBitjs = 'libs/bitjs/';
            if (signatureBits[0] == 0x52 && signatureBits[1] == 0x61 && signatureBits[2] == 0x72 && signatureBits[3] == 0x21) {
                // Rar
                this.unarchiver = new bitjs.Unrarrer(ab, pathToBitjs);
            } else if (signatureBits[0] == 80 && signatureBits[1] == 75) {
                // Zip
                this.unarchiver = new bitjs.Unzipper(ab, pathToBitjs);
            } else {
                // Try with tar
                this.unarchiver = new bitjs.Untarrer(ab, pathToBitjs);
            }

            // Listen for unarchive events.
            if (this.unarchiver) {
                this.unarchiver.addEventListener(bitjs.UnarchiveEventType.PROGRESS, (evt) => {
                    // const percentage = evt.currentBytesUnarchived / evt.totalUncompressedBytesInArchive;
                    // console.log(percentage, evt.totalFilesInArchive);
                });

                this.unarchiver.addEventListener(bitjs.UnarchiveEventType.INFO, (evt) => {
                    console.log(evt.msg);
                });

                this.unarchiver.addEventListener(bitjs.UnarchiveEventType.EXTRACT, (evt) => {
                    if (evt.unarchivedFile) {
                        const file = evt.unarchivedFile;
                        if (this.isImageFile(file.filename)) {
                            this.imageList.push(URL.createObjectURL(new Blob([file.fileData])));
                            this.nameList.push(file.name);
                            this.imageListLength = this.nameList.length;
                        }
                    }
                });

                this.unarchiver.addEventListener(bitjs.UnarchiveEventType.FINISH, (evt) => {
                    const diff = ((new Date()).getTime() - start) / 1000;
                    console.log('Unarchiving done in ' + diff + 's');
                });

                this.unarchiver.start();
            } else {
                alert('Some error');
            }
        },

        /**
         * Đóng màn hình viewer.
         */
        closeViewer() {
            // Chuyển về trang chủ
            this.screen = 'comic-list';

            // Thoát khỏi toàn màn hình (nếu đang ở trong chế độ toàn màn hình)
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }

            // Free objectUrl để tiết kiệm bộ nhớ
            this.imageList.forEach(url => URL.revokeObjectURL(url));

            // Nếu đang có tiến trình giải nén thì dừng tiến trình đó lại
            if (this.unarchiver) {
                this.unarchiver.stop();
                this.unarchiver = null;
            }
        },

        /**
         * Tính toán kích thước màn hình.
         */
        computeViewerDimension() {
            this.viewerWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 10;
            this.viewerHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        },

        splitImage() {
            // import ImageSpliter from './ImageSpliter.js';

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
         * Chuyển đến ảnh nào đó.
         * @param {Integer} idx Vị trí ảnh
         */
        gotoImage(idx) {
            this.currentIndex = idx;
            // this.splitImage();
        },

        /**
         * Chuyển đến ảnh trước đó.
         */
        gotoPreviousImage() {
            if (this.currentIndex > 0) {
                this.scrollToTop();
                this.gotoImage(this.currentIndex - 1);
            }
        },

        /**
         * Chuyển đến ảnh tiếp theo.
         */
        gotoNextImage() {
            if (this.currentIndex + 1 < this.imageList.length) {
                this.scrollToTop();
                this.gotoImage(this.currentIndex + 1);
            }
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
                document.body.requestFullscreen();
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
        handleSwipeEvent() {
            const hammer = new Hammer(this.$refs.readerBox);
            hammer.on('swipeleft swiperight tap', (evt) => {
                if (evt.isFinal) {
                    if (evt.type == 'swipeleft') {
                        if (this.currentIndex + 1 < this.imageList.length) {
                            this.gotoImage(this.currentIndex + 1);
                        }
                    } else if (evt.type == 'swiperight') {
                        if (this.currentIndex - 1 >= 0) {
                            this.gotoImage(this.currentIndex - 1);
                        }
                    } else if (evt.type == 'tap') {
                        // this.toggleFullScreen();
                    }
                }
            });
        },

        /**
         * Sử lý sự kiện click.
         */
        handleClickEvent() {
            document.addEventListener('click', (evt) => {
                if (this.screen == 'comic-viewer') {
                    this.showToolbar = !this.showToolbar;
                }
            });
        }
    }
};

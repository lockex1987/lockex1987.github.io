const template = `
<div v-show="screen == 'comic-list'"
        class="p-3">

    <h2>Comic viewer</h2>

    <div class="mb-3">
        <input type="file"
                accept=".cbr,.cbz"
                @change="handleChooseFile($event)">
    </div>
</div>`;


export default {
    template,

    computed: {
        ...Vuex.mapState({
            screen: state => state.layout.screen
        })
    },

    methods: {
        /**
         * Xử lý khi chọn file.
         * @param {Event} evt Đối tượng sự kiện.
         */
        handleChooseFile(evt) {
            const files = evt.target.files;
            if (files.length) {
                this.handleFile(files[0]);
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
            archiveOpenFile(file, null, (archive, err) => {
                // Nếu có lỗi
                if (!archive) {
                    alert(err);
                    return;
                }

                console.info('Uncompressing ' + file.name + ' (' + archive.archive_type + ') ...');

                // Chỉ lọc ra file ảnh
                const arr = archive.entries.filter(e => e.is_file && this.isImageFile(e.name));

                // Hiển thị viewer
                this.$store.commit('layout/setScreen', 'comic-viewer');
                this.$store.commit('comic/setViewZip', true);

                // Tổng số ảnh trong file cbz, cbr
                const imageListLength = arr.length;

                // Đọc từng file ảnh một
                // Hiển thị ảnh đầu tiên nhanh nhất có thể
                const imageList = Array(imageListLength).fill('');
                let idx = 0;
                const readImage = () => {
                    arr[idx].readData(data => {
                        imageList[idx] = URL.createObjectURL(new Blob([data]));
                        this.$store.commit('comic/setZipImageList', imageList);

                        console.log(`${idx + 1} / ${arr.length}`);

                        idx++;
                        if (idx < arr.length) {
                            readImage();
                        }
                    });
                };

                readImage();
            });
        }
    }
};

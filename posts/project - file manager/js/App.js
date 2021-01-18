import DownloadProgress from './DownloadProgress.js';


// const template = ``;


export default {
    // template,

    components: {
        DownloadProgress
    },

    data() {
        return {
            // Tim kiem file
            searchQuery: '',
            // Danh sach file
            files: null,
            // Thu muc hien tai
            folder: '/',
            // Danh sách các file đang upload
            uploadingFiles: [],
            // Chỉ số file đang upload
            currentIndex: 0
        };
    },

    computed: {
        filteredFiles() {
            if (!this.files) {
                return null;
            }
            const lowerCasedQuery = this.searchQuery.toLowerCase();
            return this.files.filter(f => f.name.toLowerCase().includes(lowerCasedQuery));
        }
    },

    mounted() {
        this.getUploadedFiles();
    },

    methods: {
        /**
         * Lấy danh sách file.
         */
        async getUploadedFiles() {
            const url = 'server/list_files.php?folder=' + encodeURIComponent(this.folder);
            const data = await fetch(url).then(resp => resp.json());

            // Sap xep folder truoc file
            // Sap xep theo ten
            data.sort((f1, f2) => {
                return ((f2.isDir ? 1 : 0) - (f1.isDir ? 1 : 0))
                        || f1.name.localeCompare(f2.name);
            });

            this.files = data.map(f => ({
                name: f.name,
                url: f.url,
                isDir: f.isDir,
                size: f.isDir ? '' : CommonUtils.prettifyNumber(f.size, 0) + 'B',
                download: false
            }));
        },

        /**
         * Mo thu muc.
         * @param {Object} f Thu muc
         */
        openFolder(f) {
            this.folder = this.folder + f.name + '/';
            this.getUploadedFiles();
        },

        /**
         * Chuyen den thu muc cha.
         */
        gotoParentFolder() {
            const a = this.folder.split('/');
            const b = a.slice(0, a.length - 2);
            this.folder = b.join('/') + '/';
            this.getUploadedFiles();
        },

        /**
         * Khi chọn file xong thì thông báo bắt đầu upload file.
         */
        startUploadFiles() {
            const uploadFileInput = this.$refs.uploadFileInput;
            const files = uploadFileInput.files;
            this.uploadingFiles = files;
            this.currentIndex = 0;

            this.uploadFileInput.value = '';

            this.uploadFile();
        },

        /**
         * Upload file.
         */
        uploadFile() {
            try {
                const formData = new FormData();
                formData.append('myFile', this.uploadingFiles[this.currentIndex]);

                const xhr = new XMLHttpRequest();
                xhr.addEventListener('load', this.uploadCompleteHandler);
                xhr.addEventListener('error', (evt) => {
                    alert(evt);
                });
                // xhr.upload.addEventListener('progress', this.uploadProgressHandler);
                xhr.responseType = 'json';
                xhr.open('POST', 'server/file_upload.php');
                xhr.send(formData);
            } catch (ex) {
                alert(ex);
            }
        },

        /**
         * Cập nhật phần trăm upload được.
         * @param {Event} evt Doi tuong su kien
         */
        uploadProgressHandler(evt) {
            const percent = (evt.loaded / evt.total) * 100;
            document.querySelector(`#progressBar${this.currentIndex}`).style.width = percent + '%';
        },

        /**
         * Xử lý khi đã upload xong một file.
         * @param {Event} e Doi tuong su kien
         */
        uploadCompleteHandler(e) {
            document.querySelector(`#progressBar${this.currentIndex}`).style.width = '100%';
            this.currentIndex++;
            if (this.currentIndex < this.uploadingFiles.length) {
                // Nếu còn file thì upload tiếp
                this.uploadFile();
            } else {
                // Đã upload xong, ẩn vùng upload
                this.uploadingFiles = [];
                this.currentIndex = 0;

                this.getUploadedFiles();
            }
        }
    }
};

import DownloadProgress from './DownloadProgress.js';


export default {
    components: {
        DownloadProgress
    },

    data() {
        return {
            // Xâu tìm kiếm
            searchQuery: '',
            // Danh sách file và folder của thư mục hiện tại
            files: null,
            // Thư mục hiện tại
            folder: '/',
            // Danh sách các file đang upload
            uploadingFiles: [],
            // Chỉ số file đang upload
            currentIndex: 0
        };
    },

    computed: {
        /**
         * Lọc nội dung theo xâu tìm kiếm.
         */
        filteredFiles() {
            if (!this.files) {
                return null;
            }
            const lowerCasedQuery = this.searchQuery.toLowerCase();
            return this.files.filter(f => f.name.toLowerCase().includes(lowerCasedQuery));
        },

        /**
         * Đường dẫn breadcrumb.
         */
        breadcrumbs() {
            const a = this.folder.split('/');
            return a.slice(1, a.length - 1);
        }
    },

    mounted() {
        this.listFolderContent();
    },

    methods: {
        /**
         * Lấy danh sách file và folder trong thư mục hiện tại.
         */
        async listFolderContent() {
            const url = 'server/list_files.php?folder=' + encodeURIComponent(this.folder);
            const data = await fetch(url).then(resp => resp.json());

            // Sap xep folder truoc file
            // Sap xep theo ten
            data.sort((f1, f2) => {
                return ((f2.isDir ? 1 : 0) - (f1.isDir ? 1 : 0)) || f1.name.localeCompare(f2.name);
            });

            this.files = data.map(f => ({
                name: f.name,
                url: f.url,
                isDir: f.isDir,
                size: f.isDir ? '' : CommonUtils.prettifyNumber(f.size, 0) + 'B',
                download: false
            }));

            // Reset lại thông tin tìm kiếm để hiển thị tất cả
            this.searchQuery = '';
        },

        /**
         * Mở thư mục.
         * @param {Object} f Đối tượng thư mục, gồm có thuộc tính name
         */
        openFolder(f) {
            this.folder = this.folder + f.name + '/';
            this.listFolderContent();
        },

        /**
         * Mở thư mục khi click vào breadcrumb.
         * @param {Integer} idx Chỉ số thư mục trên breadcrumb.
         */
        openFolderInBreadCrumbs(idx) {
            this.folder = '/' + this.breadcrumbs.slice(0, idx + 1).join('/') + '/';
            this.listFolderContent();
        },

        /**
         * Chuyen den thu muc cha.
         */
        gotoParentFolder() {
            const a = this.folder.split('/');
            const b = a.slice(0, a.length - 2);
            this.folder = b.join('/') + '/';
            this.listFolderContent();
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

                this.listFolderContent();
            }
        }
    }
};

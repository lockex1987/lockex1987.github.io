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
            currentIndex: 0,

            // Danh sách các file đang được mark
            markedFiles: []
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

            // Đầu tiên sắp xếp folder trước file
            // Sau đó sắp xếp theo tên
            data.sort((f1, f2) => {
                return ((f2.isDir ? 1 : 0) - (f1.isDir ? 1 : 0)) || f1.name.localeCompare(f2.name);
            });

            this.files = data.map(f => ({
                ...f,
                size: f.isDir ? f.size : CommonUtils.prettifyNumber(f.size) + 'B',
                download: false
            }));

            // Reset lại thông tin tìm kiếm để hiển thị tất cả
            this.searchQuery = '';
        },

        /**
         * Có phải là text file hay không.
         * @param {Object} file Đối tượng file / folder
         */
        isTextFile(file) {
            const ext = file.name.split('.').pop();
            const textFileExtensions = [
                'txt',
                'html',
                'htm',
                'svg',
                'ini',
                'bat',
                'env',
                'yml',
                'json',
                'sh',
                'md',
                'js',
                'css',
                'php'
            ];
            return textFileExtensions.includes(ext);
        },

        /**
         * Đánh dấu file.
         * @param {Object} file Đối tượng file / folder
         * @param {String} type Loại (copy, cut)
         */
        markFile(file, type) {
            // Kiểm tra đã tồn tại hay chưa
            const absolutePath = this.folder + file.name;
            const obj = this.markedFiles.find(e => e.absolutePath == absolutePath);
            if (!obj) {
                const markedItem = {
                    absolutePath,
                    file,
                    type
                };
                this.markedFiles.push(markedItem);
            } else if (obj.type != type) {
                obj.type = type;
            }
        },

        /**
         * Bỏ đánh dấu file.
         * @param {Integer} idx Chỉ số trong mảng
         */
        unmarkFile(idx) {
            this.markedFiles.splice(idx, 1);
        },

        /**
         * Xử lý paste đối tượng được đánh dấu.
         * @param {Object} markedItem Đối tượng được đánh dấu.
         */
        async processPaste(markedItem, idx) {
            const url = 'server/cmd_paste.php';
            const params = {
                type: markedItem.type,
                oldPath: markedItem.absolutePath,
                newPath: this.folder + markedItem.file.name
            };
            const options = {
                method: 'POST',
                body: JSON.stringify(params),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            };
            const data = await fetch(url, options).then(resp => resp.json());
            // console.log(data);
            if (data.code == 0) {
                noti.success((markedItem.type == 'copy' ? 'Copy' : 'Cut') + ' thành công');
                this.unmarkFile(idx);
                this.listFolderContent();
            } else if (data.code == 2) {
                noti.error(data.message);
            } else {
                noti.error('Đã có lỗi xảy ra');
            }
        },

        /**
         * Xác nhận xóa.
         * @param {Object} f Đối tượng file / folder
         */
        confirmDelete(f) {
            const message = 'Bạn có muốn xóa <b>' + f.name + '</b>?';
            noti.confirm(message, () => {
                this.processDelete(f);
            });
        },

        /**
         * Thực thi xóa.
         * @param {Object} f Đối tượng file / folder
         */
        async processDelete(f) {
            const url = 'server/cmd_delete.php';
            const params = {
                path: this.folder + f.name
            };
            const options = {
                method: 'DELETE',
                body: JSON.stringify(params),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            };
            const data = await fetch(url, options).then(resp => resp.json());
            if (data.code == 0) {
                noti.success('Xóa thành công');
                this.listFolderContent();
            } else {
                noti.error('Đã có lỗi xảy ra');
            }
        },

        /**
         * Mở hộp thoại nhập tên mới.
         * @param {Object} f Đối tượng file / folder
         */
        confirmRename(f) {
            const message = 'Nhập tên mới cho <b>' + f.name + '</b>:';
            const callback = (newName) => {
                if (newName) {
                    this.processRename(f, newName);
                }
            };
            noti.prompt(message, callback, 'Đổi tên', 'Đóng', f.name);
        },

        /**
         * Thực hiện đổi tên file / folder.
         */
        async processRename(f, newName) {
            const url = 'server/cmd_paste.php';
            const params = {
                type: 'rename',
                oldPath: this.folder + f.name,
                newPath: this.folder + newName
            };
            const options = {
                method: 'POST',
                body: JSON.stringify(params),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            };
            const data = await fetch(url, options).then(resp => resp.json());
            // console.log(data);
            if (data.code == 0) {
                noti.success('Đổi tên thành công');
                this.listFolderContent();
            } else {
                noti.error('Đã có lỗi xảy ra');
            }
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

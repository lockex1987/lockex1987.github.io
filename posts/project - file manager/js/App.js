/*
TODO: Review File manager ở thư mục project, Dataroom
*/
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
            markedFiles: [],

            // Nội dung file text đang chỉnh sửa
            fileContent: '',

            // Đường dẫn của file text đang chỉnh sửa
            currentFilePath: '',

            // Có phải là tạo mới file hay không
            isNewFile: false,

            // Đối tượng Highcharts, biểu đồ dung lượng
            sizeChart: null
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

            // this.listSizes();
        },

        /**
         * Lấy dung lượng để vẽ biểu đồ Sunburst.
         */
        async listSizes() {
            const url = 'server/list_sizes.php?folder=' + encodeURIComponent(this.folder);
            const data = await fetch(url).then(resp => resp.json());
            // console.log(data);
            const normalizedData = data.map(e => {
                const arr = e.path.split('/');
                return {
                    id: e.path,
                    parent: e.parent,
                    name: e.isFile == '1' ? arr.pop() : arr[arr.length - 2],
                    value: parseInt(e.size)
                };
            });

            this.drawChart(normalizedData);
        },

        /**
         * Vẽ mới biểu đồ.
         * @param {Array} data Dữ liệu
         */
        drawNewChart(data) {
            this.sizeChart = Highcharts.chart(this.$refs.sunburstChart, {
                chart: {
                    type: 'sunburst'
                },
                series: [
                    {
                        data: data,
                        // Không cho click vào tâm thì hiển thị cấp trên
                        allowDrillToNode: false,
                        cursor: 'pointer',
                        // Hiển thị label
                        dataLabels: {
                            format: '{point.name}',
                            filter: {
                                property: 'innerArcLength',
                                operator: '>',
                                value: 16
                            }
                        },
                        // Các cấp độ
                        levels: [
                            {
                                level: 1,
                                levelIsConstant: false,
                                dataLabels: {
                                    filter: {
                                        property: 'outerArcLength',
                                        operator: '>',
                                        value: 64
                                    }
                                }
                            },
                            {
                                level: 2,
                                colorByPoint: true
                            },
                            {
                                level: 3,
                                colorVariation: {
                                    key: 'brightness',
                                    to: -0.5
                                }
                            },
                            {
                                level: 4,
                                colorVariation: {
                                    key: 'brightness',
                                    to: 0.5
                                }
                            }
                        ]
                    }
                ],

                tooltip: {
                    headerFormat: '',
                    pointFormat: '<b>{point.name}</b>: {point.value} bytes'
                },

                plotOptions: {
                    series: {
                        events: {
                            // Phải dùng arrow function thì mới lấy được Vue instance this
                            click: (evt) => {
                                const pointObj = evt.point;
                                const node = pointObj.options;
                                const path = node.id;

                                // Click vào thư mục
                                if (path.endsWith('/')) {
                                    if (path == this.folder) {
                                        if (this.folder != '/') {
                                            this.gotoParentFolder();
                                        }
                                    } else {
                                        this.folder = path;
                                        this.listFolderContent();
                                    }
                                }
                            }
                        }
                    }
                }
            });
        },

        /**
         * Cập nhật biểu đồ.
         * @param {Array} data Dữ liệu
         */
        updateOldChart(data) {
            this.sizeChart.series[0].update({
                data: data
            });
        },

        /**
         * Vẽ biểu đồ.
         */
        drawChart(data) {
            if (!this.sizeChart) {
                this.drawNewChart(data);
            } else {
                this.updateOldChart(data);
            }
        },

        /**
         * Lấy nội dung file text.
         * @param {Object} f Đối tượng file / folder
         */
        async getTextFileContent(f) {
            const url = 'server/file_get_contents.php?filePath=' + encodeURIComponent(this.folder + f.name);
            const data = await fetch(url).then(resp => resp.text());

            this.currentFilePath = f.name;
            this.fileContent = data;
            this.isNewFile = false;

            this.openUpdateFileModal();
        },

        /**
         * Tạo mới file text.
         */
        newTextFile() {
            this.currentFilePath = '';
            this.fileContent = '';
            this.isNewFile = true;

            this.openUpdateFileModal();
        },

        /**
         * Lưu nội dung file text.
         */
        async saveFileContent() {
            const url = 'server/file_put_contents.php';
            const params = {
                filePath: this.folder + this.currentFilePath,
                content: this.fileContent
            };
            const options = {
                method: 'POST',
                body: JSON.stringify(params),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            };
            const data = await fetch(url, options).then(resp => resp.json());

            if (data.code == 0) {
                noti.success((this.isNewFile ? 'Thêm mới' : 'Cập nhật') + ' file thành công');
                this.closeUpdateFileModal();
                if (this.isNewFile) {
                    this.listFolderContent();
                }
            } else {
                noti.error('Đã có lỗi xảy ra');
            }
        },

        /**
         * Mở modal cập nhật file.
         */
        openUpdateFileModal() {
            $(this.$refs.updateFileModal).modal('show');
        },

        /**
         * Đóng modal cập nhật file.
         */
        closeUpdateFileModal() {
            $(this.$refs.updateFileModal).modal('hide');
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
         * Chuyển đến thư mục cha.
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

// Tham khảo: https://minhaskamal.github.io/DownGit

new Vue({
    el: '#app',

    data() {
        return {
            // Đánh dấu đang xử lý
            isProcessing: false,
            // Số file đã download
            downloadedFiles: 0,
            // Tổng số file
            totalFiles: 0,
            // URL người dùng nhập vào
            url: '',
            // Thông tin của repo
            repoInfo: {}
        };
    },

    methods: {
        /**
         * Xử lý sự kiện người dùng nhấn nút 'Download'.
         */
        download() {
            // Chỉ download folder, nếu kết thúc là / thì tự động xóa đi
            if (this.url.endsWith('/')) {
                this.url = this.url.substring(0, this.url.length - 1);
            }

            // Kiểm tra nhập URL và domain đúng là GitHub
            if (!this.url.match('https?://github.com/.+/.+')) {
                alert('Invalid URL!');
            } else {
                this.parseInfo(this.url);
                this.startDownloadDir();
            }
        },

        /**
         * Parse địa chỉ của GitHub và lấy ra các thông tin.
         * Một địa chỉ để test:
         *     https://github.com/lockex1987/lockex1987.github.io/tree/master/posts/js%20-%20common
         * @param {String} url Địa chỉ
         */
        parseInfo(url) {
            const path = new URL(url).pathname;
            const a = path.split('/');
            // console.log(path, a);

            this.repoInfo = {};
            this.repoInfo.author = a[1]; // ví dụ: lockex1987
            this.repoInfo.repository = a[2]; // ví dụ: lockex1987.github.io
            // a[3] luôn là 'tree'
            const branch = a[4];
            this.repoInfo.branch = branch; // ví dụ: master
            this.repoInfo.rootName = a[a.length - 1]; // ví dụ: 'js%20-%20common'
            // Đường dẫn kể từ sau branch trở đi
            this.repoInfo.resPath = path.substring(path.indexOf(branch) + branch.length + 1); // 'posts/js%20-%20common'

            // https://developer.github.com/v3/repos/contents/
            // Có thể bị giới hạn chỉ request được 60 lần trong 1 giờ
            // https://developer.github.com/v3/#rate-limiting
            // Thêm clientId và clientSecret ở đây để tăng số lần
            const clientId = 'daa1d6abcf4eed989d23';
            const clientSecret = '6a39e23bc694b8033c31cebfec8157be46bd693c';
            this.repoInfo.urlPrefix = 'https://api.github.com/repos/' + this.repoInfo.author + '/' + this.repoInfo.repository + '/contents/';
            this.repoInfo.urlPostfix = '?ref=' + this.repoInfo.branch +
                (clientId ? '&client_id=' + clientId : '') +
                (clientSecret ? '&client_secret=' + clientSecret : '');
            this.repoInfo.downloadFileName = this.repoInfo.rootName.replace(/%20/g, ' '); // 'js - common'
            this.repoInfo.rootDirectoryName = this.repoInfo.rootName.replace(/%20/g, ' ') + '/'; // 'js - common/'
            console.log(this.repoInfo);
        },

        /**
         * Bắt đầu download thư mục.
         */
        startDownloadDir() {
            // Đánh dấu đang xử lý
            this.isProcessing = true;

            const folderPaths = [];
            const files = [];
            const requestedPromises = [];

            folderPaths.push(this.repoInfo.resPath);

            this.mapFileAndFolder(folderPaths, files, requestedPromises);
        },

        /**
         * Mapping.
         * @param {Array} folderPaths Mảng đường dẫn thư mục
         * @param {Array} files Mảng đối tượng file
         * @param {Array} requestedPromises Mảng promise
         */
        async mapFileAndFolder(folderPaths, files, requestedPromises) {
            // Lấy thông tin của thư mục
            const url = this.repoInfo.urlPrefix + folderPaths.pop() + this.repoInfo.urlPostfix;
            const { data } = await axios.get(url);

            data.forEach(e => {
                if (e.type == 'dir') {
                    // Nếu phần tử là thư mục thì lại đẩy vào mảng folderPaths
                    folderPaths.push(e.path);
                } else if (e.download_url) {
                    // Nếu phần tử là file và có đường dẫn download thì download file
                    this.getFile(e.path, e.download_url, files, requestedPromises);
                }
            });

            if (folderPaths.length <= 0) {
                // Nếu đã mapping xong thì download các file
                this.finish(files, requestedPromises);
            } else {
                // Duyệt tiếp các thư mục
                this.mapFileAndFolder(folderPaths, files, requestedPromises);
            }
        },

        /**
         * Lấy thông tin của file.
         * @param {String} path Đường dẫn tương đối
         * @param {String} downloadUrl Đường dẫn download
         * @param {Array} files Mảng đối tượng file
         * @param {Array} requestedPromises Mảng promise
         */
        async getFile(path, downloadUrl, files, requestedPromises) {
            // Download file
            const promise = axios.get(downloadUrl, { responseType: 'arraybuffer' }).then(({ data }) => {
                // Thêm vào mảng file
                files.push({
                    path,
                    data
                });

                // Tăng số file đã download xong
                this.downloadedFiles = files.length;
            });

            // Thêm vào mảng promise
            requestedPromises.push(promise);

            // Tăng tổng số file
            this.totalFiles = requestedPromises.length;
        },

        /**
         * Download nhiều file.
         * @param {Array} files Mảng file
         * @param {Array} requestedPromises Mảng promise
         */
        async finish(files, requestedPromises) {
            // Chờ cho đến khi tất cả promise thực hiện xong
            const values = await Promise.all(requestedPromises);

            // Tạo file ZIP
            const zip = new JSZip();
            files.forEach(f => {
                const filePath = this.repoInfo.rootDirectoryName + f.path.substring(decodeURI(this.repoInfo.resPath).length + 1);
                zip.file(filePath, f.data);
            });
            const content = await zip.generateAsync({ type: 'blob' });

            // Đánh dấu đã xử lý xong
            this.isProcessing = false;

            // Lưu file về máy
            CommonUtils.downloadBlob(content, this.repoInfo.downloadFileName + '.zip');
        }
    }
});

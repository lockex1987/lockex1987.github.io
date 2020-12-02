new Vue({
    el: '#app',

    components: {
        OptionItem
    },

    data() {
        return {
            libraries: LIBRARIES.map(e => ({
                ...e,
                cssChosen: false,
                jsChosen: false
            }))
        };
    },

    methods: {
        /**
         * Lưu thông tin khai báo.
         */
        saveDeclaration() {
            let html = '';
            this.libraries.forEach(e => {
                if (e.cssChosen) {
                    html += '<link rel="stylesheet" href="/libs/' + this.getSaveFolder(e) + '/css/' + this.extractFilename(e.cssPath) + '" />\n';
                }
                if (e.jsChosen) {
                    html += '<script src="/libs/' + this.getSaveFolder(e) + '/js/' + this.extractFilename(e.jsPath) + '"></script>\n';
                }
            });
            CommonUtils.saveTextAsFile(html, 'declaration.txt');
        },

        /**
         * Lọc các file được chọn.
         */
        getChosenFiles() {
            const files = [];
            this.libraries.forEach(e => {
                if (e.cssChosen) {
                    files.push({
                        url: e.cssPath,
                        path: 'libs/' + this.getSaveFolder(e) + '/css/' + this.extractFilename(e.cssPath)
                    });
                    if (e.fontPaths) {
                        e.fontPaths.forEach(s => {
                            files.push({
                                url: s,
                                path: 'libs/' + this.getSaveFolder(e) + '/fonts/' + this.extractFilename(s)
                            });
                        });
                    }
                }
                if (e.jsChosen) {
                    files.push({
                        url: e.jsPath,
                        path: 'libs/' + this.getSaveFolder(e) + '/js/' + this.extractFilename(e.jsPath)
                    });
                }
            });

            // console.log(files);
            return files;
        },

        /**
         * Đóng gói các file.
         * Download file ZIP.
         */
        async downloadFiles() {
            const files = this.getChosenFiles();

            // Lấy nội dung từng file
            const promises = [];
            files.forEach(f => {
                const p = fetch(f.url).then(resp => resp.blob());
                promises.push(p);
            });

            // Chờ cho tất cả các file được lấy xong
            const results = await Promise.all(promises);

            // Tạo file ZIP
            const zip = new JSZip();
            results.forEach((data, idx) => {
                const f = files[idx];
                zip.file(f.path, data);
            });
            const content = await zip.generateAsync({ type: 'blob' });

            // Lưu file ZIP ra máy
            CommonUtils.downloadBlob(content, 'libs.zip');
        },

        /**
         * Lấy tên file từ URL.
         * @param {String} url 
         */
        extractFilename(url) {
            return url.split('/').pop();
        },

        /**
         * Lấy thư mục chứa.
         * @param {Object} lib Thư viện
         */
        getSaveFolder(lib) {
            return lib.savePath || lib.code;
        }
    }
});

import LIBRARIES from './data.js';
import OptionItem from './option-item.js';

new Vue({
    el: '#app',

    components: {
        OptionItem
    },

    data() {
        return {
            libraries: LIBRARIES.map(e => ({
                ...e,
                cssChosen: !!e.cssPath,
                jsChosen: !!e.jsPath
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
                // Thư mục lưu
                const folder = 'libs/' + this.getSaveFolder(e);

                // Chọn file CSS
                if (e.cssChosen) {
                    files.push({
                        url: e.cssPath,
                        path: folder + '/css/' + this.extractFilename(e.cssPath)
                    });

                    if (e.cssMap) {
                        files.push(this.getMapFile('css', e, folder));
                    }

                    if (e.fontPaths) {
                        e.fontPaths.forEach(s => {
                            files.push({
                                url: s,
                                path: folder + '/fonts/' + this.extractFilename(s)
                            });
                        });
                    }
                }

                // Chọn file JS
                if (e.jsChosen) {
                    files.push({
                        url: e.jsPath,
                        path: folder + '/js/' + this.extractFilename(e.jsPath)
                    });

                    if (e.jsMap) {
                        files.push(this.getMapFile('js', e, folder));
                    }
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
         * Lấy đường dẫn URL, bỏ đi phần tên file.
         * @param {String} url
         */
        extractBaseUrl(url) {
            const idx = url.lastIndexOf('/');
            return url.substring(0, idx + 1);
        },

        /**
         * Trả về đối tượng { url, path }.
         * @param {String} type Loại (js, css)
         * @param {Object} e Bản ghi
         */
        getMapFile(type, e, folder) {
            if (type == 'css') {
                if (e.cssMap.startsWith('http')) {
                    return {
                        url: e.cssMap,
                        path: folder + '/css/' + this.extractFilename(e.cssMap)
                    };
                }

                return {
                    url: this.extractBaseUrl(e.cssPath) + e.cssMap,
                    path: folder + '/css/' + e.cssMap
                };
            }

            if (type == 'js') {
                if (e.jsMap.startsWith('http')) {
                    return {
                        url: e.jsMap,
                        path: folder + '/js/' + this.extractFilename(e.jsMap)
                    };
                }

                return {
                    url: this.extractBaseUrl(e.jsPath) + e.jsMap,
                    path: folder + '/js/' + e.jsMap
                };
            }
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

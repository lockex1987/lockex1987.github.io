new Vue({
    el: '#app',

    data() {
        return {
            // Đường dẫn trên máy tính
            folderPath: 'D:/',
            // Đường dẫn tương ứng trên web
            basePath: '/data-drive-x/',
            // Danh sách các ảnh trùng.
            duplicates: null
        };
    },

    mounted() {
        this.getDuplicates();
    },

    methods: {
        /**
         * Lấy danh sách các ảnh trùng.
         */
        async getDuplicates() {
            const data = await fetch('data/duplicates.json').then(resp => resp.json());
            this.duplicates = data.map(dup => {
                const arr = dup.map(s => {
                    s = s.replace(/\\/g, '/');
                    return {
                        url: s.replace(this.folderPath, this.basePath),
                        name: s.split('/').pop(),
                        isDeleted: false
                    };
                });
                return arr;
            });
        },

        /**
         * Xóa ảnh
         * @param {Object} img Đối tượng ảnh
         */
        async deleteSingleImage(img) {
            const url = 'server/delete-images.php';
            const params = {
                files: [
                    img.url.replace(this.basePath, this.folderPath)
                ]
            };
            const options = {
                method: 'POST',
                body: JSON.stringify(params),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            };
            const data = await fetch(url, options).then(resp => resp.json());

            if (data.code == 0) {
                img.isDeleted = true;
            } else {
                alert('Đã có lỗi xảy ra');
            }
        }
    }
});

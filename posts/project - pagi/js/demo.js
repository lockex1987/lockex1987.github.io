new Vue({
    el: '#app',

    data() {
        return {
            items: []
        };
    },

    mounted() {
        this.$refs.pagi.reload();
    },

    methods: {
        /**
         * Chuyển đến trang nào đó.
         * @param {Integer} page Số thứ tự trang
         * @param {Integer} pageSize Số bản ghi mỗi trang
         */
        gotoPage(page, pageSize) {
            const { total, items } = this.callServer(page, pageSize);
            this.$refs.pagi.update(total, page);
            this.items = items;
        },

        /**
         * Giả lập viecj gọi server.
         * @param {Integer} page Số thứ tự trang
         * @param {Integer} pageSize Số bản ghi mỗi trang
         * @returns Tổng số bản ghi và danh sách dữ liệu
         */
        callServer(page, pageSize) {
            const startIndex = (page - 1) * pageSize;
            const total = 156;
            const items = [];
            const end = Math.min(startIndex + pageSize, total);
            for (let i = startIndex; i < end; i++) {
                items.push('Item ' + (i + 1));
            }
            return {
                total,
                items
            };
        }
    }
});

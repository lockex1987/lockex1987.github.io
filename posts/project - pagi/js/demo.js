new Vue({
    el: '#app',

    data() {
        return {
            items: []
        };
    },

    mounted() {
        this.gotoPage(1);
    },

    methods: {
        gotoPage(page) {
            const { total, items } = this.callServer(page);
            this.$refs.pagi.update(total, page);
            this.items = items.map((s, i) => (this.$refs.pagi.startIndex + i + 1) + '. ' + s);
        },

        callServer(page) {
            const pageSize = 10;
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

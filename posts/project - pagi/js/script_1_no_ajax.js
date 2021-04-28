import serverData from '../data/mock_data.js';

new Vue({
    el: '#app',

    data() {
        return {
            items: [],

            data: serverData,

            searchText: '',

            searchableProps: [
                'country'
            ]
        };
    },

    computed: {
        /**
         * Tìm kiếm nhanh trong trường hợp không sử dụng AJAX.
         */
        filteredData() {
            if (!this.searchableProps) {
                return this.data;
            } else if (!this.searchText) {
                return this.data;
            } else {
                const lower = this.searchText.toLowerCase();
                return this.data.filter(e => {
                    const foundProp = this.searchableProps.find(prop => e[prop].toLowerCase().includes(lower));
                    return !!foundProp;
                });
            }
        }
    },

    mounted() {
        this.search();

        /*
        this.makeSortable(
            this.table,
            (column, direction) => {
                this.sortDataLocal(column, direction);

                this.search();
            }
        );
        */
    },

    methods: {
        gotoPage(page, pageSize) {
            const { total, data } = this.getDataLocal(page, pageSize);
            this.$refs.pagi.update(total, page);
            this.items = data;
        },

        /**
         * Lấy dữ liệu của một trang nào đó trong trường hợp không sử dụng AJAX.
         * @param {Integer} page Số thứ tự trang (bắt đầu từ 1)
         */
        getDataLocal(page, pageSize) {
            const startIndex = (page - 1) * pageSize;
            const total = this.filteredData.length;
            const items = [];
            const end = Math.min(startIndex + pageSize, total);
            for (let i = startIndex; i < end; i++) {
                items.push(this.filteredData[i]);
            }
            return {
                total: total,
                data: items
            };
        },

        search() {
            this.$refs.pagi.reload();
        },

        /**
         * Sắp xếp dữ liệu trên client (local).
         * @param {String} column Cột sắp xếp
         * @param {String} direction 'asc' hoặc 'desc'
         */
        sortDataLocal(column, direction) {
            this.data.sort((a, b) => {
                if (a[column] < b[column]) {
                    return (direction == 'asc') ? -1 : 1;
                }
                if (a[column] > b[column]) {
                    return (direction == 'asc') ? 1 : -1;
                }
                return 0;
            });
        }
    }
});

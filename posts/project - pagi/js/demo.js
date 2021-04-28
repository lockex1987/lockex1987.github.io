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
            ],

            isLoading: false,

            useAjax: false,

            sortColumn: 'country',

            sortDirection: 'asc'
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

        Datatable.makeSortable(
            this.$refs.theTable,
            (column, direction) => {
                this.sortColumn = column;
                this.sortDirection = direction;

                if (!this.useAjax) {
                    this.sortDataLocal(column, direction);
                }

                this.search();
            }
        );
    },

    methods: {
        /**
         * Chuyển đến trang nào đó.
         * @param {Integer} page Số thứ tự trang
         * @param {Integer} pageSize Số bản ghi mỗi trang
         */
        gotoPage(page, pageSize) {
            if (this.useAjax) {
                this.getDataAjax(page, pageSize);
            } else {
                this.getDataLocal(page, pageSize);
            }
        },

        /**
         * Giả lập viecj gọi server.
         * Lấy dữ liệu của một trang nào đó trong trường hợp không sử dụng AJAX.
         * @param {Integer} page Số thứ tự trang (bắt đầu từ 1)
         * @param {Integer} pageSize Số bản ghi mỗi trang
         * @returns Tổng số bản ghi và danh sách dữ liệu
         */
        getDataLocal(page, pageSize) {
            const startIndex = (page - 1) * pageSize;
            const total = this.filteredData.length;
            const items = [];
            const end = Math.min(startIndex + pageSize, total);
            for (let i = startIndex; i < end; i++) {
                items.push(this.filteredData[i]);
            }

            this.$refs.pagi.update(total, page);
            this.items = items;
        },

        async getDataAjax(page, pageSize) {
            const sortColumn = '';
            const sortDirection = '';

            this.isLoading = true;

            const url = 'search.php?page=' + page
                + '&pageSize=' + pageSize
                + '&orderBy=' + sortColumn
                + '&orderType=' + sortDirection
                + '&search=' + encodeURIComponent(this.searchText);

            const resp = await fetch(url).then(resp => resp.json());

            const total = resp.total_x;
            const data = resp.data_x;

            this.$refs.pagi.update(total, page);
            this.items = data;

            this.isLoading = false;
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

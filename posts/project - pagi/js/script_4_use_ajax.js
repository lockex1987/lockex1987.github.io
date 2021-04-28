new Vue({
    el: '#app',

    data() {
        return {
            items: [],

            isLoading: false,

            searchText: '',

            totalPopulation: null
        };
    },

    mounted() {
        this.search();

        this.totalPopulation = 1234567890;

        /*
        this.makeSortable(
            this.table,
            (column, direction) => {
                this.sortColumn = column;
                this.sortDirection = direction;

                this.gotoPage(1);
            }
        );

        this.sortColumn = '';
        this.sortDirection = '';
        */
    },

    methods: {
        async gotoPage(page, pageSize) {
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
        }
    }
});

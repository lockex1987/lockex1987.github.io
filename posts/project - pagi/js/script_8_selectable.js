import serverData from '../data/mock_data.js';

new Vue({
    el: '#app',

    data() {
        return {
            items: serverData.slice(0, 10)
        };
    },

    mounted() {
        // Chọn dòng
        this.handleClickSelectableRow();
    },

    methods: {
        /**
         * Thêm sự kiện click để chọn dòng.
         */
        handleClickSelectableRow() {
            if (this.$refs.theTable.classList.contains('table-selectable')) {
                this.$refs.theTable.addEventListener('click', (evt) => {
                    const target = evt.target;
                    const row = target.closest('.table-selectable tbody tr');
                    if (row) {
                        row.classList.toggle('selected-row');
                    }
                });
            }
        },

        /**
         * Lấy ra dữ liệu của các dòng được chọn.
         */
        getSelectedRows() {
            const selectedRows = [];
            const rows = this.$refs.theTable.querySelectorAll('tbody tr');
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].classList.contains('selected-row')) {
                    selectedRows.push(this.items[i]);
                }
            }
            alert(JSON.stringify(selectedRows));
        }
    }
});

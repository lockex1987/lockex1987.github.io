import serverData from '../data/mock_data.js';

new Vue({
    el: '#app',

    data() {
        return {
            items: serverData.slice(0, 10).map(e => ({
                ...e,
                isSelected: false
            }))
        };
    },

    methods: {
        /**
         * Lấy ra dữ liệu của các dòng được chọn.
         */
        getSelectedRows() {
            const selectedRows = this.items.filter(e => e.isSelected);
            alert(JSON.stringify(selectedRows));
        }
    }
});

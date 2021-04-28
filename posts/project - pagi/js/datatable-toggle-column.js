import serverData from '../data/mock_data.js';

new Vue({
    el: '#app',

    data() {
        return {
            items: serverData.slice(0, 10),

            columnListNamespace: 'table-columns',

            columns: [
                { id: 'country', name: 'Quốc gia', isSelected: true },
                { id: 'population', name: 'Dân số', isSelected: true },
                { id: 'fake_date', name: 'Ngày nào đó', isSelected: true }
            ]
        };
    },

    mounted() {
        this.bindColumnList();
        this.saveColumnList();
    },

    methods: {
        checkColumn(col) {
            const obj = this.columns.find(e => e.id == col);
            return obj.isSelected;
        },

        saveColumnList() {
            const data = JSON.stringify(this.columns);
            localStorage.setItem(this.columnListNamespace, data);
        },

        bindColumnList() {
            const data = localStorage.getItem(this.columnListNamespace);
            if (data) {
                JSON.parse(data).forEach(col => {
                    if (!col.isSelected) {
                        const obj = this.columns.find(e => e.id == col.id);
                        obj.isSelected = false;
                    }
                });
            }
        }
    }
});

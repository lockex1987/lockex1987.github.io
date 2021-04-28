import serverData from '../data/mock_data.js';

new Vue({
    el: '#app',

    data() {
        return {
            items: serverData.slice(0, 10),

            columnListNamespace: 'table.column.'
        };
    },

    mounted() {
        // Hiển thị danh sách cột để ẩn hiện
        this.bindColumnList();
    },

    methods: {
        /**
         * Hiển thị danh sách các cột để ẩn hiện.
         */
        bindColumnList() {
            if (this.columnListNamespace) {
                // Thêm vùng div
                const columList = document.createElement('div');
                columList.className = 'datatable-column-list';
                columList.innerHTML = '<span class="text-muted">Hiển thị các cột:</span>';
                this.$refs.theTable.querySelectorAll('thead th').forEach((th, idx) => {
                    const labelTag = document.createElement('label');
                    labelTag.innerHTML = `<input type="checkbox" checked data-index="${idx}"> ${th.textContent.trim()}`;
                    if (localStorage.getItem(this.columnListNamespace + idx) == 'hide') {
                        labelTag.querySelector('input').checked = false;
                    }
                    columList.appendChild(labelTag);
                });

                const wrapper = this.$refs.theTable.parentNode;
                wrapper.parentNode.insertBefore(columList, wrapper.nextSibling);

                // Thêm sự kiện
                columList.addEventListener('change', (evt) => {
                    const checkbox = evt.target;
                    const index = checkbox.dataset.index;
                    const rows = this.$refs.theTable.querySelectorAll('tr');
                    if (checkbox.checked) {
                        localStorage.removeItem(this.columnListNamespace + index);
                        rows.forEach(r => {
                            r.cells[index].style.display = '';
                        });
                    } else {
                        localStorage.setItem(this.columnListNamespace + index, 'hide');
                        rows.forEach(r => {
                            r.cells[index].style.display = 'none';
                        });
                    }
                });
            }
        },

        /**
         * Sau khi hiển thị xong dữ liệu của cột thì cần gọi hàm này để ẩn các cột cần ẩn.
         */
        hideShouldBeHiddenColumns() {
            if (this.columnListNamespace) {
                const rows = this.$refs.theTable.querySelectorAll('tr');
                const numOfColumns = rows[0].cells.length;
                for (let index = 0; index < numOfColumns; index++) {
                    if (localStorage.getItem(this.columnListNamespace + index) == 'hide') {
                        rows.forEach(r => {
                            r.cells[index].style.display = 'none';
                        });
                    }
                }
            }
        }
    }
});

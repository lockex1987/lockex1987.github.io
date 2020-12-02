class Datatable {

    /**
     * Khởi tạo đối tượng.
     * @param {Object} options Các tùy chọn
     */
    constructor(options = {}) {
        // Khởi tạo các thuộc tính
        let defaultOptions = {};
        Object.assign(this, defaultOptions, options);

        // Người dùng có thể truyền vào xâu CSS selector của bảng hoặc trực tiếp DOM node của bảng
        // Nếu người dùng truyền vào xâu thì lấy ra DOM node
        if (typeof this.table == 'string') {
            this.table = document.querySelector(this.table);
        }

        // Thêm class đánh dấu cho bảng
        this.table.classList.add('datatable');

        this.createWrapper();

        this.checkBodyExist();

        // Người dùng truyền vào data hoặc là ajax
        if (this.data != undefined) {
            this.initLocal();
        } else if (this.ajax) {
            this.initRemote();
        }

        // Vùng phân trang
        let pagiContainer = this.createPagiContainer();

        this.pagi = new Pagi({
            container: pagiContainer,
            callbackFunc: this.gotoPage,
            pageSize: this.paginationSize || 10
        });

        // Lấy luôn dữ liệu
        this.gotoPage(1);

        // Xử lý các sự kiện:
        // - Click vào mũi tên expand
        // - Chọn dòng
        
        this.handleClickExpandableArrow();
        this.handleClickSelectableRow();

        // Hiển thị danh sách cột để ẩn hiện
        this.bindColumnList();
    }

    /**
     * Thêm vùng div .datatable-wrapper bao lấy thẻ table.
     */
    createWrapper() {
        if (this.table.parentNode.classList.contains('datatable-wrapper')) {
            return;
        }

        let wrapper = document.createElement('div');
        wrapper.className = 'datatable-wrapper';
        this.table.parentNode.insertBefore(wrapper, this.table);
        wrapper.appendChild(this.table);
    }

    /**
     * Kiểm tra thẻ tbody có hay không.
     * Nếu không có thì tự thêm.
     */
    checkBodyExist() {
        let tbody = this.table.querySelector('tbody');
        if (!tbody) {
            tbody = document.createElement('tbody');
            this.table.appendChild(tbody);
        }
    }

    /**
     * Tạo icon đang xử lý.
     */
    createLoader() {
        let loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                                <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                                        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                                        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                                    <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                                            C22.32,8.481,24.301,9.057,26.013,10.047z">
                                            <animateTransform attributeType="xml"
                                            attributeName="transform"
                                            type="rotate"
                                            from="0 20 20"
                                            to="360 20 20"
                                            dur="0.5s"
                                            repeatCount="indefinite"/>
                                </path>
                            </svg>`;
        loader.style.display = 'none';
        this.table.parentNode.appendChild(loader);

        // Truyền vào tham số để ở phương thức initRemote() có thể sử dụng
        this.loader = loader;
    }

    /**
     * Khởi tạo trong trường hợp không dùng AJAX.
     */
    initLocal() {
        this.gotoPage = (page) => {
            if (this.startSearchCallback) {
                this.startSearchCallback();
            }

            var obj = this.getDataLocal(page);
            this.pagi.update(obj.total, page);
            this.bindItems(obj.data);
        };

        this.makeSortable(
            this.table,
            (column, direction) => {
                this.sortDataLocal(column, direction);

                this.gotoPage(1);
            }
        );

        // Xử lý ô search nhanh
        if (this.searchableProps && !this.hideQuickSearch) {
            this.searchInput = this.createSearchInput();

            this.searchInput.addEventListener('input', () => {
                this.filterDataLocal(this.searchInput.value.trim());
                this.gotoPage(1);
            });
        }

        this.filterDataLocal();
    }
    
    /**
     * Khởi tạo trong trường hợp sử dụng AJAX.
     */
    initRemote() {
        // Tạo icon đang xử lý
        if (this.showLoading) {
            this.createLoader();
        }

        this.gotoPage = (page) => {
            if (this.loader) {
                this.loader.style.display = '';
            }

            if (this.startSearchCallback) {
                this.startSearchCallback();
            }

            this.ajax(page, this.pagi.pageSize, this.sortColumn, this.sortDirection)
                .then(resp => {
                    if (this.loader) {
                        this.loader.style.display = 'none';
                    }

                    if (this.finishSearchCallback) {
                        this.finishSearchCallback(resp);
                    }

                    let total, data;
                    if (this.getTotalAndData) {
                        ({ total, data } = this.getTotalAndData(resp));
                    } else {
                        total = resp['total'];
                        data = resp['data'];
                    }

                    this.pagi.update(total, page);
                    this.bindItems(data);
                });
        };

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
    }

    /**
     * Thêm vùng phân trang.
     */
    createPagiContainer() {
        const pagiContainer = document.createElement('div');
        pagiContainer.className = 'pagination-wrapper d-lg-flex align-items-center justify-content-between';

        // Người dùng thêm có thể thêm tùy chọn "paginationPosition" với giá trị "bellow" hoặc "above"
        const wrapper = this.table.parentNode;
        if (this.paginationPosition == 'bellow') {
            wrapper.parentNode.insertBefore(pagiContainer, wrapper.nextSibling);
        } else if (this.paginationPosition == 'above') {
            pagiContainer.classList.add('mb-3');
            wrapper.parentNode.insertBefore(pagiContainer, wrapper);
        } else {
            // Kiểm tra xem tùy chỉnh ở chỗ nào không
			const slot = wrapper.querySelector('.pagination-slot');
			if (slot) {
				slot.parentNode.replaceChild(pagiContainer, slot);
			} else {
				// Mặc định là ở dưới
				wrapper.parentNode.insertBefore(pagiContainer, wrapper.nextSibling);
			}
        }
        return pagiContainer;
    }

    /**
     * Hiển thị dữ liệu.
     * @param {Array} items Các bản ghi để hiển thị ở trang hiện tại
     */
    bindItems(items) {
        // Lưu biến trung gian để sử dụng ở phương thức getSelectedRows()
        this.items = items;

        // Thêm thuộc tính số thứ tự (stt) với mỗi phần tử để hiển thị cột số thứ tự cho dễ
        items.forEach((e, idx) => {
            e.stt = this.pagi.startIndex + idx + 1;
        });

        // Hiển thị dữ liệu với hàm rowTemplate của người dùng truyền vào
        if (this.rowTemplate) {
            if (items.length == 0) {
                this.table.style.display = 'none';
            } else {
                var html = '';
                items.forEach((e, idx) => {
                    html += this.rowTemplate(e);
                });
                this.table.querySelector('tbody').innerHTML = html;

                this.table.style.display = '';

                this.hideShouldBeHiddenColumns();
            }
        }

        // Gọi hàm callback
        // Vue có thể lấy dữ liệu ở đây
        if (this.bindItemsCallback) {
            this.bindItemsCallback(items);
        }
    }
    
    /**
     * Thêm ô search.
     */
    createSearchInput() {
        let searchWrapper = document.createElement('div');
        searchWrapper.className = 'py-2 d-flex justify-content-end';
        let searchInput = document.createElement('input');
        searchInput.className = 'form-control';
        searchInput.style.width = '200px';
        searchInput.placeholder = 'Tìm kiếm nhanh';
        searchWrapper.appendChild(searchInput);

        let wrapper = this.table.parentNode;
        wrapper.parentNode.insertBefore(searchWrapper, wrapper);

        return searchInput;
    }

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

    /**
     * Tìm kiếm nhanh trong trường hợp không sử dụng AJAX.
     */
    filterDataLocal(searchText) {
        if (!this.searchableProps) {
            this.filteredData = this.data;
        } else if (!searchText) {
            this.filteredData = this.data;
        } else {
            searchText = searchText.toLowerCase();
            this.filteredData = this.data.filter(e => {
                let foundProp = this.searchableProps.find(prop => e[prop].toLowerCase().includes(searchText));
                return !!foundProp;
            });
        }
    }

    /**
     * Thiết lập lại dữ liệu.
     * @param {Array} data Mảng dữ liệu
     */
    setData(data) {
        this.data = data;
    }

    /**
     * Lấy dữ liệu của một trang nào đó trong trường hợp không sử dụng AJAX.
     * @param {Integer} page Số thứ tự trang (bắt đầu từ 1)
     */
    getDataLocal(page) {
        let startIndex = (page - 1) * this.pagi.pageSize;
        let total = this.filteredData.length;
        let items = [];
        let end = Math.min(startIndex + this.pagi.pageSize, total);
        for (let i = startIndex; i < end; i++) {
            items.push(this.filteredData[i]);
        }
        return {
            total: total,
            data: items
        };
    }

    /**
     * Cho phép một bảng có thể sắp xếp được.
     * @param {DOMNode} table DOM node của bảng
     * @param {Function} callback Hàm callback
     */
    makeSortable(table, callback) {
        table.addEventListener('click', (evt) => {
            var attribute = 'data-sort-column';
            var target = evt.target;
            if (target.tagName == 'TH' && target.getAttribute(attribute)) {
                let iconSortAsc = 'sorting_asc';
                let iconSortDesc = 'sorting_desc';
    
                // Thẻ th hiện tại
                let thTag = target;
    
                // Lấy ra trường thông tin order
                let column = thTag.getAttribute(attribute);
    
                // Trạng thái order mới
                let direction = thTag.classList.contains(iconSortAsc) ? 'desc' : 'asc';
    
                // Xóa tất cả các order cũ
                table.querySelectorAll('[' + attribute + ']').forEach(otherTag => {
                    otherTag.classList.remove(iconSortAsc);
                    otherTag.classList.remove(iconSortDesc);
                });
    
                // Điều chỉnh lại mũi tên hiển thị của cột hiện tại
                thTag.classList.add(direction == 'asc' ? iconSortAsc : iconSortDesc);
    
                // Gọi hàm callback
                callback(column, direction);
            }
        });
    }

    /**
     * Tìm kiếm lại.
     */
    reload() {
        this.gotoPage(1);
    }

    /**
     * Thêm sự kiện click vào mũi tên để expand dòng nào đó.
     */
    handleClickExpandableArrow() {
        if (this.table.classList.contains('table-expandable')) {
            this.table.addEventListener('click', (evt) => {
                let target = evt.target;
                if (target.classList.contains('table-expandable-arrow')) {
                    let arrow = target;
                    arrow.classList.toggle('expanded');

                    let mainRow = arrow.closest('tr');
                    let detailRow = mainRow.nextElementSibling;
                    if (detailRow.style.display === 'none') {
                        detailRow.style.display = '';
                    } else {
                        detailRow.style.display = 'none';
                    }
                }
            });
        }
    }

    /**
     * Thêm sự kiện click để chọn dòng.
     */
    handleClickSelectableRow() {
        if (this.table.classList.contains('table-selectable')) {
            this.table.addEventListener('click', (evt) => {
                let target = evt.target;
                let row = target.closest('.table-selectable tbody tr');
                if (row) {
                    row.classList.toggle('selected-row');
                }
            });
        }
    }

    /**
     * Lấy ra dữ liệu của các dòng được chọn.
     */
    getSelectedRows() {
        let selectedRows = [];
        let rows = this.table.querySelectorAll('tbody tr');
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].classList.contains('selected-row')) {
                selectedRows.push(this.items[i]);
            }
        }
        return selectedRows;
    }

    /**
     * Hiển thị danh sách các cột để ẩn hiện.
     */
    bindColumnList() {
        if (this.columnListNamespace) {
            // Thêm vùng div
            let columList = document.createElement('div');
            columList.className = 'datatable-column-list';
            columList.innerHTML = '<span class="text-muted">Hiển thị các cột:</span>';
            this.table.querySelectorAll('thead th').forEach((th, idx) => {
                let labelTag = document.createElement('label');
                labelTag.innerHTML = `<input type="checkbox" checked data-index="${idx}"> ${th.textContent.trim()}`;
                if (localStorage.getItem(this.columnListNamespace + idx) == 'hide') {
                    labelTag.querySelector('input').checked = false;
                }
                columList.appendChild(labelTag);
            });

            var wrapper = this.table.parentNode;
            wrapper.parentNode.insertBefore(columList, wrapper.nextSibling);
        
            // Thêm sự kiện
            columList.addEventListener('change', (evt) => {
                let checkbox = evt.target;
                let index = checkbox.dataset.index;
                let rows = this.table.querySelectorAll('tr');
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
    }

    /**
     * Sau khi hiển thị xong dữ liệu của cột thì cần gọi hàm này để ẩn các cột cần ẩn.
     */
    hideShouldBeHiddenColumns() {
        if (this.columnListNamespace) {
            let rows = this.table.querySelectorAll('tr');
            let numOfColumns = rows[0].cells.length;
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

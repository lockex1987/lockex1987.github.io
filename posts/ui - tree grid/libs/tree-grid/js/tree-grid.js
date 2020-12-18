function initTreeGrid(tbody) {

    /**
     * Thêm căn trái và nút đóng / mở các dòng.
     */
    function bindIndentAndExpander() {
        let rows = tbody.querySelectorAll('tr.treegrid__row');

        // Lấy level nhỏ nhất
        let minLevel = 1000;
        rows.forEach(row => {
            let level = row.dataset.level;
            if (level < minLevel) {
                minLevel = level;
            }
        });

        // Duyệt từng dòng
        rows.forEach(row => {
            let id = row.dataset.id;
            let level = row.dataset.level;
            let columnNameCell = row.querySelector('td[data-column="name"]');
            let children = tbody.querySelectorAll('tr[data-parent="' + id + '"]');
    
            // Thêm nút đóng/mở
            if (children.length) {
                let expander = document.createElement('span');
                expander.className = 'treegrid__expander treegrid__expander--expanded';
                expander.dataset.id = id;
                columnNameCell.insertBefore(expander, columnNameCell.firstChild);
            }
    
            // Căn trái
            let indent = document.createElement('span');
            indent.className = 'treegrid__indent';
            indent.style.width = (25 + 25 * (level - minLevel)) + 'px';
            columnNameCell.insertBefore(indent, columnNameCell.firstChild);
        });
    }

    /**
     * Xử lý khi click vào nút đóng / mở.
     */
    function handleToggleEvent() {
        // Thêm đoạn kiểm tra để không bị gọi 2 lần
        if (!tbody.dataset.clickExpanderAdded) {
            tbody.addEventListener('click', clickExpander);
            tbody.dataset.clickExpanderAdded = true;
        }
    }

    /**
     * Xử lý khi click vào nút đóng / mở.
     * @param {Event} evt Đối tượng sự kiện
     */
    function clickExpander(evt) {
        let target = evt.target;

        // Nếu click vào expander
        if (target.classList.contains('treegrid__expander')) {
            let expander = target;
            if (expander.classList.contains('treegrid__expander--collapsed')) {
                // Nếu đang đóng thì mở các con trực tiếp
                showDirectChildren(expander);
            } else {
                // Nếu đang mở thì đóng cả con và cháu
                let id = expander.dataset.id;
                let row = tbody.querySelector('tr[data-id="' + id + '"]');
                recursiveHideAllChildren(row);
            }
        }
    }

    /**
     * Hiển thị các nút con trực tiếp.
     * @param {DOMNode} expander Nút đóng / mở
     */
    function showDirectChildren(expander) {
        expander.classList.add('treegrid__expander--expanded');
        expander.classList.remove('treegrid__expander--collapsed');

        let id = expander.dataset.id;
        let children = tbody.querySelectorAll('tr[data-parent="' + id + '"]');
        children.forEach(child => {
            child.style.display = '';
        });
    }

    /**
    * Xử lý đệ quy, ẩn tất cả các nút con của một nút.
    * @param {DOMNode} row Dòng dữ liệu
    */
    function recursiveHideAllChildren(row) {
        let id = row.dataset.id;
        let children = tbody.querySelectorAll('tr[data-parent="' + id + '"]');

        if (children.length) {
            children.forEach(child => {
                recursiveHideAllChildren(child);
                child.style.display = 'none';
            });

            let expander = row.querySelector('.treegrid__expander');
            expander.classList.add('treegrid__expander--collapsed');
            expander.classList.remove('treegrid__expander--expanded');
        }
    }

    bindIndentAndExpander();
    handleToggleEvent();
}


/**
 * Xây dựng mã HTML của tbody của bảng dữ liệu.
 * Hàm buildHtmlCodeOfRow cần trả về mã HTML của một dòng (thẻ tr),
 * trong đó cần có class="treegrid__row" và các thuộc tính data-id, data-parent, data-level.
 * Một cột cần có data-column="name" để biết cột nào sẽ thêm indent, expander.
 * @param {Array} data Dữ liệu, cần có các trường id, name, parentId, level
 * @param {Function} buildHtmlCodeOfRow Hàm xây dựng dữ liệu của một dòng
 */
function bindTreeGrid(data, buildHtmlCodeOfRow) {

    /**
     * Sắp xếp lại dữ liệu theo level và tên.
     */
    function sortData() {
        data.sort((a, b) => {
            // Các phần tử được đánh dấu thì hiển thị trước
            if (a.pinned) {
                return -1;
            }

            if (b.pinned) {
                return 1;
            }

            // Sắp xếp theo level và tên
            if (a.level != b.level) {
                return a.level - b.level;
            }

            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    }

    /**
     * Xử lý đệ quy để sinh mã HTML của bảng.
     * @param {Integer} parentId ID đơn vị cha
     */
    function traverseTreeToBuildHtmlCode(parentId) {
        let html = '';
        data.forEach(e => {
            if (e.parentId == parentId) {
                html += buildHtmlCodeOfRow(e);
                html += traverseTreeToBuildHtmlCode(e.id);
            }
        });
        return html;
    }

    /**
     * Sinh mã HTML của bảng dữ liệu.
     */
    function buildHtmlCodeOfTable() {
        let minLevel = Math.min(...data.map(e => e.level));
        let html = '';
        data.forEach(e => {
            // Duyệt qua các phần tử gốc
            if (e.level == minLevel) {
                html += buildHtmlCodeOfRow(e);
                html += traverseTreeToBuildHtmlCode(e.id);
            }
        });
        return html;
    }

    sortData();

    return buildHtmlCodeOfTable();
}


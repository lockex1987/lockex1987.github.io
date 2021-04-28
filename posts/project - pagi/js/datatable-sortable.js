const Datatable = {};

/**
 * Cho phép một bảng có thể sắp xếp được.
 * TODO: Cho vào mixin?
 * @param {DOMNode} table DOM node của bảng
 * @param {Function} callback Hàm callback, có 2 tham số là column và direction
 */
Datatable.makeSortable = (table, callback) => {
    table.addEventListener('click', (evt) => {
        const attribute = 'data-sort-column';
        const target = evt.target;
        if (target.tagName == 'TH' && target.getAttribute(attribute)) {
            const iconSortAsc = 'sorting_asc';
            const iconSortDesc = 'sorting_desc';

            // Thẻ th hiện tại
            const thTag = target;

            // Lấy ra trường thông tin order
            const column = thTag.getAttribute(attribute);

            // Trạng thái order mới
            const direction = thTag.classList.contains(iconSortAsc) ? 'desc' : 'asc';

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
};

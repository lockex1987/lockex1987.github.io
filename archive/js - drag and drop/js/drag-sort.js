/**
 * Khởi tạo sự kiện drag and drop.
 * @param {Array[DOMNode]} elements Mảng các đối tượng
 * @param {Function} callbackFunction Hàm gọi khi drop
 */
function initDragAndSort(elements, callbackFunction) {
    // CSS class để highlight đối tượng đang được drag
    const draggingCssClass = 'drag-sort__item--active';

    // Có thay đổi hay không
    let hasChange = false;

    // Xử lý khi đang drag
    const handleDrag = (evt) => {
        // Highlight đối tượng đang được drag
        const selectedItem = evt.target;
        selectedItem.classList.add(draggingCssClass);

        // Kiểm tra đối tượng ở vị trí drag đến
        const x = evt.clientX;
        const y = evt.clientY;
        const swapItem = document.elementFromPoint(x, y);

        // Nếu thỏa mãn thì thay đổi vị trí đối tượng được drag
        if (swapItem
                && swapItem.parentNode === selectedItem.parentNode
                && swapItem != selectedItem) {
            const pivotItem = selectedItem == swapItem.nextSibling ? swapItem : swapItem.nextSibling;
            selectedItem.parentNode.insertBefore(selectedItem, pivotItem);

            // Đánh dấu có thay đổi
            hasChange = true;
        }
    };

    // Xử lý sự kiện drop
    const handleDrop = (evt) => {
        // Bỏ highlight đối tượng được drag
        const selectedItem = evt.target;
        selectedItem.classList.remove(draggingCssClass);

        // Nếu có thay đổi thì gọi hàm callback
        // và reset lại đánh dấu thay đổi
        if (hasChange) {
            hasChange = false;
            callbackFunction(selectedItem);
        }
    };

    // Thiết lập cho từng phần tử
    elements.forEach(item => {
        item.setAttribute('draggable', true);
        item.addEventListener('drag', handleDrag);
        item.addEventListener('dragend', handleDrop);
    });
}


initDragAndSort(document.querySelectorAll('.drag-sort__item'), () => {
    console.log('Dropped');
});

initDragAndSort(document.querySelectorAll('#sortableTable > tbody > tr'), () => {
    console.log('Dropped');
});

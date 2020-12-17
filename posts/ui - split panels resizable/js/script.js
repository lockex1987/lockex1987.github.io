/**
 * Khởi tạo drag.
 * @param {DOMNode} bar Phần tử dragbar
 */
function initDraggable(bar) {

    // Các thành phần còn lại
    let container = bar.closest('.drag-container');
    let left = container.querySelector('.panel-left');

    // Hàm kiểm tra khi di chuyển chuột
    let dragFunction = (evt) => {
        // Không bôi đen (chọn) text
        document.selection ? document.selection.empty() : window.getSelection().removeAllRanges();

        // Thiết lập lại chiều rộng của vùng bên trái
        // Vùng bên phải sẽ tự fill phần còn lại do có flex bằng 1
        let width = evt.clientX - bar.offsetWidth / 2 - left.getBoundingClientRect().left;
        const maxWidth = 500;
        const minWidth = 100;
        width = Math.min(width, maxWidth);
        width = Math.max(width, minWidth);
        left.style.width = width + 'px';
    }

    // Khi nhấn chuột vào bar thì bắt đầu kiểm tra
    bar.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', dragFunction);
    });

    // Khi thả chuột thì dừng kiểm tra
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', dragFunction);
    });

    // Khi chuột ra khỏi vùng thì cũng dừng kiểm tra
    container.addEventListener('mouseleave', () => {
        document.removeEventListener('mousemove', dragFunction);
    });
}

initDraggable(document.querySelector('#dragbar'));

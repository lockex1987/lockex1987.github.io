/**
 * Lấy tọa độ của chuột.
 * @param {Event} evt 
 */
function getMouseCoordinates(evt) {
    return {
        x: evt.pageX,
        y: evt.pageY
    };
}

/**
 * Drag để thay đổi vị trí.
 */
function dragPosition() {

    // Đánh dấu có đang drag hay không
    let dragLock = false;

    // Phần tử DOM
    let element = null;

    // Vị trí tương đối của chuột so với phần tử đang được drag
    let relativeX;
    let relativeY;

    document.addEventListener('mousedown', (evt) => {
        let target = evt.target;
        if (target.classList && target.classList.contains('drag-position')) {
            element = target;

            let { x, y } = getMouseCoordinates(evt);
            relativeX = x - element.offsetLeft;
            relativeY = y - element.offsetTop;

            // Đánh dấu drag
            dragLock = true;
        }
    });

    document.addEventListener('mousemove', (evt) => {
        // Nếu là đang drag thì thay đổi vị trí của phần tử
        if (dragLock) {
            let { x, y } = getMouseCoordinates(evt);
			
			// Không để phần tử ra ngoài vùng hiển thị của trang web
            let maxLeft = document.documentElement.clientWidth - element.offsetWidth;
            let maxTop = document.documentElement.clientHeight - element.offsetHeight;
            
			element.style.left = Math.max(Math.min(x - relativeX, maxLeft), 0) + 'px';
            element.style.top = Math.max(Math.min(y - relativeY, maxTop), 0) + 'px';

            // element.style.left = (x - relativeX) + 'px';
            // element.style.top = (y - relativeY) + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        // Bỏ đánh dấu drag
        dragLock = false;
    });
}

dragPosition();

// https://css-tricks.com/simple-swipe-with-vanilla-javascript/
function initSwipe(container) {

    // Vùng chứa các item
    let inner = container.querySelector('.swipe-inner');

    // Chỉ số item hiện tại
    let currentItemIndex = 0;

    // Vị trí x bắt đầu
    let startXCoord = null;

    // Đánh dấu đang xử lý
    let isLocked = false;

    // Số item
    let noOfChildren = inner.children.length;


    /**
     * Lấy vị trí x.
     * Thống nhất sự kiện touch và mouse.
     * @param {Event} evt Sự kiện
     */
    function getXCoord(evt) {
        let e = evt.changedTouches ? evt.changedTouches[0] : evt;
        return e.clientX;
    }

    /**
     * Bắt đầu drag.
     * @param {Event} evt Sự kiện
     */
    function startDrag(evt) {
        startXCoord = getXCoord(evt);
        inner.classList.toggle('smooth', !(isLocked = true));
    }

    /**
     * Đang drag.
     * @param {Event} evt Sự kiện
     */
    function drag(evt) {
        evt.preventDefault();

        if (isLocked) {
            let draggedPixel = Math.round(getXCoord(evt) - startXCoord);
            inner.style.setProperty('--draggedPixel', `${draggedPixel}px`);
        }
    }

    /**
     * Kết thúc drag.
     * @param {Event} evt Sự kiện
     */
    function finishDrag(evt) {
        if (isLocked) {
            let deltaX = getXCoord(evt) - startXCoord;
            let sign = Math.sign(deltaX);
            let dragRatio = Math.abs(sign * deltaX / container.clientWidth).toFixed(2);

            if (dragRatio > .2) {
                currentItemIndex -= sign;
                currentItemIndex = Math.max(currentItemIndex, 0);
                currentItemIndex = Math.min(currentItemIndex, noOfChildren - 1);
                inner.style.setProperty('--currentItemIndex', currentItemIndex);
            }

            inner.style.setProperty('--draggedPixel', '0px');
            inner.style.setProperty('--remainRatio', 1 - dragRatio);
            inner.classList.toggle('smooth', !(isLocked = false));
            startXCoord = null;
        }
    }


    function init() {
        inner.style.setProperty('--noOfChildren', noOfChildren);

        inner.addEventListener('mousedown', startDrag);
        inner.addEventListener('touchstart', startDrag, { passive: true });

        inner.addEventListener('mousemove', drag);
        inner.addEventListener('touchmove', drag, { passive: true });
		
		window.addEventListener('mouseup', finishDrag);
        window.addEventListener('touchend', finishDrag);

        inner.addEventListener('transitionend', () => {
            inner.style.setProperty('--remainRatio', 1);
        });   
    }

    function gotoItem(n) {
        if (0 <= n && n <= noOfChildren - 1) {
            currentItemIndex = n;
            inner.classList.add('smooth');
            inner.style.setProperty('--currentItemIndex', currentItemIndex);
        }
    }

    function gotoNext() {
        gotoItem(currentItemIndex + 1);
    }

    function gotoPrevious() {
        gotoItem(currentItemIndex - 1);
    }

    function addItem(node) {
        node.classList.add('swipe-item');

        inner.appendChild(node);
        noOfChildren = inner.children.length;
        inner.style.setProperty('--noOfChildren', noOfChildren);
    }

    init();

    return {
        gotoItem,
        gotoNext,
        gotoPrevious,
        addItem
    };
}
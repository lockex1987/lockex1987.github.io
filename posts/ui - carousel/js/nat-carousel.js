(function () {
    // Các CSS class
    const NAT_CAROUSEL_CLASS = 'nat-carousel';
    const NAT_CAROUSEL_INNER_CLASS = 'nat-carousel-inner';

    // Đánh dấu đang được drag
    const draggedMark = {
        // Phần tử carousel-inner
        carouselInner: null,

        // Vị trí x bắt đầu khi drag
        startXCoord: 0,

        // Chiều rộng của từng phần tử
        itemWidth: 0,

        // Chỉ số phần tử đầu tiên bên trái
        startIndex: 0
    };

    /**
     * Lấy vị trí x.
     * Thống nhất sự kiện touch và mouse.
     * @param {Event} evt Sự kiện
     */
    function getXCoord (evt) {
        const e = evt.changedTouches ? evt.changedTouches[0] : evt;
        return e.clientX;
    }

    /**
     * Xử lý bắt đầu drag.
     * @param {Event} evt Sự kiện
     */
    function startDrag (evt) {
        draggedMark.carouselInner = evt.target.closest('.' + NAT_CAROUSEL_INNER_CLASS);
        if (draggedMark.carouselInner) {
            draggedMark.carouselInner.style.transitionDuration = '0s';

            draggedMark.startXCoord = getXCoord(evt);
            draggedMark.itemWidth = calculateItemWidth(draggedMark.carouselInner);
            draggedMark.startIndex = getStartIndex(draggedMark.carouselInner);
        }
    }

    /**
     * Xử lý đang drag.
     * @param {Event} evt Sự kiện
     */
    function handleDrag (evt) {
        if (draggedMark.carouselInner) {
            // Thêm preventDefault để không bị scroll dọc khi drag
            evt.preventDefault();

            const draggedPixel = Math.round(getXCoord(evt) - draggedMark.startXCoord);
            draggedMark.carouselInner.style.transform = `translateX(${draggedPixel - draggedMark.startIndex * draggedMark.itemWidth}px)`;
        }
    }

    /**
     * Xử lý kết thúc drag.
     * @param {Event} evt Sự kiện
     */
    function finishDrag (evt) {
        if (!draggedMark.carouselInner) {
            return;
        }

        const deltaX = getXCoord(evt) - draggedMark.startXCoord;
        // const dragRatio = Math.abs(deltaX / draggedMark.carouselInner.parentNode.clientWidth);

        // if (dragRatio > 0.1) {
        if (Math.abs(deltaX) > 30) {
            const newStartIndex = draggedMark.startIndex - Math.sign(deltaX) * Math.ceil(Math.abs(deltaX) / draggedMark.itemWidth); // Math.round, Math.floor
            draggedMark.startIndex = adjustIndex(draggedMark.carouselInner, newStartIndex);
            saveStartIndex(draggedMark.carouselInner, draggedMark.startIndex);
            updateIndicators(draggedMark.carouselInner, draggedMark.startIndex);
        }

        // const transitionDuration = (1 - dragRatio) * 0.25;
        const transitionDuration = 0.25;
        draggedMark.carouselInner.style.transitionDuration = `${transitionDuration}s`;

        updateScrollLeft(draggedMark.carouselInner, draggedMark.startIndex, draggedMark.itemWidth);

        // Bỏ đánh dấu
        draggedMark.carouselInner = false;
    }

    /**
     * Điều chỉnh lại chỉ số cho hợp lý.
     */
    function adjustIndex (carouselInner, itemIndex) {
        const totalItem = getTotalItem(carouselInner);
        const itemNum = getItemNum(carouselInner);
        let idx = Math.min(itemIndex, totalItem - itemNum);
        idx = Math.max(idx, 0);
        return idx;
    }

    /**
     * Lưu lại chỉ số bắt đầu hiện tại, để sau này dùng (khi resize, khi bắt đầu drag lần nữa).
     * @param {DOMNode} carouselInner
     */
    function saveStartIndex (carouselInner, startIndex) {
        carouselInner.dataset.startCarouselIndex = startIndex;
    }

    /**
     * Cập nhật indicator.
     * @param {DOMNode} carouselInner
     * @param {Integer} startIndex
     */
    function updateIndicators (carouselInner, startIndex) {
        const carousel = carouselInner.closest('.' + NAT_CAROUSEL_CLASS);
        const indicators = carousel.querySelectorAll('.nat-carousel-indicators [data-item-to]');
        indicators.forEach(e => {
            e.classList.remove('active');
        });
        if (indicators && indicators.length > startIndex) {
            indicators[startIndex].classList.add('active');
        }
    }

    /**
     * Lấy tổng số phần tử.
     */
    function getTotalItem (carouselInner) {
        return carouselInner.querySelectorAll('.nat-carousel-item').length;
    }

    /**
     * Lấy số phần tử hiển thị đồng thời một lúc.
     */
    function getItemNum (carouselInner) {
        return getComputedStyle(carouselInner).getPropertyValue('--carouselItemNum');
    }

    /**
     * Lấy chỉ số phần tử bắt đầu hiện tại (được lưu trong dataset startCarouselIndex với hàm saveStartIndex).
     * @param {DOMNode} carouselInner
     */
    function getStartIndex (carouselInner) {
        const n = carouselInner.dataset.startCarouselIndex;
        return n ? parseInt(n) : 0;
    }

    /**
     * Cập nhật lại vị trí của trang hiện tại.
     */
    function updateScrollLeft (carouselInner, startIndex, itemWidth) {
        const x = startIndex * itemWidth;
        carouselInner.style.transform = `translateX(${-x}px)`;
        /*
        const x = startIndex * 100;
        carouselInner.style.transform = `translateX(${-x}%)`;
        */
    }

    /**
     * Tính kích thước từng phần tử.
     */
    function calculateItemWidth (carouselInner) {
        const item = carouselInner.querySelector('.nat-carousel-item');
        const innerWidth = item.clientWidth; // offsetWidth
        const marginRight = parseInt(getComputedStyle(item).marginRight.replace('px', ''));
        return innerWidth + marginRight;
    }

    /**
     * Lắng nghe các sự kiện drag - touch.
     */
    function initDragEvents () {
        // Thêm tùy chọn { passive: false } để có thể gọi preventDefault
        window.addEventListener('touchstart', startDrag);
        window.addEventListener('touchmove', handleDrag, { passive: false });
        window.addEventListener('touchend', finishDrag);

        window.addEventListener('mousedown', startDrag);
        window.addEventListener('mousemove', handleDrag, { passive: false });
        window.addEventListener('mouseup', finishDrag);
    }

    /**
     * Khi thay đổi kích thước trình duyệt thì cần tính lại chiều rộng từng phần tử,
     * cập nhật lại vị trí.
     */
    function initResizeEvent () {
        // Dùng kỹ thuật debounce function
        let windowResizeTimeout;

        window.addEventListener('resize', () => {
            clearTimeout(windowResizeTimeout);

            windowResizeTimeout = setTimeout(() => {
                document.querySelectorAll('.' + NAT_CAROUSEL_INNER_CLASS).forEach(carouselInner => {
                    const itemWidth = calculateItemWidth(carouselInner);
                    const oldStartIndex = getStartIndex(carouselInner);
                    const startIndex = adjustIndex(carouselInner, oldStartIndex);
                    saveStartIndex(carouselInner, startIndex);
                    updateIndicators(carouselInner, startIndex);
                    updateScrollLeft(carouselInner, startIndex, itemWidth);
                });
            }, 400);
        });
    }

    /**
     * Lắng nghe các sự kiện khi click vào item trước, item sau.
     */
    function initControlEvents () {
        document.addEventListener('click', (evt) => {
            const carouselControl = evt.target.closest('.nat-carousel-control');
            if (carouselControl) {
                // evt.preventDefault();
                const carousel = carouselControl.closest('.' + NAT_CAROUSEL_CLASS);
                const carouselInner = carousel.querySelector('.' + NAT_CAROUSEL_INNER_CLASS);
                const itemWidth = calculateItemWidth(carouselInner);
                const oldStartIndex = getStartIndex(carouselInner);
                const direction = carouselControl.dataset.direction;
                let newStartIndex = oldStartIndex + (direction == 'prev' ? -1 : 1);

                // newStartIndex = adjustIndex(carouselInner, newStartIndex);
                const totalItem = getTotalItem(carouselInner);
                const itemNum = getItemNum(carouselInner);
                if (newStartIndex > totalItem - itemNum) {
                    newStartIndex = 0;
                }
                if (newStartIndex < 0) {
                    newStartIndex = totalItem - itemNum;
                }

                saveStartIndex(carouselInner, newStartIndex);
                updateIndicators(carouselInner, newStartIndex);
                updateScrollLeft(carouselInner, newStartIndex, itemWidth);
            }
        });
    }

    /**
     * Xử lý sự kiện khi click vào indicator.
     */
    function handleClickIndicators () {
        document.addEventListener('click', (evt) => {
            if (evt.target.matches('.nat-carousel-indicators [data-item-to]')) {
                const indicator = evt.target;
                const index = parseInt(indicator.dataset.itemTo);
                const carousel = indicator.closest('.' + NAT_CAROUSEL_CLASS);
                const carouselInner = carousel.querySelector('.' + NAT_CAROUSEL_INNER_CLASS);
                gotoItem(carouselInner, index);
            }
        });
    }

    /**
     * Chuyển đến phần tử tiếp theo hoặc đầu tiên.
     * Dùng ở hàm autoPlay
     * @param {DOMNode} carouselInner
     */
    function gotoNextOrFirstItem (carouselInner) {
        const itemWidth = calculateItemWidth(carouselInner);
        const oldStartIndex = getStartIndex(carouselInner);

        // Adjust
        const totalItem = getTotalItem(carouselInner);
        const itemNum = getItemNum(carouselInner);
        let newStartIndex = oldStartIndex + 1;
        if (newStartIndex > totalItem - itemNum) {
            newStartIndex = 0;
        }

        saveStartIndex(carouselInner, newStartIndex);
        updateIndicators(carouselInner, newStartIndex);
        updateScrollLeft(carouselInner, newStartIndex, itemWidth);
    }

    /**
     * Chuyển đến phần tử nào đó.
     * @param {DOMNode} carouselInner
     * @param {Integer} index
     */
    function gotoItem (carouselInner, index) {
        const itemWidth = calculateItemWidth(carouselInner);
        const startIndex = adjustIndex(carouselInner, index);
        saveStartIndex(carouselInner, startIndex);
        updateIndicators(carouselInner, startIndex);
        updateScrollLeft(carouselInner, startIndex, itemWidth);
    }

    // Khởi tạo
    initDragEvents();
    initResizeEvent();
    initControlEvents();
    handleClickIndicators();

    // Chìa ra các API
    if (!globalThis.Carousel) {
        globalThis.Carousel = {};
    }

    if (!globalThis.Carousel.autoPlay) {
        globalThis.Carousel.autoPlay = function (carouselInner, duration) {
            // Kiểm tra xem con trỏ chuột
            let checkMouseIn = false;

            // Xử lý các sự kiện: khi trỏ chuột thì không tự động play
            const carouselWrapper = carouselInner.closest('.nat-carousel-wrapper');
            if (carouselWrapper) {
                // focus, mouseenter
                carouselWrapper.addEventListener('mouseenter', (evt) => {
                    checkMouseIn = true;
                    console.log('Focus');
                });

                // blur, mouseleave
                carouselWrapper.addEventListener('mouseleave', (evt) => {
                    checkMouseIn = false;
                    console.log('Blur');
                });
            }

            setInterval(() => {
                // Auto play
                // Tự động thay đổi item
                if (!checkMouseIn) {
                    gotoNextOrFirstItem(carouselInner);
                }
            }, duration);
        };
    }

    if (!globalThis.Carousel.gotoItem) {
        globalThis.Carousel.gotoItem = gotoItem;
    }
})();

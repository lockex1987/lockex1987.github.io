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
    function getXCoord(evt) {
        const e = evt.changedTouches ? evt.changedTouches[0] : evt;
        return e.clientX;
    }

    /**
     * Xử lý bắt đầu drag.
     * @param {Event} evt Sự kiện
     */
    function startDrag(evt) {
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
    function handleDrag(evt) {
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
    function finishDrag(evt) {
        const carouselInner = draggedMark.carouselInner;
        if (!carouselInner) {
            return;
        }

        const deltaX = getXCoord(evt) - draggedMark.startXCoord;
        // const dragRatio = Math.abs(deltaX / carouselInner.parentNode.clientWidth);

        // if (dragRatio > 0.1) {
        if (Math.abs(deltaX) > 30) {
            const newStartIndex = draggedMark.startIndex - Math.sign(deltaX) * Math.ceil(Math.abs(deltaX) / draggedMark.itemWidth); // Math.round, Math.floor
            draggedMark.startIndex = adjustIndex(carouselInner, newStartIndex);
            saveStartIndex(carouselInner, draggedMark.startIndex);
            updateIndicators(carouselInner, draggedMark.startIndex);

            const tempFunc = () => {
                triggerSwipeEvent(carouselInner);
                carouselInner.removeEventListener('transitionend', tempFunc);
            };
            carouselInner.addEventListener('transitionend', tempFunc);
        }

        // const transitionDuration = (1 - dragRatio) * 0.25;
        const transitionDuration = 0.25;
        carouselInner.style.transitionDuration = `${transitionDuration}s`;

        updateScrollLeft(carouselInner, draggedMark.startIndex, draggedMark.itemWidth);

        // Bỏ đánh dấu
        draggedMark.carouselInner = false;
    }

    /**
     * Tạo sự kiện swipe.
     * @param {DOMNode} carouselInner Đối tượng inner
     */
    function triggerSwipeEvent(carouselInner) {
        const evt = new CustomEvent('swipe', {
            detail: {
                hazcheeseburger: true
            }
        });
        carouselInner.dispatchEvent(evt);
    }

    /**
     * Điều chỉnh lại chỉ số cho hợp lý.
     */
    function adjustIndex(carouselInner, itemIndex) {
        const totalItem = getTotalItem(carouselInner);
        const itemNum = getItemNum(carouselInner);
        let idx = Math.min(itemIndex, totalItem - itemNum);
        idx = Math.max(idx, 0);
        // console.log(idx, totalItem);
        return idx;
    }

    /**
     * Lưu lại chỉ số bắt đầu hiện tại, để sau này dùng (khi resize, khi bắt đầu drag lần nữa).
     * @param {DOMNode} carouselInner
     */
    function saveStartIndex(carouselInner, startIndex) {
        carouselInner.dataset.startCarouselIndex = startIndex;
    }

    /**
     * Cập nhật indicator.
     * @param {DOMNode} carouselInner
     * @param {Integer} startIndex
     */
    function updateIndicators(carouselInner, startIndex) {
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
    function getTotalItem(carouselInner) {
        return carouselInner.querySelectorAll('.nat-carousel-item').length;
    }

    /**
     * Lấy số phần tử hiển thị đồng thời một lúc.
     */
    function getItemNum(carouselInner) {
        return getComputedStyle(carouselInner).getPropertyValue('--carouselItemNum');
    }

    /**
     * Lấy chỉ số phần tử bắt đầu hiện tại (được lưu trong dataset startCarouselIndex với hàm saveStartIndex).
     * @param {DOMNode} carouselInner
     */
    function getStartIndex(carouselInner) {
        const n = carouselInner.dataset.startCarouselIndex;
        return n ? parseInt(n) : 0;
    }

    /**
     * Cập nhật lại vị trí của trang hiện tại.
     * @param {Boolean} animation Có hiển thị animation hay không (mặc định là có)
     */
    function updateScrollLeft(carouselInner, startIndex, itemWidth, animation = true) {
        if (!animation) {
            carouselInner.style.transitionDuration = '0s';
        }

        const x = startIndex * itemWidth;
        carouselInner.style.transform = `translateX(${-x}px)`;

        // carouselInner.style.transitionDuration = '0.25s';
    }

    /**
     * Tính kích thước từng phần tử.
     */
    function calculateItemWidth(carouselInner) {
        const item = carouselInner.querySelector('.nat-carousel-item');
        const innerWidth = item.clientWidth; // offsetWidth
        const marginRight = parseInt(getComputedStyle(item).marginRight.replace('px', ''));
        return innerWidth + marginRight;
    }

    /**
     * Lắng nghe các sự kiện drag - touch.
     */
    function initDragEvents() {
        // Thêm tùy chọn { passive: false } để có thể gọi preventDefault
        // Bị xung đột với custom-control-checkbox của Bootstrap trên iPad :(
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
    function initResizeEvent() {
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
    function initControlEvents() {
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
    function handleClickIndicators() {
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
    function gotoNextOrFirstItem(carouselInner) {
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
     * @param {Boolean} animation Có hiển thị animation hay không (mặc định là có)
     */
    function gotoItem(carouselInner, index, animation = true) {
        const itemWidth = calculateItemWidth(carouselInner);
        const startIndex = adjustIndex(carouselInner, index);
        saveStartIndex(carouselInner, startIndex);
        updateIndicators(carouselInner, startIndex);
        updateScrollLeft(carouselInner, startIndex, itemWidth, animation);
    }

    /**
     * Tự động chuyển slide sau một khoảng thời gian nhất định.
     * @param {DOMNode} carouselInner Phần tử carousel-inner
     * @param {Integer} duration Số milli giây
     */
    function autoPlay(carouselInner, duration) {
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
    }

    /**
     * Tính kích thước phần để để đảm bảo hiển thị carousel hợp lý, không bị mất góc ở đầu.
     * @param {DOMNode} carousel Phần tử carousel
     * @param {Integer} gutterWidth Kích thước 2 đầu (theo pixel), thường để chứa các điều hướng
     * @param {Integer} gapWidth Khoảng cách giữa các phần tử (theo pixel)
     * @param {Integer} numberOfItem Số phần tử
     * @returns {String} Kích thước nên dùng (tính theo pixel, bao gồm cả xâu 'px' ở cuối)
     */
    function computePreferWidth(carousel, gutterWidth, gapWidth, numberOfItem) {
        const originalWidth = Math.floor(parseFloat(getComputedStyle(carousel).width.replace('px', '')));
        const itemWidth = Math.floor((originalWidth - 2 * gutterWidth - (numberOfItem - 1) * gapWidth) / numberOfItem);
        const newWidth = itemWidth * numberOfItem + (numberOfItem - 1) * gapWidth + gutterWidth * 2;
        // console.log(originalWidth, itemWidth, newWidth);
        return newWidth + 'px';
    }

    // Khởi tạo
    function init() {
        initDragEvents();
        initResizeEvent();
        initControlEvents();
        handleClickIndicators();

        // Chìa ra các API
        if (!globalThis.Carousel) {
            globalThis.Carousel = {};
        }

        if (!globalThis.Carousel.autoPlay) {
            globalThis.Carousel.autoPlay = autoPlay;
        }

        if (!globalThis.Carousel.gotoItem) {
            globalThis.Carousel.gotoItem = gotoItem;
        }

        if (!globalThis.Carousel.computePreferWidth) {
            globalThis.Carousel.computePreferWidth = computePreferWidth;
        }
    }

    init();
})();

/**
 * medium-zoom.
 * Tạo hiệu ứng xem ảnh toàn màn hình.
 * Tham khảo:
 *   https://francoischalifour.com/medium-image-zoom/
 */
(() => {
    // Có đang animate không
    let isAnimating = false;

    // ?
    let scrollTop = 0;

    // Phần tử ảnh gốc
    let original = null;

    // Ảnh được zoom
    let zoomed = null;

    // Overlay
    const overlay = document.createElement('div');
    overlay.classList.add('medium-zoom-overlay');


    /**
     * Sự kiện click.
     */
    const handleClick = (evt) => {
        const target = evt.target;

        // Click vào overlay thì tắt đi
        if (target === overlay) {
            close();
            return;
        }

        // Nếu click vào ảnh thì ẩn / hiện
        if (target.classList && target.classList.contains('medium-zoom-image')) {
            toggle(target);
        }
    };

    /**
     * Scroll được một đoạn thì close.
     */
    const handleScroll = () => {
        // Nếu đang xử lý hoặc không bật thì dừng lại
        if (isAnimating || !original) {
            return;
        }

        const scrollOffset = 40;
        const currentScroll = getCurrentScrollTop();
        if (Math.abs(scrollTop - currentScroll) > scrollOffset) {
            setTimeout(close, 150);
        }
    };

    /**
     * Lấy vị trí scroll hiện tại.
     */
    const getCurrentScrollTop = () => {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    };

    /**
     * Nhấn Escape thì tắt.
     */
    const handleKeyUp = (evt) => {
        const key = evt.key || evt.keyCode;
        if (key === 'Escape' || key === 'Esc' || key === 27) {
            close();
        }
    };

    /**
     * Mở.
     */
    const open = (image) => {
        // Nếu đã bật rồi thì dừng lại
        if (zoomed) {
            return;
        }

        original = image;
        original.classList.add('medium-zoom-image--hidden');
        scrollTop = getCurrentScrollTop();
        isAnimating = true;

        const cloneImageToZoomed = (image) => {
            const rect = image.getBoundingClientRect();
            const top = rect.top;
            const left = rect.left;
            const width = rect.width;
            const height = rect.height;

            const scrollTop = getCurrentScrollTop();
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;

            const zoomed = image.cloneNode();
            zoomed.removeAttribute('id');
            zoomed.style.position = 'absolute';
            zoomed.style.top = top + scrollTop + 'px';
            zoomed.style.left = left + scrollLeft + 'px';
            zoomed.style.width = width + 'px';
            zoomed.style.height = height + 'px';
            zoomed.style.transform = '';
            zoomed.classList.remove('medium-zoom-image--hidden');
            zoomed.classList.add('medium-zoom-image--opened');
            zoomed.addEventListener('click', close);
            zoomed.addEventListener('transitionend', _handleOpenEnd);
            return zoomed;
        };

        const _handleOpenEnd = () => {
            isAnimating = false;
            zoomed.removeEventListener('transitionend', _handleOpenEnd);
        };

        zoomed = cloneImageToZoomed(image);

        document.body.appendChild(overlay);
        document.body.appendChild(zoomed);

        window.requestAnimationFrame(() => {
            overlay.classList.add('medium-zoom--opened');
        });

        const _animate = () => {
            const container = {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            };
            const margin = 16;
            const viewportWidth = container.width - margin * 2;
            const viewportHeight = container.height - margin * 2;
            const zoomTarget = original;
            const naturalWidth = zoomTarget.naturalWidth || viewportWidth;
            const naturalHeight = zoomTarget.naturalHeight || viewportHeight;
            const rect = zoomTarget.getBoundingClientRect();
            const top = rect.top;
            const left = rect.left;
            const width = rect.width;
            const height = rect.height;
            const scaleX = Math.min(naturalWidth, viewportWidth) / width;
            const scaleY = Math.min(naturalHeight, viewportHeight) / height;
            const scale = Math.min(scaleX, scaleY);
            const translateX = (-left + (viewportWidth - width) / 2 + margin + container.left) / scale;
            const translateY = (-top + (viewportHeight - height) / 2 + margin + container.top) / scale;
            const transform = 'scale(' + scale + ') translate3d(' + translateX + 'px, ' + translateY + 'px, 0)';
            zoomed.style.transform = transform;
        };

        _animate();
    };

    /**
     * Đóng.
     */
    const close = () => {
        // Nếu đang xử lý hoặc là đang không bật thì dừng lại
        if (isAnimating || !original) {
            return;
        }

        // Đánh dấu đang xử lý
        isAnimating = true;

        overlay.classList.remove('medium-zoom--opened');

        const _handleCloseEnd = () => {
            // Đánh dấu đã xử lý xong
            isAnimating = false;

            original.classList.remove('medium-zoom-image--hidden');

            document.body.removeChild(zoomed);
            document.body.removeChild(overlay);

            zoomed.classList.remove('medium-zoom-image--opened');
            zoomed.removeEventListener('transitionend', _handleCloseEnd);

            // Tắt
            original = null;
            zoomed = null;
        };

        zoomed.style.transform = '';
        zoomed.addEventListener('transitionend', _handleCloseEnd);
    };

    /**
     * Ẩn / hiện.
     */
    const toggle = (image) => {
        if (original) {
            close();
        } else {
            open(image);
        }
    };


    document.addEventListener('click', handleClick);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', close);
})();

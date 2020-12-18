class PageViewer {

    /**
     * Khởi tạo.
     * @param {String} html Mã HTML, có thể rỗng
     */
    constructor(html) {
        try {
            this.initGui();

            // Thêm nội dung và tính toán kích thước
            this.initHtml(html);
            this.content.style.columnWidth = this.content.parentNode.clientWidth + 'px';
            this.calculatePageWidthAndColumnWidthAndTotalPage();

            // Chỉ số trang hiện tại
            this.pageIndex = 0;

            this.initResizeEvent();

            // Vị trí x bắt đầu
            this.startXCoord = 0;

            // Đánh dấu đang xử lý
            this.isLocked = false;

            this.initDrag();
        } catch (ex) {
            alert(ex.message);
        }
    }

    initHtml(html) {
        if (!html) {
            // TODO: Thử dùng các add các node, không dùng innerHTML xem có nhanh không
            html = this.getHtmlCode();
            this.content.innerHTML = html;
        } else {
            this.content.innerHTML = html;
        }
    }

    /**
     * Lấy HTML của vùng hiển thị của từng trang.
     */
    getHtmlCode() {
        let hostname = window.location.hostname;

        if (hostname == 'vnca.cand.com.vn') {
            return document.querySelector('.detail-head').innerHTML
                    + document.querySelector('.detail-content').innerHTML;
        }

        if (hostname == 'localhost' || hostname == 'lockex1987.github.io') {
            return document.querySelector('article').innerHTML;
        }

        if (hostname == 'vnexpress.net') {
            let article = document.querySelector('#article_detail');
            if (article) {
                return article.innerHTML;
            }

            return document.querySelector('.title_news_detail').outerHTML
                    + document.querySelector('.description').outerHTML
                    + document.querySelector('.content_detail').outerHTML;
        }

        // https://m.facebook.com/story.php?story_fbid=494663298045019&id=100025040600875
        if (location.href.includes('m.facebook.com/story.php')) {
            let article = document.querySelector('.story_body_container');
            if (article) {
                return article.innerHTML;
            }
        }
    }

    /**
     * Thiết lập giao diện.
     */
    initGui() {
        let viewerPadding = 20;

        this.content = document.createElement('div');
        this.content.className = 'content';
        this.content.style.columnGap = `${viewerPadding}px`;

        this.info = document.createElement('div');
        this.info.className = 'info';

        let contentWrapper = document.createElement('div');
        contentWrapper.className = 'content-wrapper';
        contentWrapper.appendChild(this.content);
        
        this.viewer = document.createElement('div');
        this.viewer.className = 'viewer';
        this.viewer.style.padding = `50px ${viewerPadding}px 20px`;
        this.viewer.appendChild(contentWrapper);
        this.viewer.appendChild(this.info);
        this.viewer.appendChild(this.initCloseButton());
        this.viewer.appendChild(this.initFirstButton());
        this.viewer.appendChild(this.initLastButton());
        document.body.appendChild(this.viewer);
    }

    /**
     * Tính:
     * - kích thước từng trang
     * - kích thước của từng cột
     * - tổng số trang
     */
    calculatePageWidthAndColumnWidthAndTotalPage() {
        let columnGap = parseInt(this.content.style.columnGap.replace('px', ''));
        this.content.style.columnWidth = this.content.parentNode.clientWidth + 'px';

        this.pageWidth = this.content.clientWidth + columnGap;
        this.totalPage = Math.round(this.content.scrollWidth / this.pageWidth);
    }

    /**
     * Khi thay đổi kích thước thì cần tính lại.
     */
    initResizeEvent() {
        window.addEventListener('resize', () => {
            this.updateDimension();
        });
    }

    /**
     * Tính toán lại các kích thước.
     * Cập nhật lại vị trí.
     * Cập nhật lại nhãn trang.
     */
    updateDimension() {
        this.calculatePageWidthAndColumnWidthAndTotalPage();
        this.updateScrollLeft();
        this.updateInfo();
    }

    /**
     * Cập nhật lại vị trí của trang hiện tại.
     */
    updateScrollLeft() {
        let x = this.pageIndex * this.pageWidth;
        this.content.style.transform = `translateX(${-x}px)`;
    }

    /**
     * Thêm nút đóng.
     */
    initCloseButton() {
        let btnClose = document.createElement('button');
        btnClose.innerHTML = '&#215;'; // &times; ×  &#215;	&#xD7;
        //btnClose.innerHTML = '&' + '#215;'; // Phải chuyển thành cộng thế này nếu không thì khi copy encodeURI sẽ bị lỗi
        btnClose.className = 'btn btn-close';
        btnClose.addEventListener('click', () => {
            this.hide();
        });
        return btnClose;
    }

    /**
     * Thêm nút về trang đầu tiên.
     */
    initFirstButton() {
        let btnFirst = document.createElement('button');
        btnFirst.textContent = '«'; // ‹
        btnFirst.className = 'btn btn-nav btn-first';
        btnFirst.addEventListener('click', () => {
            this.pageIndex = 0;
            this.content.style.transition = 'none';
            this.updateInfo();
            this.updateScrollLeft();
        });
        return btnFirst;
    }

    /**
     * Thêm nút đến trang cuối cùng.
     */
    initLastButton() {
        let btnLast = document.createElement('button');
        btnLast.textContent = '»'; // ›
        btnLast.className = 'btn btn-nav btn-last';
        btnLast.addEventListener('click', () => {
            this.pageIndex = this.totalPage - 1;
            this.content.style.transition = 'none';
            this.updateInfo();
            this.updateScrollLeft();
        });
        return btnLast;
    }

    /**
     * Hiển thị viewer.
     */
    show() {
        this.viewer.classList.add('show');

        document.body.style.maxHeight = '100vh';
        document.body.style.overflow = 'hidden';

        this.content.style.transition = 'none';
        this.pageIndex = 0;
        this.updateDimension();
    }

    /**
     * Ẩn viewer.
     */
    hide() {
        this.viewer.classList.remove('show');

        document.body.style.maxHeight = 'unset';
        document.body.style.overflow = 'auto';
    }

    /**
     * Hiển thị thông tin (trang hiện tại, tổng số trang).
     */
    updateInfo() {
        this.info.innerHTML = (this.pageIndex + 1) + '/' + this.totalPage;
    }

    /**
     * Lấy vị trí x.
     * Thống nhất sự kiện touch và mouse.
     * @param {Event} evt Sự kiện
     */
    getXCoord(evt) {
        let e = evt.changedTouches ? evt.changedTouches[0] : evt;
        return e.clientX;
    }

    /**
     * Bắt đầu drag.
     * @param {Event} evt Sự kiện
     */
    startDrag(evt) {
        this.startXCoord = this.getXCoord(evt);
        this.isLocked = true;
        this.content.style.transition = 'none';
        this.content.parentNode.style.cursor = 'grabbing';
    }

    /**
     * Đang drag.
     * @param {Event} evt Sự kiện
     */
    handleDrag(evt) {
        //evt.preventDefault();

        if (this.isLocked) {
            let draggedPixel = Math.round(this.getXCoord(evt) - this.startXCoord);
            this.content.style.transform = `translateX(${draggedPixel - this.pageIndex * this.pageWidth}px)`;
        }
    }

    /**
     * Kết thúc drag.
     * @param {Event} evt Sự kiện
     */
    finishDrag(evt) {
        if (this.isLocked) {
            let deltaX = this.getXCoord(evt) - this.startXCoord;
            let sign = Math.sign(deltaX);
            let dragRatio = Math.abs(deltaX / this.content.parentNode.clientWidth);

            if (dragRatio > 0.2) {
                let currentItemIndex = this.pageIndex;
                currentItemIndex -= sign;
                currentItemIndex = Math.max(currentItemIndex, 0);
                currentItemIndex = Math.min(currentItemIndex, this.totalPage - 1);
                this.pageIndex = currentItemIndex;

                this.updateInfo();
            }

            this.isLocked = false;
            
            let transitionDuration = (1 - dragRatio) * 0.5;
            this.content.style.transition = `transform ${transitionDuration}s ease-out`;
            this.content.parentNode.style.cursor = 'grab';

            this.updateScrollLeft();
        }
    }

    /**
     * Thêm sự kiện drag để chuyển trang.
     */
    initDrag() {
        this.content.parentNode.addEventListener('mousedown', (evt) => {
            this.startDrag(evt);
        });
        this.content.parentNode.addEventListener('touchstart', (evt) => {
            this.startDrag(evt);
        }, { passive: true });

        this.content.parentNode.addEventListener('mousemove', (evt) => {
            this.handleDrag(evt);
        });
        this.content.parentNode.addEventListener('touchmove', (evt) => {
            this.handleDrag(evt);
        }, { passive: true });
		
		window.addEventListener('mouseup', (evt) => {
            this.finishDrag(evt);
        });
        window.addEventListener('touchend', (evt) => {
            this.finishDrag(evt);
        });
    }
}

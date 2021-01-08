/**
 * Pagi: A pagination library
 * Code mới nhất ở https://lockex1987.github.io/posts/project - pagi/js/pagi.js.
 *
 * @version 2.1.0
 * @author lockex1987
 */
class Pagi {
    /**
     * Khởi tạo.
     * @param Object options Tùy chọn
     */
    constructor(options = {}) {
        const defaultOptions = {
            showFirst: true,
            showLast: true,
            showPrevious: true,
            showNext: true,
            showNumbers: true,
            previousText: '&laquo;', // &lt;
            nextText: '&raquo;', // &gt;
            showNoRecordText: true,
            noRecordText: 'Không có bản ghi nào',
            showTotalNumber: true,
            pageSize: 10,
            showGotoPage: true
        };
        Object.assign(this, defaultOptions, options);
        this.addClickListener();
    }

    /**
     * Cập nhật.
     * @param Integer totalNumber Tổng số trang
     * @param Integer currentPage Trang hiện tại
     */
    update(totalNumber, currentPage) {
        this.setting(totalNumber, currentPage)
            .render();
    }

    /**
     * Thiết lập lại thông tin, tính toán lại.
     * Server cần trả về số bản ghi và trang hiện tại là trang nào.
     */
    setting(totalNumber, currentPage) {
        this.totalNumber = totalNumber;
        this.totalPage = Math.ceil(this.totalNumber / this.pageSize);
        this.currentPage = (currentPage > this.totalPage) ? this.totalPage : currentPage; // 1, 2

        // Hiển thị 5 trang (trừ khi có ít hơn 5 trang)
        // Trang hiện tại ở vị trí giữa (thứ 3), trừ khi trang hiện tại nhỏ hơn 3 hoặc cách trang cuối cùng ít hơn 2 trang
        if (this.totalPage <= 5) {
            this.startPage = 1;
            this.endPage = this.totalPage;
        } else if (this.currentPage <= 3) {
            this.startPage = 1;
            this.endPage = 5;
        } else if (this.currentPage + 2 >= this.totalPage) {
            this.startPage = this.totalPage - 4;
            this.endPage = this.totalPage;
        } else {
            this.startPage = this.currentPage - 2;
            this.endPage = this.currentPage + 2;
        }

        // Index bắt đầu, tiện khi hiển thị số thứ tự phân trang
        this.startIndex = (this.currentPage - 1) * this.pageSize;

        // Tạo mảng các trang
        this.pages = [];
        for (let i = this.startPage; i <= this.endPage; i++) {
            this.pages.push(i);
        }

        return this;
    }

    /**
     * Click vào phân trang (thẻ A).
     */
    addClickListener() {
        this.container.addEventListener('click', (evt) => {
            const target = evt.target;
            if (target.tagName == 'A') {
                if (!target.classList.contains('active') &&
                        !target.classList.contains('disabled')) {
                    const page = parseInt(target.dataset.page);
                    this.callbackFunc(page);
                }
            }
        });
    }

    /**
     * Hiển thị.
     */
    render() {
        // Xóa dữ liệu cũ
        this.container.innerHTML = '';

        if (this.totalNumber <= 0) {
            // Nếu rỗng thì hiển thị thông báo
            if (this.showNoRecordText) {
                this.container.appendChild(this.createNoRecordText());
            }
        } else {
            // Hiển thị số bản ghi
            if (this.showTotalNumber) {
                this.container.appendChild(this.createTotalNumberText());
            }

            if (this.totalPage > 1) {
                this.ulTag = this.createUlTag();

                // Link trang đầu, trang trước
                this.createFirstPage();
                this.createPreviousPage();

                if (this.showNumbers) {
                    for (let i = this.startPage; i <= this.endPage; i++) {
                        if (i === this.currentPage &&
                                this.showGotoPage) {
                            // Hiển thị ô chuyển đến trang
                            this.createGotoPageInput();
                        } else {
                            this.createMiddlePage(i);
                        }
                    }
                }

                // Link trang sau, trang cuối
                this.createNextPage();
                this.createLastPage();

                this.container.appendChild(this.ulTag);
            }
        }
    }

    /**
     * Thông báo không tồn tại dữ liệu.
     */
    createNoRecordText() {
        const elem = document.createElement('span');
        elem.className = 'no-record text-danger';
        elem.textContent = this.noRecordText;
        return elem;
    }

    /**
     * Thẻ UL bao bên ngoài.
     */
    createUlTag() {
        const ulTag = document.createElement('ul');
        ulTag.className = 'pagination mb-0';
        return ulTag;
    }

    /**
     * Link đến trang đầu tiên.
     */
    createFirstPage() {
        if (this.showFirst &&
                this.currentPage > 2 &&
                this.startPage > 1) {
            const liTag = this.createItem(1, 1, '');
            this.ulTag.appendChild(liTag);
        }
    }

    /**
     * Link đến trang trước.
     */
    createPreviousPage() {
        if (this.showPrevious && this.currentPage > 1) {
            const liTag = this.createItem(this.previousText, this.currentPage - 1, '');
            this.ulTag.appendChild(liTag);
        }
    }

    /**
     * Link đến các trang ở tầm giữa.
     * @param Integer i Chỉ số trang
     */
    createMiddlePage(i) {
        const liTag = this.createItem(
            CommonUtils && CommonUtils.formatThousands ? CommonUtils.formatThousands(i) : i,
            i,
            i === this.currentPage ? 'active' : ''
        );
        this.ulTag.appendChild(liTag);
    }

    /**
     * Chuyển đến trang nào đó.
     */
    createGotoPageInput() {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control d-inline-block mb-2 mb-md-0 mx-1 text-center';
        input.style.width = '50px';
        input.placeholder = '#';
        input.value = this.currentPage;

        const gotoPage = () => {
            const value = input.value.trim();
            if (value === '') {
                return;
            }
            const regex = /(^\d\d*$)/;
            if (!regex.test(value)) {
                noti.error('Bạn phải nhập trang kiểu số nguyên dương');
                return;
            }
            const page = parseInt(value);
            if (page <= 0) {
                noti.error('Trang phải lớn hơn 0');
                return;
            }
            if (page > this.totalPage) {
                noti.error('Trang vượt quá tổng số trang');
                return;
            }
            this.callbackFunc(page);
        };

        input.addEventListener('blur', gotoPage);
        input.addEventListener('keydown', (evt) => {
            const keyCode = evt.keyCode;
            if (keyCode == 13) {
                // Nhấn ENTER
                // Không submit form
                evt.preventDefault();

                gotoPage();
            }
        });

        const liTag = document.createElement('li');
        liTag.className = 'page-item';
        liTag.appendChild(input);
        this.ulTag.appendChild(liTag);
    }

    /**
     * Link đến trang tiếp theo.
     */
    createNextPage() {
        if (this.showNext && this.currentPage < this.totalPage) {
            const liTag = this.createItem(this.nextText, this.currentPage + 1, '');
            this.ulTag.appendChild(liTag);
        }
    }

    /**
     * Link đến trang cuối cùng.
     */
    createLastPage() {
        if (this.showLast &&
                this.currentPage < this.totalPage - 1 &&
                this.endPage < this.totalPage) {
            const liTag = this.createItem(
                CommonUtils && CommonUtils.formatThousands ? CommonUtils.formatThousands(this.totalPage) : this.totalPage,
                this.totalPage,
                ''
            );
            this.ulTag.appendChild(liTag);
        }
    }

    /**
     * Tạo các link.
     * @param String text Nhãn
     * @param Integer page Chỉ số trang
     * @param String className Style
     */
    createItem(text, page, className) {
        const liTag = document.createElement('li');
        liTag.className = 'page-item ' + className;

        if (className) {
            const spanTag = document.createElement('span');
            spanTag.className = 'page-link';
            spanTag.innerHTML = text;
            liTag.appendChild(spanTag);
        } else {
            const aTag = document.createElement('a');
            aTag.className = 'page-link';
            aTag.innerHTML = text;

            // SPA khi có thay đổi hash sẽ reload trang
            // do đó không để hash
            // aTag.href = '#' + page;
            aTag.href = 'javascript:;';

            // Đánh dấu trang
            aTag.dataset.page = page;

            liTag.appendChild(aTag);
        }
        return liTag;
    }

    /**
     * Hiển thị tổng số bản ghi.
     */
    createTotalNumberText() {
        const div = document.createElement('div');
        div.className = 'pagination-info text-muted small mb-2 mb-md-0';
        div.textContent = 'Tổng số ' +
            (CommonUtils && CommonUtils.formatThousands
                ? CommonUtils.formatThousands(this.totalNumber)
                : this.totalNumber
            ) +
            ' bản ghi';
        return div;
    }
}

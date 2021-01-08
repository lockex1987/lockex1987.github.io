(() => {
    /**
     * Lắng nghe sự kiện cho một phần tử.
     */
    if (!Element.prototype.on) {
        Element.prototype.on = function (type, callback, options) {
            this.addEventListener(type, callback, options);
            return this; // for chaining
        };
    }

    /**
     * Delegate event.
     */
    if (!Element.prototype.delegate) {
        Element.prototype.delegate = function (type, selector, callback) {
            this.addEventListener(type, (evt) => {
                const target = evt.target;
                const obj = target.closest(selector);
                if (obj) {
                    callback(evt, obj);
                }
            });
            return this;
        };
    }
})();

/**
 * Nếu sử dụng từ khóa "const" ở đây
 * thì trên Safari, chỗ DownloadProgress (module script) sẽ bị lỗi không tìm thấy biến CommonUtils.
 */
const CommonUtils = {};

/**
 * Trả về một phần tử.
 * @param {String} selector
 */
CommonUtils.$ = (selector) => {
    return document.querySelector(selector);
};

/**
 * Trả về mảng luôn để có thể thực hiện các hàm như map, reduce,...
 * @param {String} selector
 * @param {Element} rootNode
 */
CommonUtils.$$ = (selector, rootNode = document) => {
    return [...rootNode.querySelectorAll(selector)];
};

/**
 * Bắt sự kiện.
 */
CommonUtils.delegateDocument = (type, selector, callback) => {
    document.addEventListener(type, (evt) => {
        const target = evt.target;
        const obj = target.closest(selector);
        if (obj) {
            callback(evt, obj);
        }
    });
};

/**
 * Tạo một phần tử.
 * @param {String} tag
 * @param {Object} attributes
 * @param {Array} children Danh sách phần tử con
 */
CommonUtils.createElement = (tag, attributes, children) => {
    const ele = document.createElement(tag);
    if (attributes) {
        for (const property in attributes) {
            if (Object.prototype.hasOwnProperty.call(attributes, property)) {
                ele[property] = attributes[property];
            }
        }
    }
    if (children && children.length > 0) {
        children.forEach(child => {
            ele.appendChild(child);
        });
    }
    return ele;
};

/**
 * Tạo một phần tử.
 * @param {Object} obj Đối tượng, có các thuộc tính như "tag", "children",...
 */
CommonUtils.create = (obj) => {
    const tag = obj.tag;
    const children = obj.children;
    delete obj.tag;
    delete obj.children;
    return CommonUtils.createElement(tag, obj, children);
};

/**
 * Lấy các tham số của form.
 * Các giá trị được encode.
 * @param {String} formId ID của form
 */
CommonUtils.getFormAsString = (formId) => {
    const formElement = document.getElementById(formId);
    return new URLSearchParams(new FormData(formElement)).toString();
};

/**
 * Chuyển đối tượng JS thành xâu tham số.
 */
CommonUtils.jsonToQueryString = (json) => {
    return '?' +
        Object.keys(json).map((key) => {
            return encodeURIComponent(key) +
                '=' +
                encodeURIComponent(json[key]);
        }).join('&');
};

/**
 * Escape các ký tự đặc biệt thành mã HTML entity tương ứng.
 * Fix bug XSS.
 * @param {String} s Xâu cần escape
 */
CommonUtils.escapeHtml = (s) => {
    if (typeof s === 'string') {
        return s.replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }
    return s;
};

/**
 * Phân cách dấu phảy phần ngàn.
 */
CommonUtils.formatThousands = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

CommonUtils.prettifyNumber = (num, digits) => {
    if (digits === undefined) {
        digits = 1;
    }

    const si = [
        /*
        { value: 1E18, symbol: 'E' },
        { value: 1E15, symbol: 'P' },
        */
        { value: 2 ** 40, symbol: 'T' },
        { value: 2 ** 30, symbol: 'G' },
        { value: 2 ** 20, symbol: 'M' },
        { value: 2 ** 10, symbol: 'k' }
    ];
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            const n = (num / si[i].value).toFixed(digits);

            // Xóa những chữ số 0 đằng sau dấu thập phân
            // Nếu chỉ để 0+ thì sẽ không xóa được dấu .
            // Nếu chỉ để \.0+ thì sẽ không xử lý được trường hợp 123.400
            return n.replace(/\.?0+$/, '') + si[i].symbol;
        }
    }
    return num.toFixed(digits);
};

/**
 * Tính toán số ngày giữa hai ngày (toDate - fromDate).
 * @param {Date} fromDate Từ ngày
 * @param {Date} toDate Đến ngày
 * @return {Integer} Số ngày giữa 2 ngày (ví dụ từ ngày 1/1 đến 10/1 có 9 ngày)
 */
CommonUtils.dateDiff = (fromDate, toDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((toDate.getTime() - fromDate.getTime()) / oneDay);
};

/**
 * Thêm bao nhiêu ngày vào một ngày có sẵn.
 * @param {Date} fromDate Ngày bắt đầu
 * @param {Integer} numberOfDate Số ngày thêm vào
 */
CommonUtils.addDate = (fromDate, numberOfDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return new Date(fromDate.getTime() + numberOfDate * oneDay);
};

/**
 * Trả về một đối tượng Date từ một xâu có định dạng (dd/MM/yyyy).
 * @param {String} dateString Xâu ngày tháng
 * @retun {Date} Một đối tượng Date
 */
CommonUtils.converStringToDate = (dateString) => {
    const a = dateString.split(/\/|-/);
    const date = a[0];
    const month = a[1];
    const year = a[2];
    return new Date(year + '-' + month + '-' + date);
};

/**
 * Trả về đối tượng Date từ xâu dạng YYYY-MM-DDTHH:MM:SSZ
 * @param {String} isoString Xâu ngày tháng, định dạng ISO 8601
 */
CommonUtils.convertStringWithTimeToDate = (isoString) => {
    return new Date(isoString);
};

/**
 * Chuyển đối tượng Date sang xâu dạng dd/MM/yyyy.
 * @param {Date} date Một đối tượng Date
 * @return {String} Một xâu dạng dd/MM/yyyy tương ứng
 */
CommonUtils.convertDateToString = (date) => {
    return CommonUtils.paddingTwoZero(date.getDate()) + '/' +
        CommonUtils.paddingTwoZero(date.getMonth() + 1) + '/' +
        date.getFullYear();
};

/**
 * Chuyển đối tượng Date sang xâu dạng "dd/MM/yyyy h24:mi:ss".
 * @param {Date} date Một đối tượng Date
 * @return {String} Một xâu dạng "dd/MM/yyyy h24:mi:ss" tương ứng
 */
CommonUtils.convertDateToStringWithTime = (date) => {
    return CommonUtils.convertDateToString(date) + ' ' +
        CommonUtils.paddingTwoZero(date.getHours()) + ':' +
        CommonUtils.paddingTwoZero(date.getMinutes()) + ':' +
        CommonUtils.paddingTwoZero(date.getSeconds());
};

/**
 * Thêm các chữ số 0 ở đầu để có độ dài là 2 ký tự.
 */
CommonUtils.paddingTwoZero = (n) => {
    return (n < 10) ? ('0' + n) : n;
};

/**
 * Chuẩn hóa ngày tháng về định dạng dd/MM/yyyy.
 * @param s Xâu định dạng ISO 8601
 */
CommonUtils.normalizeDate = (s) => {
    const d = CommonUtils.convertStringWithTimeToDate(s);
    return CommonUtils.convertDateToString(d);
};

/**
 * Download dữ liệu Blob.
 */
CommonUtils.downloadBlob = (blob, fileName) => {
    const link = window.URL.createObjectURL(blob);

    // Tạo một thẻ a tạm và giả lập thao tác click vào thẻ đó
    const a = document.createElement('a');
    a.download = fileName;
    a.innerHTML = 'Download file';
    a.href = link;
    a.style.display = 'none';
    a.onclick = (evt) => {
        // Remove the a tag
        document.body.removeChild(evt.target);
    };

    // Gắn nó vào DOM và thực hiện thao tác click
    document.body.appendChild(a);
    a.click();
};

/**
 * Hàm save as do mình tự làm.
 * @param text Nội dung của văn bản cần lưu
 * @param fileName Tên file
 */
CommonUtils.saveTextAsFile = (text, fileName) => {
    // Tạo đối tượng Blob
    const textFileAsBlob = new Blob([text], { type: 'text/plain' });

    CommonUtils.downloadBlob(textFileAsBlob, fileName);
};

/**
 * Lấy tham số từ URL.
 */
CommonUtils.getUrlParameter = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

/**
 * Không thực hiện hàm luôn khi người dùng đang thao tác,
 * mà chờ sau khi người dùng đã thực hiện xong một khoảng thời gian nào đó.
 * @param {Function} func Hàm nghiệp vụ
 * @param {Integer} delay Millisecond
 */
CommonUtils.debounce = (func, delay) => {
    let inDebounce;

    return function () {
        const context = this;
        const args = arguments;

        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
};

/**
 * Giới hạn số lần gọi hàm.
 * Sau khi gọi hàm thành công thì cần chờ một khoảng thời gian để gọi tiếp.
 * @param {Function} func Hàm nghiệp vụ
 * @param {Integer} limit Millisecond
 */
CommonUtils.throttle = (func, limit) => {
    let inThrottle;

    return function () {
        const args = arguments;
        const context = this;

        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
};

CommonUtils.addCssStyles = (styles) => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
};



/**
 * Trả về một số nguyên ngẫu nhiên
 * @param n Số truyền vào
 * @return Số nguyên từ 0 đến n-1
 */
CommonUtils.getRandomIndex = (n) => {
    return Math.floor(Math.random() * n);
};

CommonUtils.getRandomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// alert(CommonUtils);
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

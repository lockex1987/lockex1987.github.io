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
                let target = evt.target;
                let obj = target.closest(selector);
                if (obj) {
                    callback(evt, obj);
                }
            });
            return this;
        };
    }
})();

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
        for (let property in attributes) {
            if (attributes.hasOwnProperty(property)) {
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
    return this.createElement(tag, obj, children);
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
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};


CommonUtils.prettifyNumber = (num, digits) => {
    if (digits == undefined) {
        digits = 1;
    }

    const si = [
        { value: 1E18, symbol: 'E' },
        { value: 1E15, symbol: 'P' },
        { value: 1E12, symbol: 'T' },
        { value: 1E9, symbol: 'G' },
        { value: 1E6, symbol: 'M' },
        { value: 1E3, symbol: 'k' }
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
/**
 * Pagi: A pagination library
 * Code mới nhất ở https://lockex1987.github.io/posts/lib - pagi/js/pagi.js.
 * 
 * @version 2.0.0
 * @author lockex1987
 */
class Pagi {

    /**
     * Khởi tạo.
     * @param {Object} options Tùy chọn
     */
    constructor(options = {}) {
        const defaultOptions = {
            showFirst: false,
            showLast: false,
            showPrevious: true,
            showNext: true,
            showNumbers: true,
            firstText: '<<', // 
            previousText: '&laquo;', // &lt;
            nextText: '&raquo;', // &gt;
            lastText: '>>', // 
            showNoRecordText: true,
            noRecordText: 'Không có bản ghi nào',
            showTotalNumber: true,
            pageSize: 10
        };

        Object.assign(this, defaultOptions, options);

        // Người dùng có thể truyền vào "container" hoặc "containerId"
        if (options.containerId) {
            this.container = document.getElementById(options.containerId);
        } else {
            this.container = options.container;
        }

        this.addClickListener(options.callbackFunc);
    }

    /**
     * Cập nhật.
     * @param {Integer} totalNumber Tổng số trang
     * @param {Integer} currentPage Trang hiện tại
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

        // The logic in pagination is as follows:
        // - there are 5 page links shown at any time (e.g. 1 2 3 4 5) unless there are less than 5 total pages
        // - the active link (current page) is in the 3rd position, except for when the active link is below 3 or less than 2 from the last position
        this.startPage;
        this.endPage;
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

        // Create an array of pages to ng-repeat in the pager control
        this.pages = [];
        for (let i = this.startPage; i <= this.endPage; i++) {
            this.pages.push(i);
        }

        return this;
    }

    /**
     * Click vào phân trang (thẻ A).
     * @param {Function} callbackFunc Hàm gọi
     */
    addClickListener(callbackFunc) {
        this.container.addEventListener('click', (evt) => {
            const target = evt.target;
            if (target.tagName == 'A') {
                if (!target.classList.contains('active') && !target.classList.contains('disabled')) {
                    const page = parseInt(target.dataset.page);
                    callbackFunc(page);
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

        // Nếu rỗng
        if (this.totalNumber <= 0) {
            if (this.showNoRecordText) {
                this.container.appendChild(this.createNoRecordText());
            }
        } else {
            if (this.showTotalNumber) {
                this.container.appendChild(this.createTotalNumberText());
            }

            if (this.totalPage > 1) {
                this.ulTag = this.createUlTag();

                this.createFirstPage();
                this.createPreviousPage();

                if (this.showNumbers) {
                    for (let i = this.startPage; i <= this.endPage; i++) {
                        this.createMiddlePage(i);
                    }
                }
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
     * Thẻ UL bao.
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
        if (this.showFirst) {
            this.ulTag.appendChild(this.createItem(this.firstText, 1, (this.currentPage > 1 ? '' : 'disabled')));
        }
    }

    /**
     * Link đến trang trước.
     */
    createPreviousPage() {
        if (this.showPrevious) {
            this.ulTag.appendChild(this.createItem(this.previousText,
                (this.currentPage > 1 ? this.currentPage - 1 : 1),
                (this.currentPage > 1 ? '' : 'disabled')));
        }
    }

    /**
     * Link đến các trang ở tầm giữa.
     * @param {Integer} i Chỉ số trang
     */
    createMiddlePage(i) {
        this.ulTag.appendChild(this.createItem(i, i, (i === this.currentPage ? 'active' : '')));
    }

    /**
     * Link đến trang tiếp theo.
     */
    createNextPage() {
        if (this.showNext) {
            this.ulTag.appendChild(this.createItem(this.nextText,
                (this.currentPage < this.totalPage ? this.currentPage + 1 : this.totalPage),
                (this.currentPage < this.totalPage ? '' : 'disabled')));
        }
    }

    /**
     * Link đến trang cuối cùng.
     */
    createLastPage() {
        if (this.showLast) {
            this.ulTag.appendChild(this.createItem(this.lastText, this.totalPage, (this.currentPage < this.totalPage ? '' : 'disabled')));
        }
    }

    /**
     * Tạo các link.
     * @param {String} text Nhãn
     * @param {Integer} page Chỉ số trang
     * @param {String} className Style
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
            //aTag.href = '#' + page;
            aTag.href = 'javascript:;';

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
        div.className = 'pagination-info text-muted small mr-2 mb-sm-2';
        div.textContent = 'Tổng số ' +
                (CommonUtils && CommonUtils.formatThousands ?
                    CommonUtils.formatThousands(this.totalNumber) :
                    this.totalNumber
                ) + ' bản ghi';
        return div;
    }
}

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

// alert(CommonUtils);

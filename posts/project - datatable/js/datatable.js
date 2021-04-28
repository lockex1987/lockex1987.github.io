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


/**
 * Hiển thị số.
 */
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
            if (i <= 0) {
                digits = 3;
            } else if (i <= 1) {
                digits = 2;
            } else if (i <= 2) {
                digits = 0;
            } else {
                digits = 0;
            }
            const n = (num / si[i].value).toFixed(digits);

            // Xóa những chữ số 0 đằng sau dấu thập phân
            // Nếu chỉ để 0+ thì sẽ không xóa được dấu .
            // Nếu chỉ để \.0+ thì sẽ không xử lý được trường hợp 123.400
            // .replace(/\.?0+$/, '') sẽ bị lỗi các trường hợp như là num = 80 và digit = 0
            return parseFloat(n) + si[i].symbol;
        }
    }
    return num.toFixed(digits);
};


/**
 * Thêm các chữ số 0 ở đầu để có độ dài là 2 ký tự.
 */
CommonUtils.paddingTwoZero = (n) => {
    return (n < 10) ? ('0' + n) : n;
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
class Datatable {
    /**
     * Khởi tạo đối tượng.
     * @param {Object} options Các tùy chọn
     */
    constructor(options = {}) {
        // Khởi tạo các thuộc tính
        const defaultOptions = {};
        Object.assign(this, defaultOptions, options);

        // Người dùng có thể truyền vào xâu CSS selector của bảng hoặc trực tiếp DOM node của bảng
        // Nếu người dùng truyền vào xâu thì lấy ra DOM node
        if (typeof this.table == 'string') {
            this.table = document.querySelector(this.table);
        }

        // Thêm class đánh dấu cho bảng
        this.table.classList.add('datatable');

        this.createWrapper();

        this.checkBodyExist();

        // Người dùng truyền vào data hoặc là ajax
        if (this.data != undefined) {
            this.initLocal();
        } else if (this.ajax) {
            this.initRemote();
        }

        // Vùng phân trang
        const pagiContainer = this.createPagiContainer();

        this.pagi = new Pagi({
            container: pagiContainer,
            callbackFunc: this.gotoPage,
            pageSize: this.paginationSize || 10
        });

        // Lấy luôn dữ liệu
        this.gotoPage(1);

        // Xử lý các sự kiện:
        // - Click vào mũi tên expand
        // - Chọn dòng

        this.handleClickExpandableArrow();
        this.handleClickSelectableRow();

        // Hiển thị danh sách cột để ẩn hiện
        this.bindColumnList();
    }

    /**
     * Thêm vùng div .datatable-wrapper bao lấy thẻ table.
     */
    createWrapper() {
        if (this.table.parentNode.classList.contains('datatable-wrapper')) {
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'datatable-wrapper';
        this.table.parentNode.insertBefore(wrapper, this.table);
        wrapper.appendChild(this.table);
    }

    /**
     * Kiểm tra thẻ tbody có hay không.
     * Nếu không có thì tự thêm.
     */
    checkBodyExist() {
        let tbody = this.table.querySelector('tbody');
        if (!tbody) {
            tbody = document.createElement('tbody');
            this.table.appendChild(tbody);
        }
    }

    /**
     * Tạo icon đang xử lý.
     */
    createLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                                <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                                        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                                        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                                    <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                                            C22.32,8.481,24.301,9.057,26.013,10.047z">
                                            <animateTransform attributeType="xml"
                                            attributeName="transform"
                                            type="rotate"
                                            from="0 20 20"
                                            to="360 20 20"
                                            dur="0.5s"
                                            repeatCount="indefinite"/>
                                </path>
                            </svg>`;
        loader.style.display = 'none';
        this.table.parentNode.appendChild(loader);

        // Truyền vào tham số để ở phương thức initRemote() có thể sử dụng
        this.loader = loader;
    }

    /**
     * Khởi tạo trong trường hợp không dùng AJAX.
     */
    initLocal() {
        this.gotoPage = (page) => {
            if (this.startSearchCallback) {
                this.startSearchCallback();
            }

            const obj = this.getDataLocal(page);
            this.pagi.update(obj.total, page);
            this.bindItems(obj.data);
        };

        this.makeSortable(
            this.table,
            (column, direction) => {
                this.sortDataLocal(column, direction);

                this.gotoPage(1);
            }
        );

        // Xử lý ô search nhanh
        if (this.searchableProps && !this.hideQuickSearch) {
            this.searchInput = this.createSearchInput();

            this.searchInput.addEventListener('input', () => {
                this.filterDataLocal(this.searchInput.value.trim());
                this.gotoPage(1);
            });
        }

        this.filterDataLocal();
    }

    /**
     * Khởi tạo trong trường hợp sử dụng AJAX.
     */
    initRemote() {
        // Tạo icon đang xử lý
        if (this.showLoading) {
            this.createLoader();
        }

        this.gotoPage = (page) => {
            if (this.loader) {
                this.loader.style.display = '';
            }

            if (this.startSearchCallback) {
                this.startSearchCallback();
            }

            this.ajax(page, this.pagi.pageSize, this.sortColumn, this.sortDirection)
                .then(resp => {
                    if (this.loader) {
                        this.loader.style.display = 'none';
                    }

                    if (this.finishSearchCallback) {
                        this.finishSearchCallback(resp);
                    }

                    let total, data;
                    if (this.getTotalAndData) {
                        ({ total, data } = this.getTotalAndData(resp));
                    } else {
                        total = resp.total;
                        data = resp.data;
                    }

                    this.pagi.update(total, page);
                    this.bindItems(data);
                });
        };

        this.makeSortable(
            this.table,
            (column, direction) => {
                this.sortColumn = column;
                this.sortDirection = direction;

                this.gotoPage(1);
            }
        );

        this.sortColumn = '';
        this.sortDirection = '';
    }

    /**
     * Thêm vùng phân trang.
     */
    createPagiContainer() {
        const pagiContainer = document.createElement('div');
        pagiContainer.className = 'pagination-wrapper d-lg-flex align-items-center justify-content-between';

        // Người dùng thêm có thể thêm tùy chọn "paginationPosition" với giá trị "bellow" hoặc "above"
        const wrapper = this.table.parentNode;
        if (this.paginationPosition == 'bellow') {
            wrapper.parentNode.insertBefore(pagiContainer, wrapper.nextSibling);
        } else if (this.paginationPosition == 'above') {
            pagiContainer.classList.add('mb-3');
            wrapper.parentNode.insertBefore(pagiContainer, wrapper);
        } else {
            // Kiểm tra xem tùy chỉnh ở chỗ nào không
            const slot = wrapper.querySelector('.pagination-slot');
            if (slot) {
                slot.parentNode.replaceChild(pagiContainer, slot);
            } else {
                // Mặc định là ở dưới
                wrapper.parentNode.insertBefore(pagiContainer, wrapper.nextSibling);
            }
        }
        return pagiContainer;
    }

    /**
     * Hiển thị dữ liệu.
     * @param {Array} items Các bản ghi để hiển thị ở trang hiện tại
     */
    bindItems(items) {
        // Lưu biến trung gian để sử dụng ở phương thức getSelectedRows()
        this.items = items;

        // Thêm thuộc tính số thứ tự (stt) với mỗi phần tử để hiển thị cột số thứ tự cho dễ
        items.forEach((e, idx) => {
            e.stt = this.pagi.startIndex + idx + 1;
        });

        // Hiển thị dữ liệu với hàm rowTemplate của người dùng truyền vào
        if (this.rowTemplate) {
            if (items.length == 0) {
                this.table.style.display = 'none';
            } else {
                let html = '';
                items.forEach((e, idx) => {
                    html += this.rowTemplate(e);
                });
                this.table.querySelector('tbody').innerHTML = html;

                this.table.style.display = '';

                this.hideShouldBeHiddenColumns();
            }
        }

        // Gọi hàm callback
        // Vue có thể lấy dữ liệu ở đây
        if (this.bindItemsCallback) {
            this.bindItemsCallback(items);
        }
    }

    /**
     * Thêm ô search.
     */
    createSearchInput() {
        const searchWrapper = document.createElement('div');
        searchWrapper.className = 'py-2 d-flex justify-content-end';
        const searchInput = document.createElement('input');
        searchInput.className = 'form-control';
        searchInput.style.width = '200px';
        searchInput.placeholder = 'Tìm kiếm nhanh';
        searchWrapper.appendChild(searchInput);

        const wrapper = this.table.parentNode;
        wrapper.parentNode.insertBefore(searchWrapper, wrapper);

        return searchInput;
    }

    /**
     * Sắp xếp dữ liệu trên client (local).
     * @param {String} column Cột sắp xếp
     * @param {String} direction 'asc' hoặc 'desc'
     */
    sortDataLocal(column, direction) {
        this.data.sort((a, b) => {
            if (a[column] < b[column]) {
                return (direction == 'asc') ? -1 : 1;
            }
            if (a[column] > b[column]) {
                return (direction == 'asc') ? 1 : -1;
            }
            return 0;
        });
    }

    /**
     * Tìm kiếm nhanh trong trường hợp không sử dụng AJAX.
     */
    filterDataLocal(searchText) {
        if (!this.searchableProps) {
            this.filteredData = this.data;
        } else if (!searchText) {
            this.filteredData = this.data;
        } else {
            searchText = searchText.toLowerCase();
            this.filteredData = this.data.filter(e => {
                const foundProp = this.searchableProps.find(prop => e[prop].toLowerCase().includes(searchText));
                return !!foundProp;
            });
        }
    }

    /**
     * Thiết lập lại dữ liệu.
     * @param {Array} data Mảng dữ liệu
     */
    setData(data) {
        this.data = data;
    }

    /**
     * Lấy dữ liệu của một trang nào đó trong trường hợp không sử dụng AJAX.
     * @param {Integer} page Số thứ tự trang (bắt đầu từ 1)
     */
    getDataLocal(page) {
        const startIndex = (page - 1) * this.pagi.pageSize;
        const total = this.filteredData.length;
        const items = [];
        const end = Math.min(startIndex + this.pagi.pageSize, total);
        for (let i = startIndex; i < end; i++) {
            items.push(this.filteredData[i]);
        }
        return {
            total: total,
            data: items
        };
    }

    /**
     * Cho phép một bảng có thể sắp xếp được.
     * @param {DOMNode} table DOM node của bảng
     * @param {Function} callback Hàm callback
     */
    makeSortable(table, callback) {
        table.addEventListener('click', (evt) => {
            const attribute = 'data-sort-column';
            const target = evt.target;
            if (target.tagName == 'TH' && target.getAttribute(attribute)) {
                const iconSortAsc = 'sorting_asc';
                const iconSortDesc = 'sorting_desc';

                // Thẻ th hiện tại
                const thTag = target;

                // Lấy ra trường thông tin order
                const column = thTag.getAttribute(attribute);

                // Trạng thái order mới
                const direction = thTag.classList.contains(iconSortAsc) ? 'desc' : 'asc';

                // Xóa tất cả các order cũ
                table.querySelectorAll('[' + attribute + ']').forEach(otherTag => {
                    otherTag.classList.remove(iconSortAsc);
                    otherTag.classList.remove(iconSortDesc);
                });

                // Điều chỉnh lại mũi tên hiển thị của cột hiện tại
                thTag.classList.add(direction == 'asc' ? iconSortAsc : iconSortDesc);

                // Gọi hàm callback
                callback(column, direction);
            }
        });
    }

    /**
     * Tìm kiếm lại.
     */
    reload() {
        this.gotoPage(1);
    }

    /**
     * Thêm sự kiện click vào mũi tên để expand dòng nào đó.
     */
    handleClickExpandableArrow() {
        if (this.table.classList.contains('table-expandable')) {
            this.table.addEventListener('click', (evt) => {
                const target = evt.target;
                if (target.classList.contains('table-expandable-arrow')) {
                    const arrow = target;
                    arrow.classList.toggle('expanded');

                    const mainRow = arrow.closest('tr');
                    const detailRow = mainRow.nextElementSibling;
                    if (detailRow.style.display === 'none') {
                        detailRow.style.display = '';
                    } else {
                        detailRow.style.display = 'none';
                    }
                }
            });
        }
    }

    /**
     * Thêm sự kiện click để chọn dòng.
     */
    handleClickSelectableRow() {
        if (this.table.classList.contains('table-selectable')) {
            this.table.addEventListener('click', (evt) => {
                const target = evt.target;
                const row = target.closest('.table-selectable tbody tr');
                if (row) {
                    row.classList.toggle('selected-row');
                }
            });
        }
    }

    /**
     * Lấy ra dữ liệu của các dòng được chọn.
     */
    getSelectedRows() {
        const selectedRows = [];
        const rows = this.table.querySelectorAll('tbody tr');
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].classList.contains('selected-row')) {
                selectedRows.push(this.items[i]);
            }
        }
        return selectedRows;
    }

    /**
     * Hiển thị danh sách các cột để ẩn hiện.
     */
    bindColumnList() {
        if (this.columnListNamespace) {
            // Thêm vùng div
            const columList = document.createElement('div');
            columList.className = 'datatable-column-list';
            columList.innerHTML = '<span class="text-muted">Hiển thị các cột:</span>';
            this.table.querySelectorAll('thead th').forEach((th, idx) => {
                const labelTag = document.createElement('label');
                labelTag.innerHTML = `<input type="checkbox" checked data-index="${idx}"> ${th.textContent.trim()}`;
                if (localStorage.getItem(this.columnListNamespace + idx) == 'hide') {
                    labelTag.querySelector('input').checked = false;
                }
                columList.appendChild(labelTag);
            });

            const wrapper = this.table.parentNode;
            wrapper.parentNode.insertBefore(columList, wrapper.nextSibling);

            // Thêm sự kiện
            columList.addEventListener('change', (evt) => {
                const checkbox = evt.target;
                const index = checkbox.dataset.index;
                const rows = this.table.querySelectorAll('tr');
                if (checkbox.checked) {
                    localStorage.removeItem(this.columnListNamespace + index);
                    rows.forEach(r => {
                        r.cells[index].style.display = '';
                    });
                } else {
                    localStorage.setItem(this.columnListNamespace + index, 'hide');
                    rows.forEach(r => {
                        r.cells[index].style.display = 'none';
                    });
                }
            });
        }
    }

    /**
     * Sau khi hiển thị xong dữ liệu của cột thì cần gọi hàm này để ẩn các cột cần ẩn.
     */
    hideShouldBeHiddenColumns() {
        if (this.columnListNamespace) {
            const rows = this.table.querySelectorAll('tr');
            const numOfColumns = rows[0].cells.length;
            for (let index = 0; index < numOfColumns; index++) {
                if (localStorage.getItem(this.columnListNamespace + index) == 'hide') {
                    rows.forEach(r => {
                        r.cells[index].style.display = 'none';
                    });
                }
            }
        }
    }
}

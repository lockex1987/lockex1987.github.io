function extendElementMethods() {
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
}


const CommonUtils = {

    /**
     * Trả về một phần tử.
     * @param {String} selector 
     */
    $(selector) {
        return document.querySelector(selector);
    },

    /**
     * Trả về mảng luôn để có thể thực hiện các hàm như map, reduce,...
     * @param {String} selector 
     * @param {Element} startNode 
     */
    $$(selector, startNode = document) {
        return [...startNode.querySelectorAll(selector)];
    },

    delegateDocument(type, selector, callback) {
        document.addEventListener(type, (evt) => {
            let target = evt.target;
            let obj = target.closest(selector);
            if (obj) {
                callback(evt, obj);
            }
        });
    },

    /**
     * Tạo một phần tử.
     * @param {String} tag 
     * @param {Object} attributes 
     * @param {Array} children Danh sách phần tử con
     */
    createElement(tag, attributes, children) {
        let ele = document.createElement(tag);
        if (attributes) {
            for (var property in attributes) {
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
    },

    /**
     * Tạo một phần tử.
     * @param {Object} obj Đối tượng, có các thuộc tính như "tag", "children",...
     */
    create(obj) {
        let tag = obj.tag;
        let children = obj.children;
        delete obj.tag;
        delete obj.children;
        return this.createElement(tag, obj, children);
    },

    /**
     * Lấy các tham số của form.
     * Các giá trị được encode.
     * @param {String} formId ID của form
     */
    getFormAsString(formId) {
        let formElement = document.getElementById(formId);
        return new URLSearchParams(new FormData(formElement)).toString();
    },

    /**
     * Chuyển đối tượng JS thành xâu tham số.
     */
    jsonToQueryString(json) {
        return '?' +
            Object.keys(json).map((key) => {
                return encodeURIComponent(key) +
                    '=' +
                    encodeURIComponent(json[key]);
            }).join('&');
    }
};


extendElementMethods();

var _ = CommonUtils;
const $ = CommonUtils.$;
const $$ = CommonUtils.$$;

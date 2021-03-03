/**
 * Khai báo const để không bị ghi đè.
 * Có thể dùng Line Awesome hoặc dùng SVG.
 * Nên dùng Line Awesome cho đồng bộ.
 * Nếu dùng SVG thì lại không phải phụ thuộc thư viện nữa.
 * SVG lấy ở địa chỉ:
 *     https://github.com/icons8/line-awesome/tree/master/svg
 */
const noti = (() => {
    // Tùy chọn mặc định
    const DEFAULT_OPTIONS = {
        // CSS class, quy định màu sắc
        cssClass: '',
        // CSS class của icon hiển thị trước nội dung alert
        icon: '',
        // Xâu SVG của icon
        iconSvg: '',
        // thời gian hiển thị thông báo, tính bằng ms, mặc định 5 giây
        duration: 5000,
        // tự động đóng thông báo
        autoClose: true
    };

    /**
     * Lấy vùng chứa các thông báo.
     */
    function getNotiContainer() {
        // Vùng chứa là một vùng div có ID là noti và class là .noti
        let notiContainer = document.querySelector('#noti');

        // Nếu chưa có thì thêm vào trong trang
        if (notiContainer == null) {
            notiContainer = document.createElement('div');
            notiContainer.className = 'noti';
            notiContainer.id = 'noti';
            document.body.appendChild(notiContainer);
        }

        return notiContainer;
    }

    /**
     * Hàm chung.
     * @param {String} text Nội dung thông báo
     * @param {Object} options Tùy chọn
     */
    function notify(text, options = {}) {
        // Kết hợp tùy chọn mặc định và tùy chọn của người dùng
        options = Object.assign({}, DEFAULT_OPTIONS, options);

        const alertTag = createAlertTag(text, options);

        // Thêm thông báo vào trang
        const notiContainer = getNotiContainer();
        notiContainer.appendChild(alertTag);

        // Tự động đóng thông báo sau khoảng thời gian cho trước
        if (options.autoClose) {
            setTimeout(() => {
                closeNotification(alertTag);
            }, options.duration);
        }
    }

    /**
     * Tạo đối tượng DOMNode thông báo.
     * @param {String} text Nội dung thông báo
     * @param {Object} options Tùy chọn
     */
    function createAlertTag(text, options) {
        // Nội dung thông báo
        const alertTag = document.createElement('div');
        alertTag.className = 'alert ' + options.cssClass;

        // Icon
        if (options.icon) {
            const iconMarkup = document.createElement('span');
            iconMarkup.className = options.icon + ' mr-2';
            alertTag.appendChild(iconMarkup);
        }

        if (options.iconSvg) {
            const iconMarkup = document.createElement('span');
            iconMarkup.className = 'svg-icon';
            iconMarkup.innerHTML = options.iconSvg;
            // alertTag.appendChild(iconMarkup);
        }

        // Text
        const textSpan = document.createElement('span');
        textSpan.innerHTML = text;
        alertTag.appendChild(textSpan);

        // Khi click vào thì đóng thông báo
        alertTag.addEventListener('click', () => {
            closeNotification(alertTag);
        });

        return alertTag;
    }

    /**
     * Xóa thông báo cũ.
     * @param {DOMNode} element Đối tượng thông báo
     */
    function closeNotification(element) {
        element.classList.add('fade-out');
        setTimeout(() => {
            // Chú ý, có trường hợp người dùng đã chủ động xóa (bằng cách click vào thông báo)
            // nên khi tự động xóa bằng timeout sẽ bị lỗi
            const parentNode = element.parentNode;
            if (parentNode) {
                parentNode.removeChild(element);
            }
        }, 500);
    }

    /**
     * Hàm chung (nữa).
     * @param {String} text Nội dung thông báo
     * @param {Object} defaultOptionsOfType Tùy chọn mặc định có từng loại (error, success, info, warning)
     * @param {Object} options Tùy chọn của người dùng
     */
    function notifyWithDefault(text, defaultOptionsOfType, options = {}) {
        options = Object.assign({}, defaultOptionsOfType, options);
        notify(text, options);
    }

    /**
     * Thông báo lỗi.
     */
    function displayError(text, options) {
        notifyWithDefault(text, {
            cssClass: 'alert-error bg-danger',
            icon: 'la la-exclamation-circle',
            iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#FFF" d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z M 15 10 L 15 18 L 17 18 L 17 10 Z M 15 20 L 15 22 L 17 22 L 17 20 Z"/></svg>'
        }, options); // , autoClose: false
    }

    /**
     * Thông báo thành công.
     */
    function displaySuccess(text, options) {
        notifyWithDefault(text, {
            cssClass: 'alert-success bg-success',
            icon: 'la la-check',
            iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#FFF" d="M 28.28125 6.28125 L 11 23.5625 L 3.71875 16.28125 L 2.28125 17.71875 L 10.28125 25.71875 L 11 26.40625 L 11.71875 25.71875 L 29.71875 7.71875 Z"/></svg>'
        }, options);
    }

    /**
     * Thông báo.
     */
    function displayInfo(text, options) {
        notifyWithDefault(text, {
            cssClass: 'alert-info bg-info',
            icon: 'la la-info-circle',
            iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#FFF" d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 15 10 L 15 12 L 17 12 L 17 10 Z M 15 14 L 15 22 L 17 22 L 17 14 Z"/></svg>'
        }, options);
    }

    /**
     * Cảnh báo.
     */
    function displayWarning(text, options) {
        notifyWithDefault(text, {
            cssClass: 'alert-warning bg-warning',
            icon: 'la la-exclamation-triangle',
            iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#111" d="M 16 3.21875 L 15.125 4.71875 L 3.125 25.5 L 2.28125 27 L 29.71875 27 L 28.875 25.5 L 16.875 4.71875 Z M 16 7.21875 L 26.25 25 L 5.75 25 Z M 15 14 L 15 20 L 17 20 L 17 14 Z M 15 21 L 15 23 L 17 23 L 17 21 Z"/></svg>'
        }, options);
    }

    /**
     * Xác nhận.
     * @param {String} text Nội dung xác nhận
     * @param {Function} callback Hàm gọi khi người dùng đồng ý
     * @param {String} confirmText Nhãn của nút đồng ý
     * @param {String} cancelText Nhãn của nút đóng
     * @param {Boolean} isPrompt Có phải là prompt để người dùng nhập liệu hay không
     * @param {String} defaultValue Giá trị mặc định khi dùng prompt
     * @return void
     */
    function displayConfirm(text, callback,
        confirmText = 'Đồng ý', cancelText = 'Đóng',
        isPrompt = false, defaultValue = '') {
        // Vùng chứa confirm
        const confirmContainer = document.createElement('div');
        confirmContainer.className = 'noti-confirm';
        confirmContainer.innerHTML = `            
                <div class="confirm-dialog">
                    <div class="confirm-message text-break text-left font-size-1.25 p-4">
                        ${text}
                    </div>

                    ${isPrompt ? '<div class="px-4"><input type="text" class="form-control" value="' + defaultValue + '"/></div>' : ''}

                    <div class="confirm-buttons text-right p-3">
                        <button class="button accept btn btn-primary">
                            ${confirmText}
                        </button>
                        
                        <button class="button reject btn btn-outline-secondary">
                            ${cancelText}
                        </button>
                    </div>
                </div>`;

        // Ẩn confirm
        const hideConfirm = () => {
            confirmContainer.parentNode.removeChild(confirmContainer);
        };

        // Click đồng ý
        confirmContainer.querySelector('.accept').addEventListener('click', () => {
            hideConfirm();
            const text = isPrompt ? confirmContainer.querySelector('input').value.trim() : '';
            callback(text);
        });

        // Click đóng
        confirmContainer.querySelector('.reject').addEventListener('click', () => {
            hideConfirm();
        });

        // Click ở bên trong thì dừng lại
        confirmContainer.querySelector('.confirm-dialog').addEventListener('click', (evt) => {
            evt.stopPropagation();
        });

        // Click ra ngoài thì đóng
        confirmContainer.addEventListener('click', () => {
            hideConfirm();
        });

        // Hiển thị
        document.body.appendChild(confirmContainer);

        // Focus vào nút OK, có thể nhấn Enter
        // okButton.focus();
        if (isPrompt) {
            confirmContainer.querySelector('input').focus();
        }
    }

    /**
     * Dialog prompt.
     */
    function displayPrompt(text, callback,
        confirmText = 'Đồng ý', cancelText = 'Đóng',
        defaultValue = '') {
        displayConfirm(text, callback,
            confirmText, cancelText,
            true, defaultValue);
    }

    return {
        error: displayError,
        success: displaySuccess,
        info: displayInfo,
        warning: displayWarning,
        confirm: displayConfirm,
        prompt: displayPrompt
    };
})();

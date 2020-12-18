window.noti = (function () {

    function notify(text, options) {
        // Tùy chọn mặc định
        let defaultOptions = {
            'cssClass': '',       // CSS class, quy định màu sắc
            'icon': null,     // CSS class của icon hiển thị trước nội dung alert
            'duration': 5000,     // thời gian hiển thị thông báo, tính bằng ms, mặc định 5 giây
            'autoClose': true,     // tự động đóng thông báo
        };

        // Kết hợp tùy chọn mặc định và tùy chọn của người dùng
        options = (typeof options == 'object') ? Object.assign(defaultOptions, options) : defaultOptions;

        // Vùng chứa các thông báo, là một vùng div có ID là noti và class là .noti
        let notiContainer = document.querySelector('#noti');

        // Nếu chưa có thì thêm vào trong trang
        if (notiContainer == null) {
            notiContainer = document.createElement('div');
            notiContainer.className = 'noti';
            notiContainer.id = 'noti';
            document.body.appendChild(notiContainer);
        }
        
        // Nội dung thông báo
        let alertTag = document.createElement('div');
        alertTag.className = 'alert ' + options.cssClass;

        // Icon
        if (options.icon) {
            let iconMarkup = document.createElement('span');
            iconMarkup.className = options.icon;
            alertTag.appendChild(iconMarkup);
        }

        // Text
        let textSpan = document.createElement('span');
        textSpan.innerHTML = text;
        alertTag.appendChild(textSpan);

        // Khi click vào thì đóng thông báo
        alertTag.addEventListener('click', () => {
            closeNotification(alertTag);
        })

        // Thêm thông báo vào trang
        notiContainer.appendChild(alertTag);

        // Tự động đóng thông báo sau khoảng thời gian cho trước
        if (options.autoClose) {
            setTimeout(() => {
                closeNotification(alertTag);
            }, options.duration);
        }
    }

    /**
     * Xóa hết các thông báo cũ.
     */
    function closeNotification(element) {
        element.classList.add('fade-out');
        setTimeout(() => {
            // Chú ý, có trường hợp người dùng đã chủ động xóa (bằng cách click vào thông báo)
            // nên khi tự động xóa bằng timeout sẽ bị lỗi
            let parentNode = element.parentNode;
            if (parentNode) {
                parentNode.removeChild(element);
            }
        }, 500);
    }

    function notifyWithDefault(text, defaultOptions, options) {
        options = (typeof options == 'object') ? Object.assign(defaultOptions, options) : defaultOptions;
        notify(text, options);
    }

    function displayError(text, options) {
        notifyWithDefault(text, { cssClass: 'alert-error bg-danger' }, options); // , autoClose: false
    }

    function displaySuccess(text, options) {
        notifyWithDefault(text, { cssClass: 'alert-success bg-success' }, options);
    }

    function displayInfo(text, options) {
        notifyWithDefault(text, { cssClass: 'alert-info bg-info' }, options);
    }

    function displayWarning(text, options) {
        notifyWithDefault(text, { cssClass: 'alert-warning bg-warning' }, options);
    }

    /**
     * Xác nhận.
     * @param {String} text Nội dung xác nhận
     * @param {Function} callback Hàm gọi khi người dùng đồng ý
     */
    function displayConfirm(text, callback) {
        // Vùng chứa confirm
        let confirmContainer = document.createElement('div');
        confirmContainer.className = 'noti-confirm';
        confirmContainer.innerHTML = `            
                <div class="confirm-dialog">
                    <div class="confirm-message">
                        ${text}
                    </div>

                    <div class="confirm-buttons">
                        <button class="button accept btn btn-primary">
                            Đồng ý
                        </button>
                        
                        <button class="button reject btn btn-secondary">
                            Đóng
                        </button>
                    </div>
                </div>`;

        let hideConfirm = function () {
            confirmContainer.parentNode.removeChild(confirmContainer);
        };

        confirmContainer.querySelector('.accept').addEventListener('click', () => {
            hideConfirm();
            callback();
        });
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
        //okButton.focus();
    }

    return {
        error: displayError,
        success: displaySuccess,
        info: displayInfo,
        warning: displayWarning,
        confirm: displayConfirm
    }
})();

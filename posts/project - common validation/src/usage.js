/**
 * Xóa các thông báo lỗi.
 * @param form Form CSS selector (có thể nhập hoặc không), hoặc một phần tử DOM.
 */
CV.clearErrorMessages = (form) => {
    if (typeof form == 'string') {
        const prefix = form ? (form + ' ') : '';
        document.querySelectorAll(prefix + '.validate-container .has-error').forEach((el) => {
            CV.clearSingleErrorMessage(el);
        });
    } else {
        form.querySelectorAll('.validate-container .has-error').forEach((el) => {
            CV.clearSingleErrorMessage(el);
        });
    }
};

/**
 * Xóa thông báo lỗi.
 * @param {DOMNode} el Đối tượng input
 */
CV.clearSingleErrorMessage = (el) => {
    el.classList.remove('has-error');
    const container = el.closest('.validate-container');
    container.classList.remove('has-error');
    const errors = container.querySelectorAll('.error-message');
    if (errors) {
        errors.forEach(err => err.remove());
    }
};

/**
 * Hiển thị thông báo lỗi.
 * @param el Đối tượng DOM (input, textarea, select)
 * @param errorMessage Thông báo lỗi
 */
CV.showError = (el, errorMessage) => {
    // Tạo thẻ span thông báo lỗi
    const message = document.createElement('span');
    message.className = 'error-message';
    message.textContent = Array.isArray(errorMessage) ? errorMessage.join('\n') : errorMessage;

    // Cập nhật thẻ DOM
    el.classList.add('has-error');

    // Thêm thông báo lỗi
    const container = el.closest('.validate-container');
    container.classList.add('has-error');
    container.appendChild(message);
};

/**
 * Validate trường đầu vào.
 * Lấy thông báo lỗi của 1 trường input.
 * Trả về khác NULL và khác rỗng nếu có lỗi.
 * @param el
 */
CV.getValidateError = (el) => {
    // Nếu dev chủ định bỏ qua
    if (el.dataset.ignoreValidate) {
        return null;
    }

    // Không validate trường ẩn hoặc bị disabled
    if (el.style.display == 'none' || el.style.visibility == 'hidden' || el.disabled == true) {
        return null;
    }

    // Bỏ qua các trường ẩn (do parent ẩn)
    if (el.offsetWidth <= 0 || el.offsetHeight <= 0) {
        return null;
    }

    // Nếu chưa parse các luật validation thì parse
    if (!el.validation) {
        CV.parseValidation(el);
    }

    // Sau đó validate
    // Chỗ file hơi khác nên tách riêng
    const errorMessage =
        CV.validateByValueAndValidation(el.value, el.validation) ||
        CV.checkFileSizeAndType(el) ||
        '';
    return errorMessage;
};

/**
 * Hàm validate.
 * Hàm này có các đầu vào là value và validation để có thể sử dụng ở nhiều chỗ, độc lập.
 * @param {String} value Giá trị
 * @param {Object} validation Đối tượng chứa các luật validate
 * @return Hàm trả về thông báo lỗi khi có lỗi, hoặc xâu rỗng khi hợp lệ
 */
CV.validateByValueAndValidation = (value, validation) => {
    value = value.trim();

    let errorMessage =
        CV.checkRequired(value, validation) ||
        CV.checkGroupRequired(validation) ||
        '';

    if (!errorMessage) {
        errorMessage =
            CV.checkLength(value, validation) ||
            CV.checkType(value, validation) ||
            CV.checkRange(value, validation) ||
            CV.checkPattern(value, validation) ||
            CV.checkMatch(value, validation) ||
            CV.checkValueIn(value, validation) ||
            '';
    }

    return errorMessage;
};

/**
 * Kiểm tra xem form có dữ liệu hợp lệ không.
 * @param form Form CSS Selector (bắt buộc), hoặc phần tử DOM
 * @return true nếu form KHÔNG hợp lệ
 */
CV.invalidForm = (form) => {
    // Xóa tất cả thông báo lỗi cũ
    CV.clearErrorMessages(form);

    // Có lỗi hay không
    let flag = false;

    // Lưu thông tin thẻ có lỗi đầu tiên
    let firstField = null;

    // Duyệt qua các thẻ nhập
    let elements;
    if (typeof form == 'string') {
        elements = document.querySelectorAll(
            form + ' .validate-container input, ' +
            form + ' .validate-container textarea, ' +
            form + ' .validate-container select');
    } else {
        elements = form.querySelectorAll(
            '.validate-container input, ' +
            '.validate-container textarea, ' +
            '.validate-container select');
    }

    elements.forEach((el) => {
        // Trim giá trị
        if (el.type != 'file') {
            const value = el.value;
            el.value = value.trim();
        }

        const errorMessage = CV.getValidateError(el);

        // Nếu có lỗi
        if (errorMessage && errorMessage.length > 0) {
            // console.log(errorMessage, errorMessage.length);
            CV.showError(el, errorMessage);
            flag = true;
            if (firstField == null) {
                firstField = el;
            }
        } else {
            // Chuẩn hóa định dạng ngày tháng
            if (el.validation && el.validation.date) {
                const value = el.value;
                if (CV.validateDate(value)) {
                    el.value = CV.normalizeDate(value);
                }
            }
        }
    });

    // Focus và scroll đến phần tử lỗi đầu tiên
    if (firstField != null) {
        firstField.focus();
    }

    return flag;
};

/**
 * Gắn thêm các event để validate khi người dùng nhập (input, blur).
 * @param formSelector Form CSS Selector
 */
CV.addRealTimeValidation = () => {
    document.addEventListener('input', (evt) => {
        const el = evt.target;
        if (el.matches(' .validate-container input, ' +
            ' .validate-container textarea, ' +
            ' .validate-container select')) {
            if (el.matches('.has-error')) {
                CV.clearSingleErrorMessage(el);
            }
            el.classList.remove('valid');

            const errorMessage = CV.getValidateError(el);

            if (errorMessage && errorMessage.length > 0) {
                // console.log(errorMessage, errorMessage.length);
                CV.showError(el, errorMessage);
            } else {
                el.classList.add('valid');
            }
        }
    });
};

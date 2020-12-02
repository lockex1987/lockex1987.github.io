// Quy hoạch vào một namespace
const CV = {};

/**
 * Hàm tiện ích dịch message lỗi.
 * Nếu muốn đa ngôn ngữ thì hãy ghi đè hàm này.
 * @param {String} msg Message lỗi
 */
CV.tranlateErrorMessage = (msg) => {
    return msg;
};
/**
 * Chuẩn hóa số điện thoại: loại bỏ các ký tự không phải là số.
 * @param {String} value Xâu giá trị
 */
CV.normalizePhoneNumber = (value) => {
    return value.replace(/[^0-9]/g, '');
};

/**
 * Chuẩn hóa ngày tháng về dạng dd/mm/yyyy.
 * Test-case:
 * ['1/1/2018'].forEach(s => console.log(normalizeDate(s)))
 * @param {String} value Xâu đầu vào, là một ngày đã hợp lệ
 */
CV.normalizeDate = (value) => {
    // Split ngày tháng năm (theo các ký tự gạch ngang, slash, chấm)
    const arr = value.split(/-|\/|\./);
    const day = parseInt(arr[0], 10);
    const month = parseInt(arr[1], 10);
    const year = parseInt(arr[2]);

    return (day < 10 ? ('0' + day) : day) +
        '/' +
        (month < 10 ? ('0' + month) : month) +
        '/' +
        year;
};
/**
 * Kiểm tra một giá trị có phải là bỏ trống hay không.
 * Chú ý: nhập 0 không coi là rỗng, sẽ trả về false.
 * @param value Giá trị
 * @returns true nếu val là rỗng
 */
CV.validateEmpty = (value) => {
    return (value === null || value === '');
};

/**
 * Kiểm tra định dạng ngày.
 * Các định dạng ngày hợp lệ là:
 * dd/mm/yyyy or dd-mm-yyyy or dd.mm.yyyy
 * Test-case:
 * Đúng: ['11/05/1987', '17/05/1987', '1/1/2000', '29/02/2000', '31/12/2018'].forEach(s => console.log(validateDate(s)))
 * Sai: ['29/02/1987', '29/02/1900', '31/04/2000'].forEach(s => console.log(validateDate(s)))
 */
CV.validateDate = (value) => {
    const regExp = /^\d{1,2}(-|\/|\.)\d{1,2}\1\d{4}$/;

    // Check to see if in correct format
    if (!regExp.test(value)) {
        // Doesn't match pattern, bad date
        return false;
    } else {
        // Split ngày tháng năm
        const arr = value.split(/-|\/|\./);
        const day = parseInt(arr[0], 10);
        const month = parseInt(arr[1], 10);
        const year = parseInt(arr[2]);

        // console.log(intDay, intMonth, intYear);

        // Create a lookup for months not equal to Feb.
        const arrayLookup = {
            1: 31,
            3: 31,
            4: 30,
            5: 31,
            6: 30,
            7: 31,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31
        };

        // Check if month value and day value agree
        if (arrayLookup[month] != null) {
            if (day <= arrayLookup[month] && day > 0) {
                // Found in lookup table, good date
                return true;
            }
        }

        // Check for February
        if (month == 2) {
            if (day > 0 && day < 29) {
                return true;
            } else if (day == 29) {
                if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
                    // Year div by 4 and ((not div by 100) or div by 400) -> ok
                    return true;
                }
            }
        }
    }

    // Any other values, bad date
    return false;
};

/**
 * Validate địa chỉ email.
 * @param value Địa chỉ email
 * @return true nếu địa chỉ email hợp lệ
 */
CV.validateEmail = (value) => {
    const regex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/i;
    // const regex = /(^[a-z]([a-z0-9_\.]*)@([a-z_\.]*)([.][a-z]{3})$)|(^[a-z]([a-z0-9_\.]*)@([a-z_\.]*)(\.[a-z]{3})(\.[a-z]{2})*$)/i;
    return regex.test(value);
};

/**
 * Validate số điện thoại.
 * @param value Giá trị text
 */
CV.validatePhoneFormat = (value) => {
    const regex = /^\d*$/;
    return regex.test(value);
};

/**
 * Validate độ dài số điện thoại.
 * @param value Giá trị text
 */
CV.validatePhoneLength = (value) => {
    // Tu 9 den 12 ky tu
    const minLength = 9;
    const maxLength = 12;
    return (minLength <= value.length && value.length <= maxLength);
};

/**
 * Validate là số nguyên.
 * @param value Giá trị text
 */
CV.validateInteger = (value) => {
    const regex = /(^-?\d\d*$)/;
    return regex.test(value);
};

/**
 * Validate là số nói chung.
 * @param value Xâu giá trị
 */
CV.validateNumber = (value) => {
    // Regular Expression: /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
    return !isNaN(value);
};

/**
 * Validate URL hợp lệ.
 * @param value Giá trị URL
 * @returns true nếu giá trị là một URL hợp lệ
 */
CV.validateUrl = (value) => {
    const regex = /^https?:\/\/[\w.-]+\.[\w.-]+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/i;
    return regex.test(value);
};

/**
 * Validate chứng minh thư chỉ có 9 hoặc 12 ký tự.
 * @param value Giá trị
 */
CV.validateIdNumberLength = (value) => {
    const length1 = 9;
    const length2 = 12;
    return (value.length == length1 || value.length == length2);
};

/**
 * Validate chứng minh thư chỉ chứa chữ hoặc số.
 * @param value Giá trị
 */
CV.validateIdNumberOnlyLetter = (value) => {
    const regex = /^[a-zA-Z\d]+$/;
    return regex.test(value);
};

/**
 * Validate chứng minh thư phải có số (không được chỉ gồm chữ thôi).
 * @param value Giá trị
 */
CV.validateIdNumberHasNumber = (value) => {
    const regex = /\d+/;
    return regex.test(value);
};

/**
 * Validate mật khẩu ít nhất 8 ký tự.
 * @param value Giá trị text
 */
CV.validatePasswordLength = (value) => {
    return value.length >= 8;
};

/**
 * Validate mật khẩu không được chứa dấu cách.
 * @param value Giá trị text
 */
CV.validatePasswordSpace = (value) => {
    const regex = /\s/g;
    return value.match(regex);
};

/**
 * Validate mật khẩu không được chứa ký tự tiếng Việt.
 * @param value Giá trị text
 */
CV.validatePasswordVietnamese = (value) => {
    const regex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/gi;
    return value.match(regex);
};

/**
 * Validate mật khẩu phải bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt.
 * @param value Giá trị text
 */
CV.validatePasswordStrong = (value) => {
    const regex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*])/g;
    return value.match(regex);
};

/**
 * Kiểm tra tên miền.
 */
CV.validateDomainName = (value) => {
    const regex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    // [a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}
    return regex.test(value);
};
/**
 * Parse các valiation rule, cho vào thuộc tính validation.
 * @param {DOMNode} el Đối tượng DOM
 */
CV.parseValidation = (el) => {
    let rules = {};

    // Người dùng truyền bằng thuộc tính data-validation
    if (el.dataset.validation) {
        rules = CV.parseValidationFromString(el.dataset.validation);
    }

    // Biểu thức chính quy có thể phức tạp nên để riêng
    if (el.dataset.validationRegex) {
        // console.log(el.dataset.validationRegex, el.dataset.validationRegexMessage);
        rules.regexPattern = el.dataset.validationRegex;
        rules.regexPatternMessage = el.dataset.validationRegexMessage;
    }

    el.validation = rules;
};

/**
 * Parse các valiation rule từ xâu.
 * @param {String} validationRules Xâu các luật validate, cách nhau bởi dấu |
 */
CV.parseValidationFromString = (validationRules) => {
    const rules = {};

    validationRules.split('|').forEach(rule => {
        const a = rule.split(':');
        const s = a[0];
        if (s == 'required') {
            rules.required = true;
            rules.requiredMessage = (a.length > 1) ? a[1] : 'Vui lòng nhập trường này';
        } else if (s == 'groupRequired') {
            rules.groupRequired = true;
            rules.groupRequiredName = a[1];
            rules.groupRequiredMessage = (a.length > 2) ? a[2] : 'Vui lòng chọn ít nhất một tùy chọn';
        } else if (s == 'email') {
            rules.email = true;
            rules.emailMessage = (a.length > 1) ? a[1] : 'Email không hợp lệ';
        } else if (s == 'phone') {
            rules.phone = true;
            rules.phoneLengthMessage = 'Số điện thoại dài từ 9 đến 12 số. Bạn nhập vào {0} số';
            rules.phoneFormatMessage = 'Số điện thoại chỉ được bao gồm số';
        } else if (s == 'integer') {
            rules.integer = true;
            rules.integerMessage = (a.length > 1) ? a[1] : 'Số nguyên không hợp lệ';
        } else if (s == 'numeric') {
            rules.numeric = true;
            rules.numericMessage = (a.length > 1) ? a[1] : 'Số không hợp lệ';
        } else if (s == 'date') {
            rules.date = true;
            rules.dateMessage = (a.length > 1) ? a[1] : 'Ngày không hợp lệ';
        } else if (s == 'idNumber') {
            rules.idNumber = true;
            rules.idNumberLengthMessage = 'Chứng minh thư phải chứa 9 hoặc 12 ký tự. Bạn nhập vào {0} ký tự.';
            rules.idNumberOnlyLetterMessage = 'Chứng minh thư chỉ được chứa chữ và số';
            rules.idNumberHasNumberMessage = 'Chứng minh thư phải chứa số';
        } else if (s == 'domainName') {
            rules.domainName = true;
            rules.domainNameMessage = (a.length > 1) ? a[1] : 'Tên miền không hợp lệ';
        } else if (s == 'url') {
            rules.url = true;
            rules.urlMessage = (a.length > 1) ? a[1] : 'URL không hợp lệ';
        } else if (s == 'password') {
            rules.password = true;
            rules.passwordLengthMessage = 'Mật khẩu phải chứa ít nhất 8 ký tự. Bạn nhập vào {0} ký tự.';
            rules.passwordSpaceMessage = 'Mật khẩu không được chứa dấu cách';
            rules.passwordVietnameseMessage = 'Mật khẩu không được chứa ký tự tiếng Việt';
        } else if (s == 'passwordStrong') {
            rules.passwordStrong = true;
            rules.passwordStrongMessage = (a.length > 1) ? a[1] : 'Mật khẩu phải bao gồm chữ hoa, chữ thường, số, ký tự đặc biệt';
        } else if (s == 'regex') {
            rules.regexPattern = a[1];
            rules.regexPatternMessage = a[2];
        } else if (s == 'minLength') {
            rules.minLength = parseInt(a[1]);
            rules.minLengthMessage = (a.length > 2) ? a[2] : 'Vui lòng nhập ít nhất {0} ký tự';
        } else if (s == 'maxLength') {
            rules.maxLength = parseInt(a[1]);
            rules.maxLengthMessage = (a.length > 2) ? a[2] : 'Vui lòng nhập nhiều nhất {0} ký tự';
        } else if (s == 'min') {
            rules.min = parseFloat(a[1]);
            rules.minMessage = (a.length > 2) ? a[2] : 'Giá trị nhỏ nhất là {0}';
        } else if (s == 'max') {
            rules.max = parseFloat(a[1]);
            rules.maxMessage = (a.length > 2) ? a[2] : 'Giá trị lớn nhất là {0}';
        } else if (s == 'same') {
            rules.same = a[1];
            rules.sameMessage = a[2];
        } else if (s == 'maxFileSize') {
            rules.maxFileSize = parseFloat(a[1]);
            rules.maxFileSizeMessage = (a.length > 2) ? a[2] : 'Dung lượng file vượt quá {0} MB ({1} MB)';
        } else if (s == 'fileTypes') {
            rules.fileTypes = a[1];
            rules.fileTypesMessage = (a.length > 2) ? a[2] : 'Vui lòng chọn file: {0}';
        } else if (s == 'in') {
            console.log('in');
            rules.valueIn = a[1];
            rules.valueInMessage = (a.length > 2) ? a[2] : 'Vui lòng chọn: {0}';
        }
    });

    return rules;
};

/**
 * Reset lại các cấu hình validate, để sau này có thể được parse lại.
 * Hay dùng khi cần áp dụng các cấu hình mới.
 * @param {DOMNode} el Đối tượng DOM
 */
CV.resetValidation = (el) => {
    el.validation = null;
};
/**
 * Yêu cầu nhập.
 */
CV.checkRequired = (value, validation) => {
    if (!validation.required) {
        return '';
    }

    // Chú ý trường hợp nhập 0 nên không sử dụng "if (!value)"
    if (CV.validateEmpty(value)) {
        return CV.tranlateErrorMessage(validation.requiredMessage);
    }
};

/**
 * Yêu cầu chọn ít nhất một tùy chọn.
 */
CV.checkGroupRequired = (validation) => {
    if (!validation.groupRequired) {
        return '';
    }

    let hasValueNumber = 0;
    const arr = document.querySelectorAll('[name="' + validation.groupRequiredName + '"]');

    arr.forEach(obj => {
        CV.clearSingleErrorMessage(obj);
        if (['checkbox', 'radio'].includes(obj.type)) {
            if (obj.checked) {
                hasValueNumber++;
            }
        } else {
            if (!CV.validateEmpty(obj.value)) {
                hasValueNumber++;
            }
        }
    });

    if (hasValueNumber == 0) {
        return CV.tranlateErrorMessage(validation.groupRequiredMessage);
    }
};

/**
 * Chiều dài dữ liệu.
 */
CV.checkLength = (value, validation) => {
    const min = validation.minLength;
    if (min != undefined) {
        if (value.length < min) {
            return CV.tranlateErrorMessage(validation.minLengthMessage).format(min);
        }
    }

    const max = validation.maxLength;
    if (max != undefined) {
        if (value.length > parseInt(max)) {
            return CV.tranlateErrorMessage(validation.maxLengthMessage).format(max);
        }
    }

    return '';
};

/**
 * Kiểm tra kiểu dữ liệu (email, số điện thoại, số nguyên, số, tên miền, date, chứng minh thư,...).
 */
CV.checkType = (value, validation) => {
    // Nếu không nhập rồi thì không validate nữa
    if (CV.validateEmpty(value)) {
        return '';
    }

    if (validation.email) {
        if (!CV.validateEmail(value)) {
            return CV.tranlateErrorMessage(validation.emailMessage);
        }
    }

    if (validation.phone) {
        // value = normalizePhoneNumber(value);
        // el.value = value;

        if (!CV.validatePhoneLength(value)) {
            return validation.phoneLengthMessage.format(value.length);
        }

        if (!CV.validatePhoneFormat(value)) {
            return CV.tranlateErrorMessage(validation.phoneFormatMessage);
        }
    }

    if (validation.integer) {
        if (!CV.validateInteger(value)) {
            return CV.tranlateErrorMessage(validation.integerMessage);
        }
    }

    if (validation.numeric) {
        if (!CV.validateNumber(value)) {
            return CV.tranlateErrorMessage(validation.numericMessage);
        }
    }

    if (validation.date) {
        if (!CV.validateDate(value)) {
            return CV.tranlateErrorMessage(validation.dateMessage);
        } else {
            // value = normalizeDate(value);
            // el.value = value;
        }
    }

    if (validation.idNumber) {
        if (!CV.validateIdNumberLength(value)) {
            return CV.tranlateErrorMessage(validation.idNumberLengthMessage).format(value.length);
        }

        if (!CV.validateIdNumberOnlyLetter(value)) {
            return CV.tranlateErrorMessage(validation.idNumberOnlyLetterMessage);
        }

        if (!CV.validateIdNumberHasNumber(value)) {
            // Không được chỉ có chữ không
            return CV.tranlateErrorMessage(validation.idNumberHasNumberMessage);
        }
    }

    // Không được bắt theo type='password' vì có thể bắt khi người dùng đăng nhập
    // Chỉ validate khi thêm mới người dùng, hoặc đổi mật khẩu mới
    if (validation.password) {
        const a = [];
        if (!CV.validatePasswordLength(value)) {
            a.push(CV.tranlateErrorMessage(validation.passwordLengthMessage).format(value.length));
        }

        if (CV.validatePasswordSpace(value)) {
            a.push(CV.tranlateErrorMessage(validation.passwordSpaceMessage));
        }

        if (CV.validatePasswordVietnamese(value)) {
            a.push(CV.tranlateErrorMessage(validation.passwordVietnameseMessage));
        }

        if (a.length > 0) {
            return a;
        }
    }

    if (validation.passwordStrong) {
        if (!CV.validatePasswordStrong(value)) {
            return CV.tranlateErrorMessage(validation.passwordStrongMessage);
        }
    }

    if (validation.domainName) {
        if (!CV.validateDomainName(value)) {
            return CV.tranlateErrorMessage(validation.domainNameMessage);
        }
    }

    if (validation.url) {
        if (!CV.validateUrl(value)) {
            return CV.tranlateErrorMessage(validation.urlMessage);
        }
    }

    // Domain, IP, time,...

    return '';
};

/**
 * Kiểm tra khoảng của số hoặc ngày tháng:
 * - Nhỏ nhất
 * - Lớn nhất
 * - Nhỏ hơn
 * - Lớn hơn
 * - Ngày trước khoảng thời gian
 * - Ngày sau khoảng thời gian
 */
CV.checkRange = (value, validation) => {
    if (CV.validateEmpty(value)) {
        return '';
    }

    const minValue = validation.min;
    if (minValue != undefined) {
        if (minValue > parseFloat(value)) {
            // CommonUtils.formatThousands()
            return CV.tranlateErrorMessage(validation.minMessage).format(minValue);
        }
    }

    const maxValue = validation.max;
    if (maxValue != undefined) {
        if (maxValue < parseFloat(value)) {
            // CommonUtils.formatThousands()
            return CV.tranlateErrorMessage(validation.maxMessage).format(maxValue);
        }
    }

    /*
    let lessThan = ;
    let greaterThan = ;
    let before = ;
    let after = ;
    */

    return '';
};

/**
 * Kiểm tra theo biểu thức chính quy nào đó.
 */
CV.checkPattern = (value, validation) => {
    if (validation.regexPattern) {
        if (value && !new RegExp(validation.regexPattern).test(value)) {
            return CV.tranlateErrorMessage(validation.regexPatternMessage);
        }
    }

    return '';
};

/**
 * Don't use this, use 'Show password' instead.
 */
CV.checkMatch = (value, validation) => {
    const match = validation.same;
    if (match) {
        if (value != document.querySelector(match).value) {
            return CV.tranlateErrorMessage(validation.sameMessage);
        }
    }
    return '';
};

/**
 * Kiểm tra dung lượng file và đuôi file.
 */
CV.checkFileSizeAndType = (el) => {
    // Nếu không phải là file thì bỏ qua luôn
    if (el.type != 'file') {
        return '';
    }

    // Nếu chưa chọn file cũng bỏ qua luôn
    if (el.files.length == 0) {
        return '';
    }

    // File là phần tử thứ nhất
    const file = el.files[0];

    // Danh sách lỗi
    const msg = [];

    const maxFileSize = el.validation.maxFileSize;
    if (maxFileSize != undefined) {
        const filesize = file.size / (1024 * 1024);
        if (filesize > maxFileSize) {
            msg.push(el.validation.maxFileSizeMessage.format(maxFileSize, filesize.toFixed(2)));
        }
    }

    const fileTypes = el.validation.fileTypes;
    if (fileTypes) {
        const filename = file.name;
        const regex = new RegExp('(.*?).(' + fileTypes.toLowerCase().replace(/,/g, '|') + ')$');
        if (!(regex.test(filename.toLowerCase()))) {
            msg.push(el.validation.fileTypesMessage.format(fileTypes.replace(/,/g, ', ')));
        }
    }

    return msg.join('\n');
};

/**
 * Kiểm tra giá trị ở trong tập các giá trị cho trước.
 * Không phân biệt chữ hoa, chữ thường.
 */
CV.checkValueIn = (value, validation) => {
    // Nếu không nhập rồi thì không validate nữa
    if (CV.validateEmpty(value)) {
        return '';
    }

    const inValues = validation.valueIn;
    if (inValues) {
        const arr = inValues.split(',');
        const obj = arr.find(s => s.trim().toLowerCase() == value.toLowerCase());
        if (!obj) {
            return validation.valueInMessage.format(inValues);
        }
    }

    return '';
};
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
// Khởi tạo
(() => {
    // Thêm hàm String format
    if (!String.prototype.format) {
        String.prototype.format = function () {
            const args = arguments;

            return this.replace(/{(\d+)}/g, (match, number) => {
                return (typeof args[number] != 'undefined') ? args[number] : match;
            });
        };
    }

    CV.addRealTimeValidation();
})();

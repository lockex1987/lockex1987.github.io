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

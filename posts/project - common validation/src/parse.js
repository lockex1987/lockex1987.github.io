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

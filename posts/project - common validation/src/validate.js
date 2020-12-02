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

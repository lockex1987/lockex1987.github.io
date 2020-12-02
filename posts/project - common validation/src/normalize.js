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

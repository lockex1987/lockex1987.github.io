const DateTimeUtils = {};


/**
 * Thêm các chữ số 0 ở đầu để có độ dài là 2 ký tự.
 */
DateTimeUtils.paddingTwoZero = (n) => {
    return (n < 10) ? ('0' + n) : n;
};


/**
* Tính toán số ngày giữa hai ngày (toDate - fromDate).
* @param {Date} fromDate Từ ngày
* @param {Date} toDate Đến ngày
* @return {Integer} Số ngày giữa 2 ngày (ví dụ từ ngày 1/1 đến 10/1 có 9 ngày)
*/
DateTimeUtils.dateDiff = (fromDate, toDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((toDate.getTime() - fromDate.getTime()) / oneDay);
};


/**
 * Thêm bao nhiêu ngày vào một ngày có sẵn.
 * @param {Date} fromDate Ngày bắt đầu
 * @param {Integer} numberOfDate Số ngày thêm vào
 */
DateTimeUtils.addDate = (fromDate, numberOfDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return new Date(fromDate.getTime() + numberOfDate * oneDay);
};


/**
 * Trả về một đối tượng Date từ một xâu có định dạng (dd/MM/yyyy).
 * @param {String} dateString Xâu ngày tháng
 * @retun {Date} Một đối tượng Date
 */
DateTimeUtils.converStringToDate = (dateString) => {
    const a = dateString.split(/\/|-/);
    const date = a[0];
    const month = a[1];
    const year = a[2];
    return new Date(year + '-' + month + '-' + date);
};


/**
 * Trả về đối tượng Date từ xâu dạng YYYY-MM-DDTHH:MM:SSZ
 * @param {String} isoString Xâu ngày tháng, định dạng ISO 8601
 */
DateTimeUtils.convertStringWithTimeToDate = (isoString) => {
    return new Date(isoString);
};


/**
 * Chuyển đối tượng Date sang xâu dạng dd/MM/yyyy.
 * @param {Date} date Một đối tượng Date
 * @return {String} Một xâu dạng dd/MM/yyyy tương ứng
 */
DateTimeUtils.convertDateToString = (date) => {
    return DateTimeUtils.paddingTwoZero(date.getDate()) +
        '/' +
        DateTimeUtils.paddingTwoZero(date.getMonth() + 1) +
        '/' +
        date.getFullYear();
};

/**
 * Chuyển đối tượng Date sang xâu dạng "dd/MM/yyyy h24:mi:ss".
 * @param {Date} date Một đối tượng Date
 * @return {String} Một xâu dạng "dd/MM/yyyy h24:mi:ss" tương ứng
 */
DateTimeUtils.convertDateToStringWithTime = (date) => {
    return DateTimeUtils.convertDateToString(date) +
        ' ' +
        DateTimeUtils.paddingTwoZero(date.getHours()) +
        ':' +
        DateTimeUtils.paddingTwoZero(date.getMinutes()) +
        ':' +
        DateTimeUtils.paddingTwoZero(date.getSeconds());
};


/**
 * Chuẩn hóa ngày tháng về định dạng dd/MM/yyyy.
 * @param s Xâu định dạng ISO 8601
 */
DateTimeUtils.normalizeDate = (s) => {
    const d = DateTimeUtils.convertStringWithTimeToDate(s);
    return DateTimeUtils.convertDateToString(d);
};

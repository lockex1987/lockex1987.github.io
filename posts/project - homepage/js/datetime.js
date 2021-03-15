// Tham khảo post "js - moment/js/date-time-utils.js".

/**
 * Calculate the number of days between two dates (toDate - fromDate)
 * @param fromDate Từ ngày
 * @param toDate Đến ngày
 * @return Số ngày giữa 2 ngày (ví dụ từ ngày 1/1 đến 10/1 có 9 ngày)
 */
function dateDiff(fromDate, toDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((toDate.getTime() - fromDate.getTime()) / oneDay);
}

function addDate(fromDate, numberOfDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    return new Date(fromDate.getTime() + numberOfDate * oneDay);
}

/**
 * Return a date object from a text (dd/MM/yyyy)
 * @param dateString Xâu ngày tháng
 * @retun Một đối tượng Date
 */
function converStringToDate(dateString) {
    const a = dateString.split('/');
    const month = a[1];
    const year = a[2];
    const day = a[0];
    // return new Date(year, month, date);
    return new Date(year + '-' + month + '-' + day);
}

/**
 * Date to text (dd/MM/yyyy)
 * @param date Một đối tượng Date
 * @param Một xâu dạng dd/MM/yyyy tương ứng
 */
function convertDateToString(date) {
    const year = date.getFullYear().toString();
    const monthTemp = date.getMonth() + 1;
    const month = (monthTemp < 10) ? ('0' + monthTemp) : monthTemp.toString();
    const dayTemp = date.getDate();
    const day = (dayTemp < 10) ? ('0' + dayTemp) : dayTemp.toString();
    return (day + '/' + month + '/' + year);
}

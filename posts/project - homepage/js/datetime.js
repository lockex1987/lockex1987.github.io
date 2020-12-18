/**
 * Calculate the number of days between two dates (toDate - fromDate)
 * @param fromDate Từ ngày
 * @param toDate Đến ngày
 * @return Số ngày giữa 2 ngày (ví dụ từ ngày 1/1 đến 10/1 có 9 ngày)
 */
function dateDiff(fromDate, toDate) {
	var oneDay = 24 * 60 * 60 * 1000;
	return Math.round( ( toDate.getTime() - fromDate.getTime() ) / oneDay );
}

function addDate(fromDate, numberOfDate) {
	var oneDay = 24 * 60 * 60 * 1000;
	return new Date(fromDate.getTime() + numberOfDate * oneDay);
}

/**
 * Return a date object from a text (dd/MM/yyyy)
 * @param dateString Xâu ngày tháng
 * @retun Một đối tượng Date
 */
function converStringToDate(dateString) {
	var a = dateString.split('/');
	var month = a[1];
	var year = a[2];
	var date = a[0];
	//return new Date(year, month, date);
	return new Date(year + '-' + month + '-' + date);
}

/**
 * Date to text (dd/MM/yyyy)
 * @param date Một đối tượng Date
 * @param Một xâu dạng dd/MM/yyyy tương ứng
 */
function convertDateToString(date) {
	var year = date.getFullYear().toString();
	var month_tmp = date.getMonth() + 1;
	var month = (month_tmp < 10) ? ('0' + month_tmp) : month_tmp.toString();
	var day_temp = date.getDate();
	var date = (day_temp < 10) ? ('0' + day_temp) : day_temp.toString();
	return (date + "/" + month + "/" + year);
}

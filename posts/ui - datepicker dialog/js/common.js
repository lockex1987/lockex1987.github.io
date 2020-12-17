/**
 * Có phải là năm nhuận hay không
 * @param year Dạng số (yyyy)
 * @return true nếu năm đó là năm nhuận
 */
function isLeapYear(year) {
	// Năm nhuận là năm chia hết cho 400, hoặc chia hết cho 4 nhưng không chia hết cho 100
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

/**
 * Get number of days in a specified month
 * @param month Dạng số (1 -> 12)
 * @param year Dạng số (yyyy)
 * @return Số ngày trong tháng
 */
function getNumberOfDays(month, year) {
	if (month == 2) {
		return isLeapYear(year) ? 29 : 28;
	} else if (month == 4 || month == 6 || month == 9 || month == 11) {
		return 30;
	} else {
		return 31;
	}
}

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

/**
 * Return a date object from a text (dd/MM/yyyy)
 * @param dateString Xâu ngày tháng
 * @retun Một đối tượng Date
 */
function getDateFromStringInput(dateString) {
	var a = dateString.split('/');
	var month = a[1];
	var year = a[2];
	var date = a[0];
	return new Date(year + '-' + month + '-' + date);
}

/**
 * Return a date object from a text (yyyyMMdd)
 * @param dateString Xâu ngày tháng
 * @retun Một đối tượng Date
 */
function getDateFromText(dateString) {
	var month = dateString.substring(4, 6);
	var year = dateString.substring(0, 4);
	var date = dateString.substring(6, 8);
	return new Date(year + '-' + month + '-' + date);
}

/**
 * Date to text (yyyyMMdd)
 * @param date Một đối tượng Date
 * @param Một xâu dạng yyyyMMdd tương ứng
 */
function formatDateToString(date) {
	var year = date.getFullYear().toString();
	var month_tmp = date.getMonth() + 1;
	var month = (month_tmp < 10) ? ('0' + month_tmp) : month_tmp.toString();
	var day_temp = date.getDate();
	var date = (day_temp < 10) ? ('0' + day_temp) : day_temp.toString();
	return (year + month + date);
}

/**
 * Date to text (dd/MM/yyyy)
 * @param date Một đối tượng Date
 * @param Một xâu dạng dd/MM/yyyy tương ứng
 */
function formatDateToString2(date) {
	var year = date.getFullYear().toString();
	var month_tmp = date.getMonth() + 1;
	var month = (month_tmp < 10) ? ('0' + month_tmp) : month_tmp.toString();
	var day_temp = date.getDate();
	var date = (day_temp < 10) ? ('0' + day_temp) : day_temp.toString();
	return (date + '/' + month + '/' + year);
}

/**
 * Returns the ISO week of the date.
 * Thêm hàm getWeek cho đối tượng Date.
 * Source: https://weeknumber.net/how-to/javascript
 */
Date.prototype.getWeek = function() {
	// Create new Date object
	var date = new Date(this.getTime());
	date.setHours(0, 0, 0, 0);
	// Monday in current week (start of the week by ISO 8601)
	date.setDate(date.getDate() - (date.getDay() + 6) % 7);
	// Thursday in current week decides the year.
	date.setDate(date.getDate() + 3);
	// January 4 is always in week 1.
	var week1 = new Date(date.getFullYear(), 0, 4);
	// Similarly adjust to Thursday in week 1
	week1.setDate(week1.getDate() - (week1.getDay() + 6) % 7 + 3);
	// Count number of weeks from date to week1.
	return 1 + Math.round( (date.getTime() - week1.getTime()) / (7 * 24 * 60 * 60 * 1000) );
}

/**
 * Returns the four-digit year corresponding to the ISO week of the date.
 * Thêm hàm getWeekYear cho đối tượng Date.
 * Source: https://weeknumber.net/how-to/javascript
 */
Date.prototype.getWeekYear = function() {
	var date = new Date(this.getTime());
	date.setHours(0, 0, 0, 0);
	// Thursday in current week decides the year.
	date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
	return date.getFullYear();
}

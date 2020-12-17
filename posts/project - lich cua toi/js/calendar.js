// Danh sách các ngày
const EVENT_DATA = [
    { date: '01/01', isLunar: true, isAnnual: true, note: 'Tết Nguyên đán' },
    { date: '15/01', isLunar: true, isAnnual: true, note: 'Rằm tháng riêng' },
    { date: '01/02', isLunar: true, isAnnual: true, note: 'Mồng một âm' },
    { date: '15/02', isLunar: true, isAnnual: true, note: 'Rằm' },
    { date: '01/03', isLunar: true, isAnnual: true, note: 'Mồng một âm' },
    { date: '15/03', isLunar: true, isAnnual: true, note: 'Rằm' },
    { date: '01/04', isLunar: true, isAnnual: true, note: 'Mồng một âm' },
    { date: '15/04', isLunar: true, isAnnual: true, note: 'Rằm' },
    { date: '01/05', isLunar: true, isAnnual: true, note: 'Mồng một âm' },
    { date: '15/05', isLunar: true, isAnnual: true, note: 'Rằm' },
    { date: '01/06', isLunar: true, isAnnual: true, note: 'Mồng một âm' },
    { date: '15/06', isLunar: true, isAnnual: true, note: 'Rằm' },
    { date: '01/07', isLunar: true, isAnnual: true, note: 'Mồng một âm' },
    { date: '15/07', isLunar: true, isAnnual: true, note: 'Rằm' },
    { date: '01/08', isLunar: true, isAnnual: true, note: 'Mồng một âm' },
    { date: '15/08', isLunar: true, isAnnual: true, note: 'Tết Trung thu' },
    { date: '01/09', isLunar: true, isAnnual: true, note: 'Mồng một âm' },
    { date: '15/09', isLunar: true, isAnnual: true, note: 'Rằm' },
    { date: '01/10', isLunar: true, isAnnual: true, note: 'Mồng một âm' },
    { date: '15/10', isLunar: true, isAnnual: true, note: 'Rằm' },
    { date: '01/11', isLunar: true, isAnnual: true, note: 'Mồng một âm' },
    { date: '15/11', isLunar: true, isAnnual: true, note: 'Rằm' },
    { date: '01/12', isLunar: true, isAnnual: true, note: 'Mồng một âm' },
    { date: '15/12', isLunar: true, isAnnual: true, note: 'Rằm' },
    { date: '10/03', isLunar: true, isAnnual: true, note: 'Giỗ tổ Hùng Vương' },

    { date: '16/03', isLunar: false, isAnnual: true, note: 'Sinh nhật Tuấn' },
    { date: '11/05', isLunar: false, isAnnual: true, note: 'Sinh nhật Huyên' },
    { date: '16/10', isLunar: false, isAnnual: true, note: 'Sinh nhật Dương' },
    { date: '30/04', isLunar: false, isAnnual: true, note: 'Giải phóng miền Nam' },
    { date: '01/05', isLunar: false, isAnnual: true, note: 'Quốc tế lao động' },
    { date: '02/09', isLunar: false, isAnnual: true, note: 'Quốc khánh' },

    { date: '06/12/2020', isLunar: false, isAnnual: false, note: 'Tiêm phế cầu Synflorix (mũi 4)' },
    { date: '16/05/2021', isLunar: false, isAnnual: false, note: 'Tiêm viêm não Nhật Bản (mũi 2)' },
    { date: '16/03/2024', isLunar: false, isAnnual: false, note: 'Tiêm 6 trong 1 (mũi 5)' },
    { date: '16/05/2024', isLunar: false, isAnnual: false, note: 'Tiêm sởi, quai bị, Rubella (mũi 2)' }
];

/**
 * Chuẩn hóa dữ liệu, thêm các thuộc tính: dateOfMonth, month, year.
 */
function normalizeData() {
    EVENT_DATA.forEach(e => {
        const a = e.date.split('/');
        if (a[0].startsWith('0')) {
            a[0] = a[0].substring(1);
        }
        if (a[1].startsWith('0')) {
            a[1] = a[1].substring(1);
        }

        e.dateOfMonth = parseInt(a[0]);
        e.month = parseInt(a[1]);
        if (a.length >= 3) {
            e.year = parseInt(a[2]);
        } else {
            e.year = null;
        }
    });
}

/**
 * Lấy sự kiện của ngày.
 * @param {LunarDate} lunarDate Ngày âm
 * @param {Integer} solarDate Ngày dương
 * @param {Integer} solarMonth Tháng dương
 * @param {Integer} solarYear Năm dương
 * @return {String} Nội dung sự kiện
 */
function getEventOfDate(lunarDate, solarDate, solarMonth, solarYear) {
    const events = [];
    EVENT_DATA.forEach(e => {
        let hasEvent = false;
        if (e.isLunar) {
            // Tháng dư (thừa)
            // lunarDate.leap == 0 &&
            if (lunarDate.day == e.dateOfMonth &&
                lunarDate.month == e.month) {
                if (e.isAnnual ||
                    lunarDate.year == e.year) {
                    hasEvent = true;
                }
            }
        } else {
            if (solarDate == e.dateOfMonth &&
                solarMonth == e.month) {
                if (e.isAnnual ||
                    solarYear == e.year) {
                    hasEvent = true;
                }
            }
        }
        if (hasEvent) {
            events.push(e.note);
        }
    });
    return events.join(', ');
}

normalizeData();

/**
 * Calculate the number of days between two dates (toDate - fromDate)
 * @param {Date} fromDate Từ ngày
 * @param {Date} toDate Đến ngày
 * @return {Integer} Số ngày giữa 2 ngày (ví dụ từ ngày 1/1 đến 10/1 có 9 ngày)
 */
function dateDiff(fromDate, toDate) {
    var oneDay = 24 * 60 * 60 * 1000;
    return Math.round((toDate.getTime() - fromDate.getTime()) / oneDay);
}

/**
 * Thêm bao nhiêu ngày vào một ngày có sẵn.
 * @param {Date} fromDate Ngày bắt đầu
 * @param {Integer} numberOfDate Số ngày thêm vào
 */
function addDate(fromDate, numberOfDate) {
    var oneDay = 24 * 60 * 60 * 1000;
    return new Date(fromDate.getTime() + numberOfDate * oneDay);
}

/**
 * Return a date object from a text (dd/MM/yyyy)
 * @param {String} dateString Xâu ngày tháng
 * @retun {Date} Một đối tượng Date
 */
function converStringToDate(dateString) {
    var a = dateString.split(/\/|-/);
    var date = a[0];
    var month = a[1];
    var year = a[2];
    return new Date(year + '-' + month + '-' + date);
}

/**
 * Trả về đối tượng Date từ xâu dạng YYYY-MM-DDTHH:MM:SSZ
 * @param {String} isoString Xâu ngày tháng
 */
function convertStringWithTimeToDate(isoString) {
    return new Date(isoString);
}

/**
 * Chuyển đối tượng Date sang xâu dạng dd/MM/yyyy.
 * @param {Date} date Một đối tượng Date
 * @return {String} Một xâu dạng dd/MM/yyyy tương ứng
 */
function convertDateToString(date) {
    return paddingTwoZero(date.getDate()) + '/'
        + paddingTwoZero(date.getMonth() + 1) + '/'
        + date.getFullYear();
}



/**
 * Chuyển đối tượng Date sang xâu dạng "dd/MM/yyyy h24:mi:ss".
 * @param {Date} date Một đối tượng Date
 * @return {String} Một xâu dạng "dd/MM/yyyy h24:mi:ss" tương ứng
 */
function convertDateToStringWithTime(date) {
    return convertDateToString(date)
        + paddingTwoZero(date.getHours()) + ':'
        + paddingTwoZero(date.getMinutes()) + ':'
        + paddingTwoZero(date.getSeconds());
}

function paddingTwoZero(n) {
    return (n < 10) ? ('0' + n) : n;
}

function normalizeDate(s) {
    var d = convertStringWithTimeToDate(s);
    return convertDateToString(d);
}/**
 * Copyright 2004 Ho Ngoc Duc [http://come.to/duc]. All Rights Reserved.<p>
 * Permission to use, copy, modify, and redistribute this software and its
 * documentation for personal, non-commercial use is hereby granted provided that
 * this copyright notice appears in all copies.
 */
var CalendarCore = (function () {

	// Các hằng số năm trong từng thế kỷ
	const TK19 = [
		0x30baa3, 0x56ab50, 0x422ba0, 0x2cab61, 0x52a370, 0x3c51e8, 0x60d160, 0x4ae4b0, 0x376926, 0x58daa0,
		0x445b50, 0x3116d2, 0x562ae0, 0x3ea2e0, 0x28e2d2, 0x4ec950, 0x38d556, 0x5cb520, 0x46b690, 0x325da4,
		0x5855d0, 0x4225d0, 0x2ca5b3, 0x52a2b0, 0x3da8b7, 0x60a950, 0x4ab4a0, 0x35b2a5, 0x5aad50, 0x4455b0,
		0x302b74, 0x562570, 0x4052f9, 0x6452b0, 0x4e6950, 0x386d56, 0x5e5aa0, 0x46ab50, 0x3256d4, 0x584ae0,
		0x42a570, 0x2d4553, 0x50d2a0, 0x3be8a7, 0x60d550, 0x4a5aa0, 0x34ada5, 0x5a95d0, 0x464ae0, 0x2eaab4,
		0x54a4d0, 0x3ed2b8, 0x64b290, 0x4cb550, 0x385757, 0x5e2da0, 0x4895d0, 0x324d75, 0x5849b0, 0x42a4b0,
		0x2da4b3, 0x506a90, 0x3aad98, 0x606b50, 0x4c2b60, 0x359365, 0x5a9370, 0x464970, 0x306964, 0x52e4a0,
		0x3cea6a, 0x62da90, 0x4e5ad0, 0x392ad6, 0x5e2ae0, 0x4892e0, 0x32cad5, 0x56c950, 0x40d4a0, 0x2bd4a3,
		0x50b690, 0x3a57a7, 0x6055b0, 0x4c25d0, 0x3695b5, 0x5a92b0, 0x44a950, 0x2ed954, 0x54b4a0, 0x3cb550,
		0x286b52, 0x4e55b0, 0x3a2776, 0x5e2570, 0x4852b0, 0x32aaa5, 0x56e950, 0x406aa0, 0x2abaa3, 0x50ab50
	]; /* Years 2000-2099 */

	const TK20 = [
		0x3c4bd8, 0x624ae0, 0x4ca570, 0x3854d5, 0x5cd260, 0x44d950, 0x315554, 0x5656a0, 0x409ad0, 0x2a55d2,
		0x504ae0, 0x3aa5b6, 0x60a4d0, 0x48d250, 0x33d255, 0x58b540, 0x42d6a0, 0x2cada2, 0x5295b0, 0x3f4977,
		0x644970, 0x4ca4b0, 0x36b4b5, 0x5c6a50, 0x466d50, 0x312b54, 0x562b60, 0x409570, 0x2c52f2, 0x504970,
		0x3a6566, 0x5ed4a0, 0x48ea50, 0x336a95, 0x585ad0, 0x442b60, 0x2f86e3, 0x5292e0, 0x3dc8d7, 0x62c950,
		0x4cd4a0, 0x35d8a6, 0x5ab550, 0x4656a0, 0x31a5b4, 0x5625d0, 0x4092d0, 0x2ad2b2, 0x50a950, 0x38b557,
		0x5e6ca0, 0x48b550, 0x355355, 0x584da0, 0x42a5b0, 0x2f4573, 0x5452b0, 0x3ca9a8, 0x60e950, 0x4c6aa0,
		0x36aea6, 0x5aab50, 0x464b60, 0x30aae4, 0x56a570, 0x405260, 0x28f263, 0x4ed940, 0x38db47, 0x5cd6a0,
		0x4896d0, 0x344dd5, 0x5a4ad0, 0x42a4d0, 0x2cd4b4, 0x52b250, 0x3cd558, 0x60b540, 0x4ab5a0, 0x3755a6,
		0x5c95b0, 0x4649b0, 0x30a974, 0x56a4b0, 0x40aa50, 0x29aa52, 0x4e6d20, 0x39ad47, 0x5eab60, 0x489370,
		0x344af5, 0x5a4970, 0x4464b0, 0x2c74a3, 0x50ea50, 0x3d6a58, 0x6256a0, 0x4aaad0, 0x3696d5, 0x5c92e0
	]; /* Years 1900-1999 */

	const TK21 = [
		0x46c960, 0x2ed954, 0x54d4a0, 0x3eda50, 0x2a7552, 0x4e56a0, 0x38a7a7, 0x5ea5d0, 0x4a92b0, 0x32aab5,
		0x58a950, 0x42b4a0, 0x2cbaa4, 0x50ad50, 0x3c55d9, 0x624ba0, 0x4ca5b0, 0x375176, 0x5c5270, 0x466930,
		0x307934, 0x546aa0, 0x3ead50, 0x2a5b52, 0x504b60, 0x38a6e6, 0x5ea4e0, 0x48d260, 0x32ea65, 0x56d520,
		0x40daa0, 0x2d56a3, 0x5256d0, 0x3c4afb, 0x6249d0, 0x4ca4d0, 0x37d0b6, 0x5ab250, 0x44b520, 0x2edd25,
		0x54b5a0, 0x3e55d0, 0x2a55b2, 0x5049b0, 0x3aa577, 0x5ea4b0, 0x48aa50, 0x33b255, 0x586d20, 0x40ad60,
		0x2d4b63, 0x525370, 0x3e49e8, 0x60c970, 0x4c54b0, 0x3768a6, 0x5ada50, 0x445aa0, 0x2fa6a4, 0x54aad0,
		0x4052e0, 0x28d2e3, 0x4ec950, 0x38d557, 0x5ed4a0, 0x46d950, 0x325d55, 0x5856a0, 0x42a6d0, 0x2c55d4,
		0x5252b0, 0x3ca9b8, 0x62a930, 0x4ab490, 0x34b6a6, 0x5aad50, 0x4655a0, 0x2eab64, 0x54a570, 0x4052b0,
		0x2ab173, 0x4e6930, 0x386b37, 0x5e6aa0, 0x48ad50, 0x332ad5, 0x582b60, 0x42a570, 0x2e52e4, 0x50d160,
		0x3ae958, 0x60d520, 0x4ada90, 0x355aa6, 0x5a56d0, 0x462ae0, 0x30a9d4, 0x54a2d0, 0x3ed150, 0x28e952
	]; /* Years 2000-2099 */

	const TK22 = [
		0x4eb520, 0x38d727, 0x5eada0, 0x4a55b0, 0x362db5, 0x5a45b0, 0x44a2b0, 0x2eb2b4, 0x54a950, 0x3cb559,
		0x626b20, 0x4cad50, 0x385766, 0x5c5370, 0x484570, 0x326574, 0x5852b0, 0x406950, 0x2a7953, 0x505aa0,
		0x3baaa7, 0x5ea6d0, 0x4a4ae0, 0x35a2e5, 0x5aa550, 0x42d2a0, 0x2de2a4, 0x52d550, 0x3e5abb, 0x6256a0,
		0x4c96d0, 0x3949b6, 0x5e4ab0, 0x46a8d0, 0x30d4b5, 0x56b290, 0x40b550, 0x2a6d52, 0x504da0, 0x3b9567,
		0x609570, 0x4a49b0, 0x34a975, 0x5a64b0, 0x446a90, 0x2cba94, 0x526b50, 0x3e2b60, 0x28ab61, 0x4c9570,
		0x384ae6, 0x5cd160, 0x46e4a0, 0x2eed25, 0x54da90, 0x405b50, 0x2c36d3, 0x502ae0, 0x3a93d7, 0x6092d0,
		0x4ac950, 0x32d556, 0x58b4a0, 0x42b690, 0x2e5d94, 0x5255b0, 0x3e25fa, 0x6425b0, 0x4e92b0, 0x36aab6,
		0x5c6950, 0x4674a0, 0x31b2a5, 0x54ad50, 0x4055a0, 0x2aab73, 0x522570, 0x3a5377, 0x6052b0, 0x4a6950,
		0x346d56, 0x585aa0, 0x42ab50, 0x2e56d4, 0x544ae0, 0x3ca570, 0x2864d2, 0x4cd260, 0x36eaa6, 0x5ad550,
		0x465aa0, 0x30ada5, 0x5695d0, 0x404ad0, 0x2aa9b3, 0x50a4d0, 0x3ad2b7, 0x5eb250, 0x48b540, 0x33d556
	]; /* Years 2100-2199 */


	/* Create lunar date object, stores (lunar) date, month, year, leap month indicator, and Julian date number */
	function LunarDate(dd, mm, yy, leap, jd) {
		this.day = dd;
		this.month = mm;
		this.year = yy;
		this.leap = leap;
		this.jd = jd;
	}

	/**
	 * Tính số ngày Julian.
	 * @param {Integer} dd Ngày
	 * @param {Integer} mm Tháng
	 * @param {Integer} yy Năm
	 * @return {Integer} Julian date number
	 */
	function jdn(dd, mm, yy) {
		var a = Math.floor((14 - mm) / 12);
		var y = yy + 4800 - a;
		var m = mm + 12 * a - 3;
		var jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
		return jd;
	}

	/**
	 * Lấy danh sách những ngày mồng Một âm trong năm.
	 * @param {Integer} yy Năm dương
	 * @param {*} k Year code
	 */
	function decodeLunarYear(yy, k) {
		var ly = [];
		var monthLengths = [29, 30];
		var regularMonths = [12];
		var offsetOfTet = k >> 17;
		var leapMonth = k & 0xf;
		var leapMonthLength = monthLengths[k >> 16 & 0x1];
		var solarNY = jdn(1, 1, yy);
		var currentJD = solarNY + offsetOfTet;
		var j = k >> 4;
		var mm;
		for (var i = 0; i < 12; i++) {
			regularMonths[12 - i - 1] = monthLengths[j & 0x1];
			j >>= 1;
		}
		if (leapMonth == 0) {
			for (mm = 1; mm <= 12; mm++) {
				ly.push(new LunarDate(1, mm, yy, 0, currentJD));
				currentJD += regularMonths[mm - 1];
			}
		} else {
			for (mm = 1; mm <= leapMonth; mm++) {
				ly.push(new LunarDate(1, mm, yy, 0, currentJD));
				currentJD += regularMonths[mm - 1];
			}
			ly.push(new LunarDate(1, leapMonth, yy, 1, currentJD));
			currentJD += leapMonthLength;
			for (mm = leapMonth + 1; mm <= 12; mm++) {
				ly.push(new LunarDate(1, mm, yy, 0, currentJD));
				currentJD += regularMonths[mm - 1];
			}
		}
		//console.log(ly);
		return ly;
	}

	/**
	 * Lấy danh sách những ngày mồng Một âm trong năm.
	 * @param {Integer} yyyy Năm
	 */
	function getYearInfo(yyyy) {
		var yearCode;
		if (yyyy < 1900) {
			yearCode = TK19[yyyy - 1800];
		} else if (yyyy < 2000) {
			yearCode = TK20[yyyy - 1900];
		} else if (yyyy < 2100) {
			yearCode = TK21[yyyy - 2000];
		} else {
			yearCode = TK22[yyyy - 2100];
		}
		return decodeLunarYear(yyyy, yearCode);
	}

	var FIRST_DAY = jdn(25, 1, 1800); // Tet am lich 1800
	var LAST_DAY = jdn(31, 12, 2199);

	/**
	 * Trả về đối tượng LunarDate của ...
	 * @param jd ??
	 * @param ly ??
	 */
	function findLunarDate(jd, ly) {
		if (jd > LAST_DAY || jd < FIRST_DAY || ly[0].jd > jd) {
			return new LunarDate(0, 0, 0, 0, jd);
		}
		var i = ly.length - 1;
		while (jd < ly[i].jd) {
			i--;
		}
		var off = jd - ly[i].jd;
		return new LunarDate(
				ly[i].day + off,
				ly[i].month,
				ly[i].year,
				ly[i].leap,
				jd);
	}

	/**
	 * Trả về mảng các ngày âm trong tháng.
	 * @param {Integer} mm Tháng dương
	 * @param {Integer} yy Năm dương
	 */
	function getMonth(mm, yy) {
		// Tháng tiếp theo
		var mm1, yy1;
		if (mm < 12) {
			mm1 = mm + 1;
			yy1 = yy;
		} else {
			mm1 = 1;
			yy1 = yy + 1;
		}

		var jd1 = jdn(1, mm, yy);
		var jd2 = jdn(1, mm1, yy1);

		var ly1 = getYearInfo(yy);
		var tet1 = ly1[0].jd;
		var result = [];
		var i;
		if (tet1 <= jd1) {
			for (i = jd1; i < jd2; i++) {
				result.push(findLunarDate(i, ly1));
			}
		} else if (jd1 < tet1 && jd2 < tet1) {
			ly1 = getYearInfo(yy - 1);
			for (i = jd1; i < jd2; i++) {
				result.push(findLunarDate(i, ly1));
			}
		} else if (jd1 < tet1 && tet1 <= jd2) {
			var ly2 = getYearInfo(yy - 1);
			for (i = jd1; i < tet1; i++) {
				result.push(findLunarDate(i, ly2));
			}
			for (i = tet1; i < jd2; i++) {
				result.push(findLunarDate(i, ly1));
			}
		}
		return result;
	}

	return {
		getMonth
	}
})();
var lunarCalendarGui = (function () {

	// Mảng ký hiệu các ngày trong tuần
	const DAYNAMES = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

	// Tên tháng
	const MONTH_NAMES = [
		'', 'Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám',
		'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai',
	];

	/**
	 * Hiển thị một tháng bất kỳ.
	 * @param {Integer} mm Tháng
	 * @param {Integer} yy Năm
	 */
	function printMonth(mm, yy) {
		// Lấy ra danh sách các ngày âm lịch của tháng
		var dayList = CalendarCore.getMonth(mm, yy);
		if (dayList.length == 0) {
			return;
		}

		// Ngày đầu tiên
		var ld1 = dayList[0];

		// Số các ô trống phía đầu
		var emptyCells = (ld1.jd + 1) % 7;

		// Hiển thị tháng năm
		var res = `
				<div class="thang-header">
					<div class="tenthang">
						${MONTH_NAMES[mm]}
					</div>
					<div class="nam">
						${yy}
					</div>
				</div>`;
		
		
		// Hiển thị các ngày trong tuần
		res += '<table class="thang"><tbody><tr>';
		for (var j = 0; j < 7; j++) {
			res += `<td class="ngaytuan">${DAYNAMES[j]}</td>`;
		}
		res += '</tr>';

		// Hiển thị lần lượt các ngày trong tháng
		// Một tháng có thể có nhiều nhất 6 tuần
		for (var i = 0; i < 6; i++) {
			res += '<tr>';
			for (var j = 0; j < 7; j++) {
				var k = 7 * i + j;

				// Nếu là thuộc tháng trước hoặc tháng sau rồi
				if (k < emptyCells || k >= emptyCells + dayList.length) {
					// Hiển thị cell trống
					res += '<td>&nbsp;</td>';
				} else {
					// Ngày trong tháng
					var date = k - emptyCells + 1;
					res += printCell(dayList[k - emptyCells], date, mm, yy);
				}
			}
			res += '</tr>';
		}
		res += '</tbody>';
		res += '</table>';
		return res;
	}

	/**
	 * Hiển thị cell bình thường.
	 * @param lunarDate Đối tượng ngày âm lịch
	 * @param solarDate Ngày dương lịch
	 * @param solarMonth Tháng dương lịch
	 * @param solarYear Năm dương lịch
	 */
	function printCell(lunarDate, solarDate, solarMonth, solarYear) {
		// Class CSS mặc định chung của cả cell
		var cellClass = 'ngaythang';

		// Ngày hôm nay
		var today = new Date();
		if (solarDate == today.getDate()
				&& solarMonth == today.getMonth() + 1
				&& solarYear == today.getFullYear()) {
			cellClass += ' homnay';
		}

		// Kiểm tra xem ngày đó có sự kiện gì hay không
		var event = getEventOfDate(lunarDate, solarDate, solarMonth, solarYear);
		if (event) {
			cellClass += ' event';
		}

		// Highlight thứ Bảy và CN
		// Class của ngày dương
		var solarClass;
		var dow = (lunarDate.jd + 1) % 7;
		if (dow == 0) {
			solarClass = 'cn';
		} else if (dow == 6) {
			solarClass = 't7';
		} else {
			solarClass = 't2t6';
		}

		// Class của ngày âm
		var lunarClass;
		if (lunarDate.leap == 1) {
			lunarClass = 'am2';
		} else {
			lunarClass = 'am';
		}

		// Ngày âm lịch
		// Khi đầu tháng (đầu tháng âm hoặc dương) thì hiển thị thêm cả tháng
		var lunar;
		if (solarDate == 1 || lunarDate.day == 1) {
			lunar = lunarDate.day + '/' + lunarDate.month;
		} else {
			lunar = lunarDate.day;
		}

		// Xâu HTML kết quả
		var res = `<td class="${cellClass}"`;
		if (event) {
			var msg = event;

			// Số ngày còn lại
			var oneDay = 24 * 60 * 60 * 1000;
			var toDate = new Date(solarYear + '-' + solarMonth + '-' + solarDate);
			var dateDiff = Math.ceil((toDate.getTime() - today.getTime()) / oneDay);
			if (dateDiff > 0) {
				msg += `<br />Còn ${dateDiff} ngày`;
			}
			res += ` title="${event}" onclick="noti.info('${msg}')"`;
		}
		res += `>
				<div class="${solarClass}">${solarDate}</div>
				<div class="${lunarClass}">${lunar}</div>
			</td>`;
		return res;
	}

	return {
		printMonth
	}
})();
$(function () {

	// Ngày hiện tại
	var today = new Date();

	// Biến toàn cục: tháng và năm hiện tại
	// Cần đóng gói lại
	var currentMonth = today.getMonth() + 1;
	var currentYear = today.getFullYear();

	// Chỉ số lớn nhất và nhỏ nhất của slide
	var slideMin = -3;
	var slideMax = 3;

	/**
	 * Lấy HTML của 1 tháng
	 * @param {Integer} offset 
	 */
	function getMonth(offset) {
		var m = currentMonth + offset;
		var y = currentYear;
		while (m < 1) {
			m += 12;
			y--;
		}
		while (m > 12) {
			m -= 12;
			y++;
		}
		return '<div class="amlich-item">' + lunarCalendarGui.printMonth(m, y) + "</div>";
	}

	/**
	 * Khởi tạo
	 */
	function init() {
		// Hiển thị 5 tháng
		for (var i = -2; i <= 2; i++) {
			$("#amlich").append(getMonth(i));
		}


		// Ẩn hiện Âm lịch	
		if (localStorage.showLunarDate == 'true') {
			$('#amlich').addClass('show-lunar');
		}

		// Bind nút "Hiện Âm lịch"
		// và gắn sự kiện cho nút đó
		$('#showLunarDate')
			.attr('checked', (localStorage.showLunarDate == 'true'))
			.click(function () {
				var isChecked = $('#showLunarDate').is(':checked');
				localStorage.showLunarDate = isChecked ? 'true' : 'false';
				$('#amlich').toggleClass('show-lunar');
			});


		$('#amlich').slick({
			dots: false,
			infinite: false,
			arrows: false, // chuyển thành true nhưng vẫn có thể không nhìn thấy do nó có color là white
			draggable: true,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			initialSlide: 2 // slide ở giữa
		}).on('swipe', function (event, slickObj, direction) {
			// Get the current slide
			var slideIndex = slickObj.currentSlide;

			// Nếu đã đến cuối bên phải thì thêm vào cuối
			if (slideIndex == slickObj.slideCount - 2) {
				slickObj.slickAdd(getMonth(slideMax));
				slideMax++;
			}

			// Nếu đã đến cuối bên trái thì thêm vào đầu
			if (slideIndex == 1) {
				// Phải chờ slick chuyển slide xong (tầm speed đang là 300)
				setTimeout(function () {
					// Slide có index là 1 bây giờ sẽ chuyển thành 2
					slickObj.currentSlide = slickObj.currentSlide + 1;
					slickObj.slickAdd(getMonth(slideMin), 0, true);
					slideMin--;
				}, 300);
			}
		});
	}

	init();
});

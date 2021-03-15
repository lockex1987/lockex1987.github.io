/*
Vietnamese calendar
    Sử dụng trong khoảng 200 năm thôi
    Bước 1: tính Julian day
    Bước 2: tính 2,400 ngày mồng 1 âm sẵn
        Sóc (New moon)
        Tiết khí
        Tháng 11

        var NEW_MOON_DAYS = [];
        for (var year = 1900; year <= 2099; year++) {
            NEW_MOON_DAYS.push(...getYearInfo(year));
        }
        //
        //JSON.stringify(NEW_MOON_DAYS, null, 2)
        var text = '';
        // day:${e.day}, luôn là 1
        NEW_MOON_DAYS.forEach(e => text += `{month:${e.month},year:${e.year},leap:${e.leap},jd:${e.jd}},\n`)
        text
    Bước 3: đổi âm ra dương, dương ra âm dựa vào 2,400 ngày sẵn kia

    Lịch dựa vào tính toán thiên văn phức tạp.
    Có nhiều loại lịch:
    - Lịch La Mã
    - Lịch Julius
    - Lịch Gregorius
    - Lịch Trung Quốc
    - Lịch Việt Nam (âm lịch)
    Mỗi loại lịch lại được áp dụng ở từng thời kỳ.
    Ngày làm mốc:
    - Julian day (không liên quan đến lịch Julius)
    Lịch âm dựa vào các khái niệm: ...

*/


function getJulianDay(dd, mm, yy) {
    const a = Math.floor((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    const jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    return jd;
}

function convertFromGregorianToVietnamese(greDay, greMonth, greYear) {
    const jd = getJulianDay(greDay, greMonth, greYear);
    let i = NEW_MOON_DAYS.length - 1;
    while (jd < NEW_MOON_DAYS[i].jd) {
        i--;
    }
    const moonDay = NEW_MOON_DAYS[i];
    const off = jd - moonDay.jd;
    return {
        day: 1 + off,
        month: moonDay.month,
        year: moonDay.year,
        leap: moonDay.leap,
        isLeapMonth: moonDay.leap == 1
    };
}

/*
convertFromGregorianToVietnamese(1, 8, 2019)
{day: 1, month: 7, year: 2019, isLeapMonth: false}
convertFromGregorianToVietnamese(29, 8, 2019)
{day: 29, month: 7, year: 2019, isLeapMonth: false}
convertFromGregorianToVietnamese(30, 8, 2019)
{day: 1, month: 8, year: 2019, isLeapMonth: false}
convertFromGregorianToVietnamese(1, 4, 2020)
{day: 9, month: 3, year: 2020, isLeapMonth: false}
convertFromGregorianToVietnamese(1, 5, 2020)
{day: 9, month: 4, year: 2020, isLeapMonth: false}
convertFromGregorianToVietnamese(1, 6, 2020)
{day: 10, month: 4, year: 2020, isLeapMonth: true}
*/

function convertFromVietnameseToGregorian(viDay, viMonth, viYear, viLeapMonth) {
    viLeapMonth = viLeapMonth ? 1 : 0;
    const moonDay = NEW_MOON_DAYS.find(d => d.month == viMonth && d.year == viYear && d.leap == viLeapMonth);
    if (!moonDay) {
        return 'Does not exist';
    } else {
        const jd = moonDay.jd;
        // Julian day to Gregorian date
        return 'TODO';
    }
}


/**
 * Lấy thông tin cảnh báo.
 * @returns Mã HTML
 */
function getWarning() {
    // Cảnh báo trước 2 ngày
    const checkDates = [
        { diff: 0, label: 'Hôm nay' },
        { diff: 1, label: 'Ngày mai' },
        { diff: 2, label: 'Ngày kia' }
    ];
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    let html = '';
    checkDates.forEach(e => {
        const greDate = new Date(today.getTime() + e.diff * oneDay);
        const greDay = greDate.getDate();
        const greMonth = greDate.getMonth() + 1;
        const greYear = greDate.getFullYear();
        const viDate = convertFromGregorianToVietnamese(greDay, greMonth, greYear);
        const s = getEventOfDate(viDate, greDay, greMonth, greYear);
        if (s) {
            html += `<div>${e.label} là ${s}</div>`;
        }
    });
    return html;
}


/**
 * Hiển thị cảnh báo.
 */
function processWarning() {
    const warning = getWarning();
    if (warning) {
        document.querySelector('#warning').innerHTML = warning;
    }
}

processWarning();

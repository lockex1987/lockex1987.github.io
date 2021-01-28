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
    { date: '02/09', isLunar: false, isAnnual: true, note: 'Quốc khánh' }
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

const lunarCalendarGui = (function () {
    // Mảng ký hiệu các ngày trong tuần
    const DAYNAMES = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    // Tên tháng
    const MONTH_NAMES = [
        '', 'Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám',
        'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'
    ];

    /**
	 * Hiển thị một tháng bất kỳ.
	 * @param {Integer} mm Tháng
	 * @param {Integer} yy Năm
	 */
    function printMonth(mm, yy) {
        // Lấy ra danh sách các ngày âm lịch của tháng
        const dayList = CalendarCore.getMonth(mm, yy);
        if (dayList.length == 0) {
            return;
        }

        // Ngày đầu tiên
        const ld1 = dayList[0];

        // Số các ô trống phía đầu
        const emptyCells = (ld1.jd + 1) % 7;

        // Hiển thị tháng năm
        let res = `
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
        for (let i = 0; i < 6; i++) {
            res += '<tr>';
            for (var j = 0; j < 7; j++) {
                const k = 7 * i + j;

                // Nếu là thuộc tháng trước hoặc tháng sau rồi
                if (k < emptyCells || k >= emptyCells + dayList.length) {
                    // Hiển thị cell trống
                    res += '<td>&nbsp;</td>';
                } else {
                    // Ngày trong tháng
                    const date = k - emptyCells + 1;
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
        let cellClass = 'ngaythang';

        // Ngày hôm nay
        const today = new Date();
        if (solarDate == today.getDate() &&
				solarMonth == today.getMonth() + 1 &&
				solarYear == today.getFullYear()) {
            cellClass += ' homnay';
        }

        // Kiểm tra xem ngày đó có sự kiện gì hay không
        const event = getEventOfDate(lunarDate, solarDate, solarMonth, solarYear);
        if (event) {
            cellClass += ' event';
        }

        // Highlight thứ Bảy và CN
        // Class của ngày dương
        let solarClass;
        const dow = (lunarDate.jd + 1) % 7;
        if (dow == 0) {
            solarClass = 'cn';
        } else if (dow == 6) {
            solarClass = 't7';
        } else {
            solarClass = 't2t6';
        }

        // Class của ngày âm
        let lunarClass;
        if (lunarDate.leap == 1) {
            lunarClass = 'am2';
        } else {
            lunarClass = 'am';
        }

        // Ngày âm lịch
        // Khi đầu tháng (đầu tháng âm hoặc dương) thì hiển thị thêm cả tháng
        let lunar;
        if (solarDate == 1 || lunarDate.day == 1) {
            lunar = lunarDate.day + '/' + lunarDate.month;
        } else {
            lunar = lunarDate.day;
        }

        // Xâu HTML kết quả
        let res = `<td class="${cellClass}"`;
        if (event) {
            let msg = event;

            // Số ngày còn lại
            const oneDay = 24 * 60 * 60 * 1000;
            const toDate = new Date(solarYear + '-' + solarMonth + '-' + solarDate);
            const dateDiff = Math.ceil((toDate.getTime() - today.getTime()) / oneDay);
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
    };
})();

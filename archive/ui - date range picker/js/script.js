/**
 * Định dạng ngày của Việt Nam.
 */
const VIETNAMESE_DATE_FORMAT = 'DD/MM/YYYY';

/**
 * Cấu hình mặc định, ngôn ngữ tiếng Việt.
 */
const DEFAULT_DATERANGEPICKER_OPTIONS = {
    // Khi click ra ngoài thì không thiết lập input
    autoUpdateInput: false,
    // Chọn riêng lẻ
    singleDatePicker: true,
    // Tùy chọn của Việt Nam
    locale: {
        format: VIETNAMESE_DATE_FORMAT,
        separator: ' - ',
        applyLabel: 'Áp dụng',
        cancelLabel: 'Hủy',
        customRangeLabel: 'Tùy chỉnh',
        fromLabel: 'Từ',
        toLabel: 'Đến',
        daysOfWeek: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', '7'],
        monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        firstDay: 1
    }
};

/**
 * Khởi tạo chọn khoảng thời gian.
 */
function initFilterDateRange() {
    let options = Object.assign({},
        DEFAULT_DATERANGEPICKER_OPTIONS,
        {
            singleDatePicker: false,
            ranges: {
                // Bỏ tùy chọn tất cả, hiển thị nút xóa
                '30 ngày trước': [moment().subtract(29, 'days'), moment()],
                'Tuần này': [moment().startOf('week'), moment().endOf('week')],
                'Tuần trước': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
                'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                'Tháng trước': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Hôm nay': [moment(), moment()],
                'Hôm qua': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '7 ngày trước': [moment().subtract(6, 'days'), moment()],
                '30 ngày trước': [moment().subtract(29, 'days'), moment()],
            },
			minDate: moment().subtract(12, 'months'),
            maxDate: moment(),
        }
    );
	
	// Xử lý khi chọn khoảng thời gian.
	let callback = function (evt, picker) {
		$('#filterDateRange .range-label').text(picker.startDate.format(VIETNAMESE_DATE_FORMAT) + ' - ' + picker.endDate.format(VIETNAMESE_DATE_FORMAT));
	};

    $('#filterDateRange').daterangepicker(options)
			.on('apply.daterangepicker', callback);

    $('#filterDateRange .clear-range').on('click', (evt) => {
        evt.stopPropagation();
        $('#filterDateRange .range-label').text('Tất cả');
    });
}


/**
 * Khởi tạo chọn ngày đơn giản, không có ràng buộc gì.
 */
function initSingleDate() {
    let options = Object.assign({},
        DEFAULT_DATERANGEPICKER_OPTIONS
    );

    let callback = function (evt, picker) {
        $('#singleDate').val(picker.startDate.format(VIETNAMESE_DATE_FORMAT));
    };

    $('#singleDate').daterangepicker(options)
			.on('apply.daterangepicker', callback);
}

/**
 * Khởi tạo datepicker cho ngày bắt đầu và ngày kết thúc.
 */
function initStartDateAndEndDate() {
    let options = Object.assign({},
        DEFAULT_DATERANGEPICKER_OPTIONS
    );
        
    initStartDate(options, null);
    initEndDate(options, null);
}

/**
 * Chọn ngày bắt đầu.
 */
function initStartDate(options, maxDate) {
    if ($('#startDate').data('daterangepicker') != null) {
        $('#startDate').data('daterangepicker').remove();
    }

    options.minDate = moment().subtract(100, 'years');
    options.maxDate = maxDate || moment().add(100, 'years');

    let callback = function (evt, picker) {
		console.log('Apply');
		let chosenDate = picker.startDate;
        let value;
		if (chosenDate.isValid()) {
			value = chosenDate.format(VIETNAMESE_DATE_FORMAT);
			$('#startDate').val(value);
		} else {
			value = null;
			$('#startDate').val('');
		}
        initEndDate(options, value);
    };

	// Phải làm thế này, nếu không sẽ không chọn được ngày hiện tại
    $('#startDate').daterangepicker(options)
			.on('apply.daterangepicker', callback);
}

/**
 * Chọn ngày kết thúc.
 */
function initEndDate(options, minDate) {
    if ($('#endDate').data('daterangepicker') != null) {
        $('#endDate').data('daterangepicker').remove();
    }

	// Không thể để minDate, maxDate là các giá trị null, nếu không chỉ thiết lập được tháng hiện tại
    options.minDate = minDate || moment().subtract(100, 'years');
    options.maxDate = moment().add(100, 'years');

    let callback = function (evt, picker) {
        let chosenDate = picker.startDate;
		let value;
		if (chosenDate.isValid()) {
			value = chosenDate.format(VIETNAMESE_DATE_FORMAT);
			$('#endDate').val(value);
		} else {
			value = null;
			$('#endDate').val('');
		}
        initStartDate(options, value);
    };

    $('#endDate').daterangepicker(options)
			.on('apply.daterangepicker', callback);
}


initFilterDateRange();
initSingleDate();
initStartDateAndEndDate();

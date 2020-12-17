$(function () {
    var startDate;
    var endDate;

    /**
     * Highlight tuần đang được chọn.
     */
    var selectCurrentWeek = function () {
        window.setTimeout(function () {
            $('.week-picker').find('.ui-datepicker-current-day a').addClass('ui-state-active');
        }, 1);
    }

    $('.week-picker').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        onSelect: function (dateText, inst) {
            // Lấy ngày được chọn
            let date = $(this).datepicker('getDate');

            // Lấy ngày đầu tuần và cuối tuần
            startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
            endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);

            // Cập nhật nhãn
            let dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
            $('#startDate').text($.datepicker.formatDate(dateFormat, startDate, inst.settings));
            $('#endDate').text($.datepicker.formatDate(dateFormat, endDate, inst.settings));

            selectCurrentWeek();
        },

        // Dung ham nay trong truong hop nguoi dung qua lai giua cac thang, van phai luu lai tuan dang chon
        // Khong phai
        beforeShowDay: function (date) {
            let cssClass = '';
            if (date >= startDate && date <= endDate) {
                cssClass = 'ui-datepicker-current-day';
            }
            return [true, cssClass];
        },

        onChangeMonthYear: function (year, month, inst) {
            selectCurrentWeek();
        }
    });

    // Gắn sự kiện mousemove và mouseleave để highlight dòng khi hover
    $('.week-picker .ui-datepicker-calendar tr').live('mousemove', function () {
        $(this).find('td a').addClass('ui-state-hover');
    });
    $('.week-picker .ui-datepicker-calendar tr').live('mouseleave', function () {
        $(this).find('td a').removeClass('ui-state-hover');
    });
});

//$.datepicker.setDefaults( $.datepicker.regional['vi-VN'] );

$('#datepicker1').datepicker();

$('#datepicker2').datepicker();
$('#anim').on('change', function () {
    $('#datepicker2').datepicker('option', 'showAnim', $(this).val());
});

$('#datepicker3').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true
});

$('#datepicker4').datepicker({
    showButtonPanel: true
});

$('#datepicker5').datepicker();

$('#datepicker6').datepicker({
    changeMonth: true,
    changeYear: true
});

$('#datepicker7').datepicker({
    numberOfMonths: 3,
    showButtonPanel: true
});

$('#datepicker8').datepicker();
$('#format').on('change', function () {
    $('#datepicker8').datepicker('option', 'dateFormat', $(this).val());
});

$('#datepicker9').datepicker({
    showOn: 'button',
    buttonImage: 'images/calendar.gif',
    buttonImageOnly: true,
    buttonText: 'Chọn ngày'
});


$('#datepicker10').datepicker($.datepicker.regional['fr']);
$('#locale').on('change', function () {
    $('#datepicker10').datepicker('option', $.datepicker.regional[$(this).val()]);
});

$('#datepicker11').datepicker({
    altField: '#alternate',
    altFormat: 'DD, d MM, yy'
});

$('#datepicker12').datepicker({
    minDate: -20,
    maxDate: '+1M +10D'
});


var dateFormat = 'dd/mm/yy';

var from = $('#from').datepicker({
    dateFormat: dateFormat
}).on('change', function () {
    to.datepicker('option', 'minDate', getDate(this));
});

var to = $('#to').datepicker({
    dateFormat: dateFormat
}).on('change', function () {
    from.datepicker('option', 'maxDate', getDate(this));
});

function getDate(element) {
    var date;
    try {
        date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
        date = null;
    }
    return date;
}

$('#datepicker14').datepicker({
    showWeek: true,
    firstDay: 1
});

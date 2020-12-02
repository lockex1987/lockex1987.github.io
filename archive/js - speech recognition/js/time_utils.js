// https://momentjs.com/docs/#/utilities/
var TimeUtils = (function() {

	function _getMommentFromTime(time) {
		if (!time) {
			return moment();
		}
		if (time === 'hôm nay') {
			return moment();
		}
		if (time === 'hôm qua') {
			return moment().subtract(1, 'days');
		}
		if (time === 'hôm kia') {
			return moment().subtract(2, 'days');
		}
		
		// Tuần bắt đầu bằng Chủ Nhật
		var idx = ['chủ nhật', 'thứ hai', 'thứ ba', 'thứ tư', 'thứ năm', 'thứ sáu', 'thứ bảy'].indexOf(time);
		if (idx >= 0) {
			return moment().startOf('week').add(idx, 'days');
		}
		
		var matches_array = /ngày (\d+)/gi.exec(time);
		if (matches_array) {
			var d = matches_array[1];
			// moment().startOf('month').add(d - 1, 'days')
			return moment().date(parseInt(d, 10));
		}
		
		matches_array = /(\d+) ngày trước/gi.exec(time);
		if (matches_array) {
			var d = matches_array[1];
			return moment().subtract(parseInt(d, 10), 'days');
		}
		
		return moment();
	}
	
	function getDateFromTime(time) {
		var pattern = 'DD/MM/YYYY';
		var m = _getMommentFromTime(time);
		return m.format(pattern);
	}
	
	return {
		getDateFromTime
	};
})();
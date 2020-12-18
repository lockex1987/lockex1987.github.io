// Speech Recognition:
// https://www.youtube.com/watch?v=0mJC0A72Fnw
// https://github.com/wesbos/JavaScript30/blob/master/20%20-%20Speech%20Detection/index-FINISHED.html
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

var VoiceInput = (function() {

	function checkInput(str) {
		// Không được để toàn cục,
		// phải khởi tạo mỗi lần kiểm tra
		var regexp = /^(hôm nay |hôm qua |hôm kia |chủ nhật |thứ hai |thứ ba |thứ tư |thứ năm |thứ sáu |thứ bảy |ngày \d+ |\d+ ngày trước )?(.*) hết (\d+(\.\d+)*)( nghìn)?$/gi;
		
		//var matches_array = str.match(regexp);
		var matches_array = regexp.exec(str);
		return matches_array;
	}
	
	function extractFields(str) {
		var matches_array = checkInput(str);
		
		if (!matches_array) {
			return null;
		}

		// Lấy ra các trường và chuẩn hóa dữ liệu
		var time = matches_array[1];
		if (time) {
			time = time.trim();
		}
		var action = matches_array[2];
		var number = parseInt(matches_array[3].replace(/\./g, ''), 10);
		// Bỏ qua phần tử 4 là ngăn cách nghìn
		var unit = matches_array[5];
		if (unit === " nghìn") {
			number *= 1000;
		}
		
		return {
			time,
			action,
			number
		};
	}

	return {
		extractFields
	};
})();

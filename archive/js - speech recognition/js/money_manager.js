/*
Xem hôm trước
Xem hôm sau
Lưu lại
*/

function clearInput(id) {
	document.querySelector('#amount_' + id).value = '';
	calculateTotal();
}

function calculateTotal() {
	var total = 0;
	document.querySelectorAll('.money-number').forEach(tag => {
		if (tag.value) {
			total += parseInt(tag.value);
		}
	});
	document.querySelector('#total').textContent = Common.numberWithCommas(total);
}

function processFields(time, action, number) {
	var date = TimeUtils.getDateFromTime(time);
	var cat = Category.getCategory(action);
	number /= 1000;
	
	var tag = document.querySelector('#amount_' + cat);
	var currentValue = tag.value;
	if (!currentValue) {
		currentValue = 0;
	} else {
		currentValue = parseInt(currentValue, 10);
	}
	currentValue += number;
	tag.value = currentValue;

	tag.focus();

	//console.log(date + ', ' + cat + ': ' + number);
}

function testData() {
	var data = [
		'Hôm qua đi chợ hết 100 nghìn',
		'Hôm kia đi chợ hết 100',
		'Hôm qua đi chợ hết 100.000',
		'Hôm nay mua rau hết 50.000',
		'Mua thịt hết 9 nghìn',
		'Thứ ba đổ xăng hết 56 nghìn',
		'Ngày 18 sửa xe hết 345 nghìn',
		'Hôm nay trời mưa',
		'5 ngày trước ăn kem hết 80 nghìn',
		'Chủ Nhật mua thịt hết 30 nghìn',
		'nạp điện thoại hết 100 nghìn',
		'đi xem phim hết 160 nghìn',
		'liên hoan hết 70 nghìn',
		'đổi bình gas hết 80 nghìn',
		'đóng tiền điện hết 90 nghìn',
		'đóng tiền nước hết 100 nghìn',
		'mua váy hết 110 nghìn',
		'gửi xe hết 120 nghìn'
	];

	data.forEach(s => {
		var str = s.trim().toLowerCase();
		//console.log('INPUT:', str);
		
		var obj = VoiceInput.extractFields(str);
		if (obj) {
			processFields(obj.time, obj.action, obj.number);
			calculateTotal();
		}
	});	
}

function init() {
	Category.bindForm();
	//testData();
}

init();

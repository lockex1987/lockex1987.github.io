"use strict";

// Số điện thoại bắt đầu bằng các đầu số sau:
// - Viettel:
//   + 08 (086)
//   + 09 (096, 097, 098)
//   + 016 (0162, 0163, 0164, 0165, 0166, 0167, 0168, 0169)
//   + 03 (032, 033, 034, 035, 036, 037, 038, 039)
// - MobiPhone:
//   + 08 (089)
//   + 09 (090, 093)
//   + 012 (0120, 0121, 0122, 0126, 0128)
//   + 07 (070, 079, 077, 076, 078)
// - VinaPhone:
//   + 08 (088)
//   + 09 (091, 094)
//   + 012 (0123, 0124, 0125, 0127, 0129)
//   + 08 (083, 084, 085, 081, 082)
// - VietnamMobile:
//   + 09 (092)
//   + 018 (0186, 0188)
//   + 05 (056, 058)
// - GMobile:
//   + 09 (099)
//   + 019 (0199)
//   + 05 (059)
// Sau đó là 8 chữ số
// JS: new RegExp('^(08|09|016|012|018|019)[0-9]{8}$');
const PHONE_NUMBER_PREFIX = {
	'086': 'VIETTEL', '096': 'VIETTEL', '097': 'VIETTEL', '098': 'VIETTEL',
	'0162': 'VIETTEL', '0163': 'VIETTEL', '0164': 'VIETTEL', '0165': 'VIETTEL', '0166': 'VIETTEL', '0167': 'VIETTEL', '0168': 'VIETTEL', '0169': 'VIETTEL',
	'032': 'VIETTEL', '033': 'VIETTEL', '034': 'VIETTEL', '035': 'VIETTEL', '036': 'VIETTEL', '037': 'VIETTEL', '038': 'VIETTEL', '039': 'VIETTEL',
	
	'089': 'MOBIFONE', '090': 'MOBIFONE', '093': 'MOBIFONE',
	'0120': 'MOBIFONE', '0121': 'MOBIFONE', '0122': 'MOBIFONE', '0126': 'MOBIFONE', '0128': 'MOBIFONE',
	'070': 'MOBIFONE', '079': 'MOBIFONE', '077': 'MOBIFONE', '076': 'MOBIFONE', '078': 'MOBIFONE',
	
	'088': 'VINAPHONE', '091': 'VINAPHONE', '094': 'VINAPHONE',
	'0123': 'VINAPHONE', '0124': 'VINAPHONE', '0125': 'VINAPHONE', '0127': 'VINAPHONE', '0129': 'VINAPHONE',
	'083': 'VINAPHONE', '084': 'VINAPHONE', '085': 'VINAPHONE', '081': 'VINAPHONE', '082': 'VINAPHONE',
	
	'092': 'VIETNAMMOBILE',
	'0186': 'VIETNAMMOBILE', '0188': 'VIETNAMMOBILE',
	'056': 'VIETNAMMOBILE', '058': 'VIETNAMMOBILE',

	'099': 'GMOBILE',
	'0199': 'GMOBILE',
	'059': 'GMOBILE'
};

const MAPPING_11_TO_10 = {
	'0162': '032', '0163': '033', '0164': '034', '0165': '035', '0166': '036', '0167': '037', '0168': '038', '0169': '039',
	'0120': '070', '0121': '079', '0122': '077', '0126': '076', '0128': '078',
	'0123': '083', '0124': '084', '0125': '085', '0127': '081', '0129': '082',
	'0186': '056', '0188': '058',	
	'0199': '059'
};

// Update MySQL:
//for (var k in MAPPING_11_TO_10) { var v = MAPPING_11_TO_10[k]; console.log("select c.phone from customer c where length(c.phone) = 11 and substring(c.phone, 1, 4) = '" + k + "';"); }
//for (var k in MAPPING_11_TO_10) { var v = MAPPING_11_TO_10[k]; console.log("select concat('" + v + "', substring(phone, 5)) from customer where length(phone) = 11 and substring(phone, 1, 4) = '" + k + "';"); }
//for (var k in MAPPING_11_TO_10) { var v = MAPPING_11_TO_10[k]; console.log("update customer set phone = concat('" + v + "', substring(phone, 5)) where length(phone) = 11 and substring(phone, 1, 4) = '" + k + "';"); }

const MAPPING_10_TO_11 = {};

for (var key in MAPPING_11_TO_10) {
	MAPPING_10_TO_11[MAPPING_11_TO_10[key]] = key;
}
//console.log(MAPPING_10_TO_11);

/**
 * Chuẩn hóa số điện thoại.
 * Các số điện thoại từ các nguồn khác nhau có thể chứa các ký tự đặc biệt như -.()+, có thể bắt đầu bằng 84 chứ không phải bằng 0.
 * @param phone Số điện thoại nguồn
 * @return Số điện thoại đã được chuẩn hóa
 */
function normalize_phone(phone) {
	if (!phone) {
		return '';
	}

	// Xóa trước các kí hiệu không phải số đi
    var re = /\D/g;
    phone = phone.replace(re, '');

	// Kiểm tra nếu là đầu 84 thì remove
	if (phone.indexOf('84') === 0) {
        phone = '0' + phone.substr(2);
    }

	// Kiểm tra là đầu 0 thì trả về luôn
	if (phone.indexOf('0') === 0) {
		return phone;
	}
	
	// Trường hợp là 1686519125 thì bổ sung thêm đầu 0 vào
	return '0' + phone;
}

/**
 * Chuẩn hóa số điện thoại để nhắn tin.
 * @param phone Số điện thoại đã được chuẩn hóa bằng hàm normalize_phone
 * @return Số điện thoại có 84 ở đầu chứ không phải 0
 */
function format_phone_to_send_sms(phone) {
	if (!phone) {
		return '';
	}
	return '84' + phone.substr(1);
}

/**
 * Lấy về tên nhà mạng.
 * @param Số điện thoại đã chuẩn hóa
 * @return Tên nhà mạng
 */
function get_network_type(phone) {
	//phone = normalize_phone(phone);
	
	if (phone.length === 10) {
		var prefix = phone.substr(0, 3);
		if (PHONE_NUMBER_PREFIX[prefix]) {
			return PHONE_NUMBER_PREFIX[prefix];
		}	
	}
	
	if (phone.length === 11) {
		var prefix = phone.substr(0, 4);
		if (PHONE_NUMBER_PREFIX[prefix]) {
			return PHONE_NUMBER_PREFIX[prefix];
		}
	}
	
	return 'UNKNOWN';
}

/**
 * Convert số điện thoại 11 số thành 10 số.
 * @param phone Số điện thoại 11 số
 * @return Số điện thoại 10 số
 */
function convert_11_to_10(phone) {
	if (phone.length === 11) {
		var prefix = phone.substr(0, 4);
		if (MAPPING_11_TO_10[prefix]) {
			return MAPPING_11_TO_10[prefix] + phone.substr(4);
		}
	}
	return phone;
}

/**
 * Convert SIM 10 số mới thành 11 cũ.
 * @param phone Số điện thoại 10 số mới
 * @return Số điện thoại 11 số cũ
 */
function convert_10_to_11(phone) {
	if (phone.length === 10) {
		var prefix = phone.substr(0, 3);
		if (MAPPING_10_TO_11[prefix]) {
			return MAPPING_10_TO_11[prefix] + phone.substr(3);
		}
	}
	return phone;
}

function test() {
	console.log(normalize_phone('0168.651.9125'));
	console.log(normalize_phone('84168-651-9125'));
	console.log(normalize_phone('+841686519125'));
	console.log(normalize_phone('1686519125'));
	console.log(normalize_phone('01686519125'));
	
	console.log(format_phone_to_send_sms('01686519125'));
	
	console.log(get_network_type('01686519125'));
	console.log(get_network_type('016865191256'));
	console.log(get_network_type('01254004004'));
	console.log(get_network_type('0915487997'));
	console.log(get_network_type('0386519125'));
	console.log(get_network_type('0854004004'));
	
	console.log(convert_11_to_10('01686519125'));
	console.log(convert_11_to_10('01254004004'));
	
	console.log(convert_10_to_11('0386519125'));
	console.log(convert_10_to_11('0854004004'));
}

test();

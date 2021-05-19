// =================================================================
// CAC HAM CHUAN HOA
// =================================================================

/**
 * Loại bỏ các dấu cách (kể cả ở giữa xâu).
 */
function removeSpaces(value) {
	return value.replace(/\s*/, '');
}

/**
 * Chuẩn hóa số điện thoại: loại bỏ các ký tự không phải là số.
 * @param item DOM
 */
function normalizePhoneNumber(item) {
	var value = item.val();
	if (value) {
		value = value.replace(/[^0-9]/, '');
		item.val(value);
	}
}

/**
 * Chuẩn hóa một đối tượng input của form.
 * @param item DOM
 */
function normalizeInputField(item) {
	var value = item.val();
	value = value.trim();

	// TODO: Nếu là định dạng điện thoại thì xóa dấu cách

	// TODO: Nếu là định dạng thời gian thì chuyển về định dạng chuẩn

	item.val(value);
}

//=========================================================================
// LEVEL 2 FUNCTIONS: Tap hop cua cac ham level 1 theo loai
// Các hàm có 2 tham số là:
// item: Đối tượng jQuery tương ứng với một phần tử input, textarea, select,... nào đó
// value: Giá trị của đối tượng item
//=========================================================================

/**
 * Kiểm tra định dạng ngày.
 * Các định dạng ngày hợp lệ là:
 * mm/dd/yyyy or mm-dd-yyyy or mm.dd.yyyy
 */
function validateDate(value) {
	var regExp = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/

	// Check to see if in correct format
	if (!regExp.test(value))
		// Doesn't match pattern, bad date
		return false;
	else {
		var strSeparator = value.substring(2, 3);
		// TODO: Split theo biểu thức chính quy
		var arrayDate = value.split(strSeparator);
		//create a lookup for months not equal to Feb.
		var arrayLookup = {
			'01': 31, '03': 31,
			'04': 30, '05': 31,
			'06': 30, '07': 31,
			'08': 31, '09': 30,
			'10': 31, '11': 30, '12': 31
		}
		var intDay = parseInt(arrayDate[1], 10);

		//check if month value and day value agree
		if (arrayLookup[arrayDate[0]] != null) {
			if (intDay <= arrayLookup[arrayDate[0]] && intDay != 0)
				return true; //found in lookup table, good date
		}

		//check for February (bugfix 20050322)
		//bugfix  for parseInt kevin
		//bugfix  biss year  O.Jp Voutat
		var intMonth = parseInt(arrayDate[0], 10);
		if (intMonth == 2) {
			var intYear = parseInt(arrayDate[2]);
			if (intDay > 0 && intDay < 29) {
				return true;
			} else if (intDay == 29) {
				if ((intYear % 4 == 0) && (intYear % 100 != 0) ||
					(intYear % 400 == 0)) {
					// year div by 4 and ((not div by 100) or div by 400) ->ok
					return true;
				}
			}
		}
	}

	// Any other values, bad date
	return false;
}

function validateType(item, value) {
	if (!value) {
		return '';
	}

	var type = item.attr('data-type');

	if (type === 'email') {
		var regExp = /(^[a-z]([a-z_\.]*)@([a-z_\.]*)([.][a-z]{3})$)|(^[a-z]([a-z_\.]*)@([a-z_\.]*)(\.[a-z]{3})(\.[a-z]{2})*$)/i;
		if (!regExp.test(value)) {
			return tranlateErrorMessage('Invalid email');
		}
	}

	if (type === 'phone') {


		// Tu 10 den 12 ky tu
		const minLength = 10;
		const maxLength = 12;
		if (value.length < minLength || value.length > maxLength) {
			return 'So dien thoai co do dai tu {0} den {1} ky tu. So ky tu ban nhap vao la {2}'.format(minLength, maxLength, value.length);
		}

		var regExp = /^\([1-9]\d{2}\)\s?\d{3}\-\d{4}$/;
		if (!regExp.test(value)) {
			return tranlateErrorMessage('Invalid phone number');
		}


	}

	if (type === 'integer') {
		var regExp = /(^-?\d\d*$)/;
		if (!regExp.test(value)) {
			return tranlateErrorMessage('Invalid integer');
		}
	}

	if (type === 'number') {
		// Regular Expression: /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/;
		if (isNaN(value)) {
			return tranlateErrorMessage('Not a number');
		}
	}

	// Ten mien, CMT, date, time,...

	return '';
}

function validateRange(item, value) {
	if (!value) {
		return '';
	}

	var minValue = item.attr('data-min');
	if (minValue) {
		if (parseFloat(minValue) > parseFloat(value)) {
			return tranlateErrorMessage("Min value is {0}").format(minValue);
		}
	}

	var maxValue = item.attr('data-max');
	if (maxValue) {
		if (parseFloat(maxValue) < parseFloat(value)) {
			return tranlateErrorMessage("Max value is {0}").format(minValue);
		}
	}

	var lessThan = item.attr('data-less');
	var greaterThan = item.attr('data-greater');
	var before = item.attr('data-before');
	var after = item.attr('data-after');

	return '';
}

function validateLength(item, value) {
	var min = item.attr('data-min-length');
	if (min) {
		if (value.length < parseInt(min)) {
			return tranlateErrorMessage("You must fill at least {0} characters").format(min);
		}
	}

	var max = item.attr('data-max-length');
	if (max) {
		if (value.length > parseInt(max)) {
			return tranlateErrorMessage("You must fill at most ${0} characters").format(max);
		}
	}

	return '';
}

function validateRequired(item, value) {
	var required = item.attr('data-required');
	//console.log(item.attr('id') + ': ' + required);

	if (required === 'false') {
		return '';
	}

	if (!required) {
		required = item[0].hasAttribute("required");
	}

	if (required) {
		if (!value) {
			var msg = item.attr('data-required-message') ||  "Please enter this field";
			return tranlateErrorMessage(msg);
		}
	}

	return '';
}

function validatePattern(item, value) {
	var reg = item.attr('data-pattern');
	if (reg) {
		if (value && !new RegExp(reg).test(value)) {
			return tranlateErrorMessage(item.attr('data-pattern-error-message'));
		}
	}

	return '';
}

/**
 * TODO: Don't use this, use "Show password" instead.
 * @param {*} item 
 * @param {*} value 
 */
function validateMatch(item, value) {
	var match = item.attr('data-match');
	if (match) {
		if (value != $(match).val()) {
			return tranlateErrorMessage(item.attr('data-match-error-message'));
		}
	}

	return '';
}

function validateIdNumber(value) {
	if (!value) {
		return '';
	}

	const length1 = 9;
	const length2 = 12;
	if (value.length != length1 && value.length != length2) {
		return tranlateErrorMessage('ID number has only {0} or {1} characters. Your input has {2} characters.').format(length1, length2, value.length);
	}

	if (!/^[a-zA-Z\d]+$/.test(value)) {
		return tranlateErrorMessage('ID number has only numbers or alphabet characters');
	}

	if (!/\d+/.test(value)) {
		return tranlateErrorMessage('Please enter ID number that has number too');
	}

	return '';
}

/*
If you want to validate against a string containing only numbers, the expression is:
^-{0,1}\d*\.{0,1}\d+$
	
^			== beginning of line
-{0, 1}		== 0 or 1 minus signs
\d*			== 0 or more digits
\.{0, 1}	== 0 or 1 decimal points
\d+			== 1 or more digits
$			== end of line
*/
function checkIsNumber(text) {
	var numberRegExp = /^-{0,1}\d*\.{0,1}\d+$/g;
	if (!numberRegExp.test(text)) {
		alert("Error");
		document.getElementById("myText").focus();
	}
}

function validatePassword(value) {
	// It nhat 8 ky tu
	// Khong duoc bat theo type='password' vi co the luc nguoi dung dang nhap
}

// =======================================================================
// LEVEL 3 FUNCTIONS
// 
// =======================================================================
/**
 * Validate một đối tượng riêng lẻ.
 * @param {*} item 
 */
function validateField(item) {
	if (item.is(":hidden")) {
		//console.log(item.attr("id"));
		return "";
	}
	
	var value = item.val();

	// Password không được chứa dấu cách, ít nhất 8 ký tự
	// 

	return validateRequired(item, value) ||
		validatePattern(item, value) ||
		validateMatch(item, value) ||
		validateLength(item, value) ||
		validateType(item, value) ||
		validateRange(item, value) ||
		'';
}

/**
 * Hiển thị thông báo lỗi.
 * @param item jQuery object
 * @param errorMessage Thông báo lỗi
 */
function showError(item, errorMessage) {
	item.addClass('has-error');
	var p = item.closest('.validate-container');
	p.append('<span class="error-message">' + errorMessage + '</span>');
}

// =======================================================================
// LEVEL 4 FUNCTIONS
// Validate cả form
// =======================================================================
/**
 * Xóa các thông báo lỗi.
 * @param formId Form ID, có thể nhập hoặc không
 */
function clearErrorMessages(formId) {
	var prefix = formId ? (formId + ' ') : '';
	$(prefix + '.validate-container .error-message').remove();

}

/**
 * Kiểm tra xem form có dữ liệu hợp lệ không.
 * @param id Form ID
 * @return true nếu form KHÔNG hợp lệ
 */
function invalidForm(id) {
	clearErrorMessages(id);

	var flag = false;
	var firstField = null;
	var inputs = $(id + ' input, ' + id + ' textarea, ' + id + ' select');

	for (var i = 0; i < inputs.length; i++) {
		var item = $(inputs[i]);

		normalizeInputField(item);

		var errorMessage = validateField(item);
		if (errorMessage != '') {
			showError(item, errorMessage);
			flag = true;
			if (firstField == null) {
				firstField = item;
			}
		}
	}

	if (flag) {
		//alert("Oops! There something wrong with your input.");
	}

	// Focus và scroll đến phần tử lỗi đầu tiên
	if (firstField != null) {
		firstField.focus();
		firstField.select();
	}

	return flag;
}



// ======================================================================
// CAC HAM MO RONG
// ======================================================================

/**
 * Hàm tiện ích dịch message lỗi.
 * Nếu muốn đa ngôn ngữ (ví dụ với jQuery lang) thì hãy ghi đè hàm này.
 * @param msg Message lỗi
 */
function tranlateErrorMessage(msg) {
	return msg;
}

/**
 * String format
 */
if (!String.prototype.format) {
	String.prototype.format = function () {
		var args = arguments;

		return this.replace(/{(\d+)}/g, function (match, number) {
			return (typeof args[number] != 'undefined') ? args[number] : match;
		});
	};
}

// Khi người dùng đánh vào hoặc sửa phần tử bị lỗi thì xóa thông báo lỗi của phần tử đó
$(document).on('input', '.has-error', function () {
	$(this).removeClass('has-error');
	var p = $(this).closest('.validate-container');
	p.find('.error-message').remove();
});

// Khi click vào thông báo lỗi thì xóa nó	
$(document).on('click', '.error-message', function () {
	$(this).fadeOut('fast', function () {
		$(this).remove();
	});
});

// jQuery plugin
$.fn.invalidForm = function () {
	//console.log('id: ' + this.attr('id'));
	return invalidForm('#' + this.attr('id'));
};

// TODO: Ca ham showError nua

/*
	return {
		validateField: validateField,
		showError: showError,
		clearErrorMessages: clearErrorMessages,
		invalidForm: invalidForm
	};*/
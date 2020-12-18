function demo() {
	const formatNumberDemoBody = document.querySelector('#formatNumberDemo tbody');
	const numbers = [1, 123, 1234, 12345, 12345.67];
	numbers.forEach(n => {
		const tr = document.createElement('tr');
		tr.innerHTML = `
				<td class="text-right">
					${n}
				</td>
				<td class="text-right">
					${format1(n)}
				</td>
				<td class="text-right">
					${format2(n)}
				</td>
				<td class="text-right">
					${format3(n, 'RUB')}
				</td>
				<td class="text-right">
					${format4(n)}
				</td>
				<td class="text-right">
					${format5(n)}
				</td>`;
		formatNumberDemoBody.appendChild(tr);
	});
}

// demo();

// keyup có vẻ bị giật
// keypress không bắt được sự kiện paste
// input bắt được sự kiện paste

const theInput = document.getElementById('amount');

// Cho phép nhập số thực
theInput.addEventListener('input', (evt) => {
	// Lấy giá trị hiện tại
	let value = theInput.value;
	const cursor = theInput.selectionEnd;

	// Loại bỏ các kí tự không phải là số, dấu trừ (số âm), dấu chấm
	// Dấu trừ chỉ được một lần, ở đầu tiên
	// Dấu chấm chỉ được một lần (lấy lần đầu tiên)
	// input = input.replace(/[\D\s\._\-]+/g, '');
	value = value.replace(/[^\d\-\.]+/g, '');
	

	if (value.length > 0) {
		// TODO: Validate giá trị số
		// Nếu không trả về NaN
		const maskedValue = separateThousands(parseFloat(value, 10));

		// TODO:
		// Giữ con trỏ ở vị trí đang sửa
		theInput.value = maskedValue;
		theInput.selectionStart = cursor;
		theInput.selectionEnd = cursor;
	}
});

/**
 * When Form Submitted.
 */
$('#form').on('submit', function (event) {
	var $this = $(this);
	var arr = $this.serializeArray();
	for (var i = 0; i < arr.length; i++) {
		// Loại bỏ các ký tự: dấu phảy
		arr[i].value = arr[i].value.replace(/[($)\,\s\._\-]+/g, '');
	}
	console.log(arr);
	event.preventDefault();
});

theInput.value = '123456';



Inputmask({
	alias: 'decimal', // email, currency, decimal, integer, date, datetime, dd/mm/yyyy, ip,...
	autoUnmask: true,
	allowMinus: true,
	allowPlus: false,
	// rightAlign: false,
	// removeMaskOnSubmit: true,
	showMaskOnHover: false,
	placeholder: '',
	groupSeparator: ',',
	radixPoint: '.'
})
.mask('.numeral');

/*
Inputmask({
                // email, currency, decimal, integer, date, datetime, dd/mm/yyyy, ip,...
                alias: this.isInteger ? 'integer' : 'decimal',
                autoUnmask: true,
                allowMinus: true,
                allowPlus: false,
                // rightAlign: false,
                // removeMaskOnSubmit: true,
                showMaskOnHover: false,
                placeholder: '',
                radixPoint: '.',
                groupSeparator: ',',
                // TODO: Sự kiện input đang không được gọi khi paste, khi xóa dấu âm ở đầu
                // dẫn đến không thể kết hợp với thư viện Common Validation
                // https://github.com/RobinHerbots/Inputmask/issues/2346
                // https://github.com/RobinHerbots/Inputmask/issues/2347
                // inputEventOnly: true
            })
                .mask(this.$refs.theInput);
*/

function getNumberValue() {
	const numberInput = document.querySelector('#numberInput');
	alert(numberInput.value);
}

function setNumberValue() {
	const numberInput = document.querySelector('#numberInput');
	numberInput.value = 1234567.890;
}




// Formatter needs refactoring. Not sure I love its mutable nature :P
// In general, its API probably needs to change, but it's a good
// start point
class Formatter {
  constructor(value, cursor) {
	  console.log(value, cursor);
    this.value = value;
    this.cursor = cursor;
  }
  
  transform(transformer) {
    const leftVal = this.value.slice(0, this.cursor);
    const leftTrn = transformer(leftVal);
    const delta = leftTrn.length - leftVal.length;
    this.value = transformer(this.value);
    this.cursor += delta;
    return this;
  }
  
  mask(pattern, wildcard = '_') {
    const v = this.value.split(''); // Unmasked value
    const p = pattern.split(''); // The mask i.e. (___) ___
    let delta = 0, pi = 0;
    for (let vi = 0, plen = p.length, vlen = v.length; pi < plen && vi < vlen; pi++){
      if (p[pi] === wildcard) p[pi] = v[vi++];
      else if (vi < this.cursor) delta++;
    }
    this.value = p.slice(0, pi).join('');
    this.cursor += delta;
    return this;
  }
}



class FormatedInput {
  constructor(input, formatter) {
    this.input = input;
    this.formatter = formatter;
    this.addListeners();
  }
  
  addListeners() {
    this.input.addEventListener('input', (e) => {
      const value = this.input.value;
      const cursor = this.input.selectionEnd;
      const formatted = this.formatter(value, cursor);
	  
	  console.log(cursor, formatted.cursor);
	  
      this.setValue(formatted.value, formatted.cursor);
    });
  }
  
  setValue(value, cursor) {
    this.input.value = value;
    this.input.selectionStart = cursor;
    this.input.selectionEnd = cursor;
  }
}




const onlyNumbers = (value) => value.replace(/[^\d]/g, '');


const moneyDynamicMask = (number) => {
  const len = number.length;
  const commas = Math.ceil(len / 3) - 1;
  const thousandsMask = ''
    .padStart(number.length + commas, "___,")
    .split('').reverse().join('')
  ;
  return thousandsMask;
}


const moneyFormatter = (value, cursor) => {
  const formatter = new Formatter(value, cursor);
  formatter.transform(onlyNumbers);
  formatter.mask(moneyDynamicMask(formatter.value));
  return formatter;
};


const money = new FormatedInput(
  document.getElementById('field-money'),
  moneyFormatter
);

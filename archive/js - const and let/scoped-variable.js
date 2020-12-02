"use strict"

function demo1() {
	for (var i = 0; i < 10; i++) {
		//console.log(i);
	}
	
	// Vẫn hiển thị ra là 10
	console.log(i);
}

function demo2() {
	for (let i = 0; i < 10; i++) {
		//console.log(i);
	}
	
	// Đầu tiên báo lỗi
	// SyntaxError: Block-scoped declarations (let, const, function, class) not yet supported outside strict mode
	// Cần thêm "use strict"

	// Tiếp theo báo lỗi
	// ReferenceError: i is not defined
	console.log(i);
}

demo1();
//demo2();

function calculateTotalAmount1(vip) {
	var amount = 0;
	if (vip) {
		var amount = 1;
	}

	// more crazy blocks!
	{
		var amount = 100;
		{
			var amount = 1000;
		}
	}
  return amount;
}

function calculateTotalAmount2(vip) {
	// probably should also be let, but you can mix var and let
	var amount = 0;
	if (vip) {
		// first amount is still 0
		let amount = 1;
	}
	// more crazy blocks!
	{
		// first amount is still 0
		let amount = 100;
		{
			// first amount is still 0
			let amount = 1000;
		}
	}
	return amount;
}

// Han che loi nua
console.log(calculateTotalAmount1(true));
console.log(calculateTotalAmount2(true));





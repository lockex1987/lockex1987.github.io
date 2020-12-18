/** 
 * Bản update ES6 JavaScript đã giới thiệu arrow function - 1 cách khác để khai báo và sử dụng hàm trong JavaScript. Arrow function mang đến những lợi ích như

    Ngắn gọn, súc tích hơn
    this có thể được lấy từ ngữ cảnh bao quanh
    return ngầm (implicit return)

 */
function cach1(param1, param2) {
	console.log("Chào " + param1 + ", bạn thật " + param2);
}

var cach2 = function(param1, param2) {

}

var cach3 = (param1, param2) => {
	console.log("Chào " + param1 + ", bạn thật " + param2);
};

// Các cách là như nhau
// Thậm chí có khi cách 1 dễ dàng hơn vì quen thuộc hơn
cach1("My", "đẹp trai hihi");
cach3("My", "đẹp trai hihi");

var a = [
	1,
	2,
	3,
	4,
	5
];

// Viết thế này dễ nhìn hơn
a.forEach(e => console.log(e));


// Đây là tính năng mà tôi mong chờ nhất.
// Tôi thích CoffeeScript vì fat arrows.
// Hiện nay chúng có trong ES6.
// Fat arrow tuyệt vời bởi vì chúng tạo ra hành vi của thuộc tính this.
// Ví dụ this sẽ có cùng giá trị với bối cảnh (context) của hàm - nó không bị thay đổi.
// Thay đổi thường xảy ra mỗi lần bạn tạo một closure.
// Sử dụng arrow function trong ES6 cho phép chúng ta
// không cần sử dụng that = this hoặc self = this hoặc _this = this hoặc .bind(this).
// Ví dụ đây là một đoạn code trong ES5:
var logUpperCase = function() {
	var _this = this;
	this.string = this.string.toUpperCase();
	return function() {
		return console.log(_this.string);
	}
}

logUpperCase.call({ string: 'es6 rocks' })();

var logUpperCaseEs6 = function() {
	this.string = this.string.toUpperCase();
	return () => console.log(this.string);
}

logUpperCaseEs6.call({ string: 'es6 rocks' })();

function myFunc() {
	this.myVar = 0;

  setTimeout(() => {
    this.myVar++;
    console.log(this.myVar) // 1
  }, 0);
}

function myFunc2() {
  this.myVar = 0;
  var that = this; // that = this trick
  setTimeout(
    function() { // 1 this mới được tạo ra trong phạm vi hàm này
      that.myVar++;
      console.log(that.myVar) // 1

      console.log(this.myVar) // undefined - xem lại khai báo hàm ở phía trên
    },
    0
  );
}


//myFunc();
myFunc2();
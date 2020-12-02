// Khởi tạo mảng
var date = [15, 4, 2018];

// Chuyển ba giá trị vào 3 biến d, m, y
// Node ban 4.1.1 khong ho tro
var [d, m, y] = date;

// Chi lay 1 phan tu thoi
var [, , y1] = date;

// Doi tuong
var dateObj = {
	day: 15,
	month: 4,
	year: 2018
};

var { day: d2, month: m2, year: y2 } = dateObj;

// Viet the nay thi gon
var { day, month, year } = dateObj;

console.log("Day: " + d);
console.log("Month: " + m);
console.log("Year: " + y);
console.log("Year: " + y1);

console.log("Day: " + d2);
console.log("Month: " + m2);
console.log("Year: " + y2);

console.log("Day: " + day);
console.log("Month: " + month);
console.log("Year: " + year);

// Kho doc hon
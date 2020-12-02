function demo() {
	return 1
		+ 2;
}

function demo2() {
	return
	2;
}

function demo3() {
	return
	{};
}

function demo4() {
	return {
	};
}

function demo5() {
	const isValid = false;
	return isValid
		? 5
		: 3;
}

function demo6() {
	
}

console.log(demo());
console.log(demo2());
console.log(demo3());
console.log(demo4());
console.log(demo5());
console.log(demo6());

// Returns MUST begin the return block in the same line:
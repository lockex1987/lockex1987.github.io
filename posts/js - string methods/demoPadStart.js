function demoPadStart() {
	const str1 = '5';
	console.log(str1.padStart(2, '0')); // expected output: "05"

	const fullNumber = '2034399002125581';
	const last4Digits = fullNumber.slice(-4);
	const maskedNumber = last4Digits.padStart(fullNumber.length, '*');
	console.log(maskedNumber); // expected output: "************5581"

	console.log('abc'.padStart(10));         // "       abc"
	console.log('abc'.padStart(10, "foo"));  // "foofoofabc"
	console.log('abc'.padStart(6,"123465")); // "123abc"
	console.log('abc'.padStart(8, "0"));     // "00000abc"
	console.log('abc'.padStart(1));          // "abc"
}

demoPadStart();

// Javascript version of: (unsigned)
//  printf "%0*d" width num
function leftFillNum(num, targetLength) {
    return num.toString().padStart(targetLength, 0);
}

console.log(leftFillNum(123, 5)); // expected output: "00123"
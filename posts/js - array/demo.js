function demoArrayIsObject() {
	var arr = [1, 2, 3, 4, 5];

	arr.prop = 'value';

	console.log(arr.length);
	console.log(arr.prop);
	console.log(arr);

	// Không thể khai báo như sau được
	//var a2 = [0, 1, 2, index: 100];
	//console.log(a2);	
}

//demoArrayIsObject();

function demoFilter() {
	let arr = [1, 2, 3, 4, 5, 6];
	let even1 = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] % 2 === 0) {
			even1.push(arr[i]);
		}
	}
	console.log(even1);

	let even2 = arr.filter(item => {
		return item % 2 === 0;
	});
	
	console.log(even2);

	let even3 = arr.filter(e => e % 2 === 0);
	console.log(even3);
}

//demoFilter();

function demoFind1() {
	var array1 = [5, 12, 8, 130, 44];
	var found = array1.find(function (element) {
		return element > 10;
	});
	console.log(found); // expected output: 12
}

function demoFind2() {
	const inventory = [
		{ name: 'apples', quantity: 2 },
		{ name: 'bananas', quantity: 0 },
		{ name: 'cherries', quantity: 5 }
	];
	const result = inventory.find(e => e.name === 'cherries');
	console.log(result); // { name: 'cherries', quantity: 5 }
}

//demoFind1();
//demoFind2();

function demoMap() {
	let arr = [1, 2, 3, 4];
	let plus5 = arr.map((val, i, arr) => {
		return {
			value: val + 5,
			index: i
		};
	});
	console.log(plus5);
}

demoMap();
class Foo {

    // ES2019 class fields
    #b = 15;
    a = 10;

    get() {
        return this.#b;
    }

    increment() {
        this.#b++;
    }
	
	// #bar() { console.log('Private method'); }
	
	/*
	#privateMethod() {
		return 'Hello world';
	}

	getPrivateMessage() {
		return this.#privateMethod();
	}
	*/
}

const obj = new Foo();

console.log(obj['#b']); // undefined
console.log(obj.hasOwnProperty('#b')); // false
console.log(obj.get());
obj.increment();
console.log(obj.get());

console.log(obj.a);
obj.a = 20;
console.log(obj.a);

// console.log(obj.getPrivateMessage());

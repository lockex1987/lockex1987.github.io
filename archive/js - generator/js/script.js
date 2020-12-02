function* gen() { 
  yield 1;
  yield 2;
  yield 3;
}

var g1 = gen(); // "Generator { }"
console.log(g1);


function* idMaker() {
    var index = 0;
    while(true)
        yield index++;
}

var gen2 = idMaker(); // "Generator { }"

console.log(gen2.next().value); // 0
console.log(gen2.next().value); // 1
console.log(gen2.next().value); // 2
// ...



function* generator(i) {
  yield i;
  yield i + 10;
}

const gen3 = generator(10);

console.log(gen3.next().value);
// expected output: 10

console.log(gen3.next().value);
// expected output: 20


console.log(gen3.next());
console.log(gen3.next());


function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generatorX(i) {
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen4 = generatorX(10);

console.log(gen4.next().value); // 10
console.log(gen4.next().value); // 11
console.log(gen4.next().value); // 12
console.log(gen4.next().value); // 13
console.log(gen4.next().value); // 20




function* logGenerator() {
  console.log(0);
  console.log(1, yield);
  console.log(2, yield);
  console.log(3, yield);
}

var gen5 = logGenerator();

// the first call of next executes from the start of the function
// until the first yield statement
gen5.next();             // 0
gen5.next('pretzel');    // 1 pretzel
gen5.next('california'); // 2 california
gen5.next('mayonnaise'); // 3 mayonnaise



function* yieldAndReturn() {
  yield "Y";
  return "R";
  yield "unreachable";
}

var gen6 = yieldAndReturn()
console.log(gen6.next()); // { value: "Y", done: false }
console.log(gen6.next()); // { value: "R", done: true }
console.log(gen6.next()); // { value: undefined, done: true }



const someObj = {
  *generator () {
    yield 'a';
    yield 'b';
  }
}

const gen7 = someObj.generator()

console.log(gen7.next()); // { value: 'a', done: false }
console.log(gen7.next()); // { value: 'b', done: false }
console.log(gen7.next()); // { value: undefined, done: true }




class Foo {
  *generator () {
    yield 1;
    yield 2;
    yield 3;
  }
}

const f = new Foo ();
const gen8 = f.generator();

console.log(gen8.next()); // { value: 1, done: false }
console.log(gen8.next()); // { value: 2, done: false }
console.log(gen8.next()); // { value: 3, done: false }
console.log(gen8.next()); // { value: undefined, done: true }


class FooX {
  *[Symbol.iterator] () {
    yield 1;
    yield 2;
  }
}

const SomeObj = {
  *[Symbol.iterator] () {
    yield 'a';
    yield 'b';
  }
}

console.log(Array.from(new FooX)); // [ 1, 2 ]
console.log(Array.from(SomeObj)); // [ 'a', 'b' ]


const foo = function* () {
  yield 10;
  yield 20;
};

const bar = foo();
console.log(bar.next()); // {value: 10, done: false}















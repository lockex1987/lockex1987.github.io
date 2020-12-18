var text = 'The best things in life are free!'; 
console.log(/e/.test(text)); // true


const str1 = "the cat says meow";
const str2 = "the dog says bark";
const hasCat = /cat/;
console.log(hasCat.test(str1)); // true
console.log(hasCat.test(str2)); // false

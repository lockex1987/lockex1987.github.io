// Hướng dẫn đầy đủ về hàm replace:
// https://lockex1987.github.io/posts/js%20-%20replace%20function/

// Replace "Microsoft" with "W3Schools" in the paragraph below

var str = 'Please visit Microsoft!';
var txt = str.replace('Microsoft', 'W3Schools');
console.log(txt);


var str = 'Please visit Microsoft!';
var txt = str.replace(/microsoft/i, 'W3Schools');
console.log(txt);


// Using the g flag is the only way to replace multiple occurrences in a string in vanilla JavaScript
console.log('My dog is a good dog!'.replace(/dog/g, 'cat')); // "My cat is a good cat!"


function removeCc(str) {
    return str.replace(/([A-Z])/g, ' $1');  
}

function lowerCase(str) {
    return str.replace(/[A-Z]/g, u => u.toLowerCase());
}

function capitalize(str) {
    return str.replace(/^[a-z]/, u => u.toUpperCase());
}

var s = capitalize(lowerCase(removeCc('camelCaseIsFun')));
console.log(s); // "Camel case is fun"


var str = `Liskov, Barbara
McCarthy, John
Wadler, Philip`;

console.log(str.replace(/(\w+), (\w+)/g, '$2 $1'));
//   Barbara Liskov
//   John McCarthy
//   Philip Wadler
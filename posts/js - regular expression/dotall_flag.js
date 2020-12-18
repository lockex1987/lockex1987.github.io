/**
Ký tự . không phải khớp tất cả các ký tự, nó sẽ bỏ qua ký tự xuống dòng, dòng mới.
Thêm flag s để cho phép . khớp với cả các ký tự xuống dòng, dòng mới.
*/
//let regex = /a.b/;
let regex = /a.b/s;

console.log(regex.test('a\nb'));
console.log(regex.test('a\rb'));
console.log(regex.test('a\u2028b'));
console.log(regex.test('a\u2029b'));

let str = `
    <b>XXX</b>

    <!--
        Day la comment o HTML
    -->

    <i>YYY</i>
    `;

let regex1 = /<!--(.*)-->/;
//let regex1 = /<!--(.*)-->/s;
console.log(str.replace(regex1, ''));

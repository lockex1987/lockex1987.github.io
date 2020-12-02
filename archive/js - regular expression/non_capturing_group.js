let regex = /(Jane|John|Alison)\s(.*?)\s(Smith|Smuth)/;
let str = 'Jane Isabell Smith';
let arr = regex.exec(str);
console.log(arr[0]); // 'Jane Isabell Smith'
console.log(arr[1]); // 'Jane'
console.log(arr[2]); // 'Isabell'
console.log(arr[3]); // 'Smith'


// Nếu chỉ lấy middle name
let regex1 = /(?:Jane|John|Alison)\s(.*?)\s(?:Smith|Smuth)/;
let arr1 = regex1.exec('Jane Isabell Smith');
console.log(arr1[0]); // 'Jane Isabell Smith'
console.log(arr1[1]); // 'Isabell'

const str = '2017-01-25';
const regex1 = /(\d{4})-(\d{2})-(\d{2})/u;
const arr1 = regex1.exec(str);
// → arr1[0] === '2017-01-25'
// → arr1[1] === '2017'
// → arr1[2] === '01'
// → arr1[3] === '25'

const regex2 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
const arr2 = regex2.exec(str);
// → arr2.groups.year === '2017'
// → arr2.groups.month === '01'
// → arr2.groups.day === '25'

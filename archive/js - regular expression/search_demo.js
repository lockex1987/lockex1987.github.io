var str = 'Visit W3Schools!'; 
var idx = str.search('w3Schools');
console.log(idx); // -1, không tìm thấy do ký tự W ở xâu ban đầu được viết hoa


idx = str.search(/w3schools/i);
console.log(idx); // 6, tìm thấy do tìm kiếm không phân biệt hoa thường


idx = str.search(/xxx/i);
console.log(idx); // -1, không tìm thấy

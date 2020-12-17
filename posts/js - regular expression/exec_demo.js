function simple1() {
    // Match "quick brown" followed by "jumps", ignoring characters in between
    // Remember "brown" and "jumps"
    // Ignore case
    // Hãy thử thêm và bỏ modifier g sẽ thấy lastIndex thay đổi
    var str = 'The Quick Brown Fox Jumps Over The Lazy Dog';
    var regex = /quick\s(brown).+?(jumps)/ig;
    var arr = regex.exec(str);
    console.log(arr);
    console.log(regex);
    console.log(`
        lastIndex: ${regex.lastIndex}
        ignoreCase: ${regex.ignoreCase}
        global: ${regex.global}
        multiline: ${regex.multiline}
        source: ${regex.source}`);
}

//simple1();


function simple2() {
    // Tìm kiếm xâu "hello", rồi đến một dấu cách, rồi đến các ký tự không phải khoảng trắng
    var arr = /(hello \S+)/.exec('This is a hello world !');

    // This will log a message containing 'hello world'.
    console.log(arr[1]);
}

//simple2();


function successiveMatches() {
    var regex = /ab*/g;
    var str = 'abbcdefabh';
    var arr;

    while ((arr = regex.exec(str)) !== null) {
        console.log('Found ' + arr[0] + '. Next match starts at ' + regex.lastIndex);
    }

    // This script displays the following text:
    // Found abb. Next match starts at 3
    // Found ab. Next match starts at 9

    // Thuộc tính lastIndex không tự reset nên đoạn code sau sẽ không in ra gì nữa
    // Thực ra nó vẫn in ra như trên vì ở vòng lặp trên, sau khi kết thúc vòng lặp thì lastIndex bị quay trở về 0 (ở lần thực hiện cuối mà trả về null)
    // Thử sửa nó xem sao
    // Nếu thiết lập lastIndex bằng 4 thì sẽ không tìm thấy kết quả thứ nhất nữa
    // regex.lastIndex = 4;
    regex = /ab*/; // bỏ g đi thì sẽ lặp vô hạn
    while ((arr = regex.exec(str)) !== null) {
        console.log('Found ' + arr[0] + '. Next match starts at ' + regex.lastIndex);
    }
}

//successiveMatches();


function successiveMatches2() {
    // Bắt đầu bằng "fo", sau đó là 0 hoặc nhiều chữ "o"
    var regex = RegExp('foo*', 'g');
    var str = 'table football, fooosball';
    var arr;

    while ((arr = regex.exec(str)) !== null) {
        console.log(`Found ${arr[0]}. Next starts at ${regex.lastIndex}.`);
    }

    // Expected output:
    // "Found foo. Next starts at 9."
    // "Found fooo. Next starts at 20."
}

//successiveMatches2();


function execVsMatch() {
    var str = "[22].[44].[33].";
    
    console.log(str.match(/\d+/));
    // [ '22', index: 1, input: '[22].[44].[33].' ]

    console.log(str.match(/\d+/g));
    // [ '22', '44', '33' ]

    var regex = /\d+/g;
    var arr;
    while (arr = regex.exec(str)) {
        console.log(arr);
    }
    // [ '22', index: 1, input: '[22].[44].[33].' ]
    // [ '44', index: 6, input: '[22].[44].[33].' ]
    // [ '33', index: 11, input: '[22].[44].[33].' ]
}

//execVsMatch();


/**
 * Thiếu flag g.
 */
function infiniteLoop1() {
    var str = "[22].[44].[33].";
    var regex = /\d+/;
    var arr;
    
    while (arr = regex.exec(str)) {
        console.log(arr, regex.lastIndex);
    }
}

//infiniteLoop1();

/**
 * Không dùng biến regex ở ngoài vòng lặp.
 */
function infiniteLoop2() {
    var str = "[22].[44].[33].";
    var arr;
    
    while (arr = /\d+/g.exec(str)) {
        console.log(arr);
    }
}

//infiniteLoop2();


/**
 * Trích xuất thông tin ngày tháng năm.
 * @param str Xâu dạng dd-mm-yyyy
 */
function getDate(str) {
    let regex = /(\d{1,2})-(\d{1,2})-(\d{4})/;
    let [_, month, day, year] = regex.exec(str);
    return new Date(year, month - 1, day);
}

//console.log(getDate("1-30-2003"));
// → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)


/**
 * Lấy thông tin giữa 2 dấu nháy.
 */
function getQuotedText() {
    let regex = /'([^']*)'/;
    let str = "she said 'hello'";
    let arr = regex.exec(str);
    console.log(arr);
    console.log(arr[1]);
    // → ["'hello'", "hello"]
}

//getQuotedText();


function captureGroupDemo() {
    // Không tìm thấy capture group
    console.log(/bad(ly)?/.exec("bad"));
    // → ["bad", undefined]


    // Chỉ trả về capture group cuối cùng
    console.log(/(\d)+/.exec("123"));
    // → ["123", "3"]
}

//captureGroupDemo();


function search() {
    var obj = /e/.exec("The best things in life are free!");
    console.log("Found " + obj[0] + " in position " + obj.index + " in the text: " + obj.input);
}

//search();

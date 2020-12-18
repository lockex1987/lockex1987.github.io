function demo1() {
    var str = 'The quick brown fox jumped over the lazy dog. It barked.';
    var regex = /[A-Z]/g;
    var arr = str.match(regex);
    console.log(arr);
    // expected output: Array ["T", "I"]
}

//demo1();


/**
 * In the following example, match() is used to find 'Chapter'
 * followed by 1 or more numeric characters
 * followed by a decimal point and numeric character 0 or more times.
 * The regular expression includes the i flag so that upper/lower case differences will be ignored.
 */
function demo2() {
    var str = 'For more information, see Chapter 3.4.5.1';
    var regex = /see (chapter \d+(\.\d)*)/i;
    var arr = str.match(regex);
    console.log(arr);

    // logs [ 'see Chapter 3.4.5.1',
    //        'Chapter 3.4.5.1',
    //        '.1',
    //        index: 22,
    //        input: 'For more information, see Chapter 3.4.5.1' ]

    // 'see Chapter 3.4.5.1' is the whole match.
    // 'Chapter 3.4.5.1' was captured by '(chapter \d+(\.\d)*)'.
    // '.1' was the last value captured by '(\.\d)'.
    // The 'index' property (22) is the zero-based index of the whole match.
    // The 'input' property is the original string that was parsed.
}

//demo2();


/**
 * The following example demonstrates the use of the global and ignore case flags with match().
 * All letters A through E and a through e are returned, each its own element in the array.
 */
function demo3() {
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var regexp = /[A-E]/gi;
    var arr = str.match(regexp);
    console.log(arr);
    // ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']
}

//demo3();

function demoVietnameseStart() {
    var str = 'Đọc truyện đêm khuya';
    var query = 'đọc';
    query = query.toLowerCase();

    // \b là ký tự backspace, do đó để hiển thị "\b" thì cần ghi là \\b
    // \\b (word boundary) chỉ tính các ký tự word là các ký tự ASCII, do đó sẽ lỗi khi gặp các ký tự tiếng Việt
    var regex1 = new RegExp('\\b' + query, 'gi');
    var regex2 = new RegExp('(?<=^|\\s)' + query, 'gi');
    console.log(str.match(regex1));
    console.log(str.match(regex2));
}

demoVietnameseStart();

function demoVietnameseEnd() {
    var str = 'Chiếc lá cuối cùng';
    var query = 'lá';
    query = query.toLowerCase();

    var regex1 = new RegExp('\\b' + query + '\\b', 'gi');
    var regex2 = new RegExp('(?<=^|\\s)' + query + '(?=$|\\s)', 'gi');
    console.log(str.match(regex1));
    console.log(str.match(regex2));
}

demoVietnameseEnd();

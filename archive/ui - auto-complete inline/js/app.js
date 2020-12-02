// Danh sách các gợi ý
var suggestions = [
    'albert@mail.com',
    'steve@mail.com',
    'beth@mail.com',
    'harry@mail.com',
    'barry@mail.com',
    'allen@mail.com',
    'susan@mail.com',
    'hal@mail.com'
];
suggestions.sort();

/**
 * Thêm autocomplete inline.
 * @param {Event} evt Đối tượng Event
 */
function autocomplete(evt) {
    // Đối tượng input hoặc textarea
    var obj = this;

    // Nếu không phải nhập ký tự thì bỏ qua
    var keyCode = evt.keyCode;
    if ((keyCode < 32)
            || (keyCode >= 33 && keyCode <= 46)
            || (keyCode >= 112 && keyCode <= 123)) {
        return;
    }

    // Lấy ra từ cuối cùng đang nhập
    var word = obj.value
                .split(/[;\s,]/)
                .pop()
                .replace(/^\s*/, '');

    // Nếu không có giá trị gì thì bỏ qua
    if (word.length == 0) {
        return;
    }

    // Tìm đến vị trí bắt đầu
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
    var selectionStart = obj.selectionStart;

    // Tìm từ gợi ý, thêm vào
    for (var i = 0; i < suggestions.length; i++) {
        var sug = suggestions[i].toString();
        if (sug.toLowerCase().indexOf(word.toLowerCase()) == 0) {
            obj.value += sug.substring(word.length, sug.length);
            break;
        }
    }

    // Tạo vùng bôi đen
    obj.setSelectionRange(selectionStart, obj.value.length);
}

document.querySelector('#emailToInput').addEventListener('keyup', autocomplete);
document.querySelector('#emailToTextarea').addEventListener('keyup', autocomplete);

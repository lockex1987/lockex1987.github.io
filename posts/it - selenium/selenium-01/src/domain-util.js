/**
 * Lấy thông tin domain từ URL.
 *
 * @param {String} url Thông tin URL đầy đủ
 * @return {String} Thông tin domain
 */
function cutOffDomain(url) {
    // Kích thước của protocol
    // Là 7 nếu http
    // Là 8 nếu https
    let sizeH;

    if (url.startsWith('https://')) {
        sizeH = 8;
    } else if (url.startsWith('http://')) {
        sizeH = 7;
    } else {
        // Không tìm thấy cả https và http thì không hợp lệ, trả về xâu rỗng
        return '';
    }

    // Cắt phần protocol ở đầu
    const result = url.substring(sizeH);

    // Cắt phần đuôi phía sau
    const end = result.indexOf('/');
    return result.substring(0, end);
}


function cutOffDomainTest() {
    console.log(cutOffDomain('http://thongtinnhansu.viettel.vn/TTNS/authenticateAction.do?_vt=92914df86017e592b50186142ecf10aa'));
    console.log(cutOffDomain('https://rocketchat.cyberspace.vn/group/httvsh-tester'));
    console.log(cutOffDomain('rocketchat.cyberspace.vn'));
}

// cutOffDomainTest();

exports.cutOffDomain = cutOffDomain;

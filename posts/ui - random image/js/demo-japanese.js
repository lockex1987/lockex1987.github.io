import IDOLS from '../data/japanese-models.js';

/**
 * Cảnh báo: Trang jjgirls.com là một trang web sex.
 * Trang này tổ chức ảnh rất là khoa học.
 * Các link ảnh đều có dạng: 'http://www.jjgirls.com/japanese/<idol>/<chapter>/<idol>-<page>.jpg'
 * <idol> viết thường, có dấu - ngăn cách giữa tên và họ (ví dụ sayaka-isoyama, asuka-kishi,...)
 * <chapter> bắt đầu từ 1
 * <page> sẽ từ 1 đến 12
 * Lấy ra ảnh ngẫu nhiên theo định dạng đó.
 * Chỉ lấy ảnh của gravure, không lấy ảnh adult.
 * Cho vào trong hàm thế này để không expose các hằng số IDOLS và BASE_URL (các hằng số đã được đóng gói).
 * Hàm getIdol thì vẫn chìa ra cho bên ngoài sử dụng.
 */

// Thêm HTTPS
const BASE_URL = 'https://www.jjgirls.com/japanese/';

function getIdol() {
    const idolObj = IDOLS[CommonUtils.getRandomIndex(IDOLS.length)];
    const idol = idolObj.name;
    const chapter = 1 + CommonUtils.getRandomIndex(idolObj.noOfChapter);
    const page = 1 + CommonUtils.getRandomIndex(12);
    const url = BASE_URL + idol + '/' + chapter + '/' + idol + '-' + page + '.jpg';
    return {
        name: idol.replace('-', ' ').toUpperCase(),
        image: url
    };
}

function updateIdol() {
    // console.log('Vao day');
    const idol = getIdol();
    document.querySelector('#theJapaneseImage').src = idol.image;
    document.querySelector('#idolName').textContent = idol.name;
}

function init() {
    // Không hiểu tại sao không chạy được ở điện thoại
    document.querySelector('#theJapaneseImage').onload = function () {
        // Có khi ảnh bị lỗi, khi đó nó sẽ hiển thị http://e.ugj.net/error.gif (redirect)
        // Ví dụ ảnh lỗi: http://www.jjgirls.com/japanese/nozomi-sasaki/21/nozomi-sasaki-3.jpg
        // Chúng ta bắt ảnh trường hợp này bằng cách kiểm tra kích thước của ảnh trả về  phải lớn hơn một ngưỡng nào đó
        // Không dùng AJAX được do bị lỗi CORS
        if (this.width < 300) {
            console.log('Redirect: ' + this.src + ', ' + this.width);
            updateIdol();
        }
    };

    updateIdol();
}

init();

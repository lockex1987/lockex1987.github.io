/**
 * Trả về một số nguyên ngẫu nhiên
 * @param n Số truyền vào
 * @return Số nguyên từ 0 đến n-1
 */
function getRandomIndex(n) {
    return Math.floor(Math.random() * n);
}

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
(function () {
    const IDOLS = [
        { name: 'yui-koike', noOfChapter: 17 },
        { name: 'hinako-sano', noOfChapter: 19 },
        { name: 'chocolat-ikeda', noOfChapter: 23 },
        { name: 'shoko-takasaki', noOfChapter: 29 },
        { name: 'mina-asakura', noOfChapter: 29 },
        { name: 'sayaka-isoyama', noOfChapter: 103 },
        { name: 'asuka-kishi', noOfChapter: 117 },
        { name: 'yuuri-morishita', noOfChapter: 85 },
        { name: 'anri-sugihara', noOfChapter: 278 },
        { name: 'mikie-hara', noOfChapter: 159 },
        { name: 'aya-kiguchi', noOfChapter: 122 },
        { name: 'shizuka-nakamura', noOfChapter: 153 },
        { name: 'yuko-ogura', noOfChapter: 85 },
        { name: 'nonami-takizawa', noOfChapter: 70 },
        { name: 'anna-konno', noOfChapter: 122 },
        { name: 'miwako-kakei', noOfChapter: 22 },
        { name: 'yumi-sugimoto', noOfChapter: 218 },
        { name: 'mai-hakase', noOfChapter: 22 },
        { name: 'nozomi-sasaki', noOfChapter: 57 },
        { name: 'risa-yoshiki', noOfChapter: 211 },
        { name: 'aki-hoshino', noOfChapter: 125 },
        { name: 'yoko-kumada', noOfChapter: 146 },
        { name: 'nana-ozaki', noOfChapter: 42 },
        { name: 'mai-nishida', noOfChapter: 160 },
        { name: 'ayaka-komatsu', noOfChapter: 89 },
        { name: 'yumi-kobayashi', noOfChapter: 22 },
        { name: 'gemma', noOfChapter: 63 },
        { name: 'sara-oshino', noOfChapter: 35 },
        { name: 'moemi-katayama', noOfChapter: 10 },
        { name: 'ren-ishikawa', noOfChapter: 8 },
        { name: 'fumika-baba', noOfChapter: 20 },
        { name: 'sayaka-tomaru', noOfChapter: 35 },
        { name: 'ikumi-hisamatsu', noOfChapter: 28 },
        { name: 'erina-mano', noOfChapter: 101 },
        { name: 'mizuki-hoshina', noOfChapter: 67 },
        { name: 'mai-shiraishi', noOfChapter: 13 }
    ];

    // Thêm HTTPS
    const BASE_URL = 'https://www.jjgirls.com/japanese/';

    window.getIdol = function () {
        var idolObj = IDOLS[getRandomIndex(IDOLS.length)];
        var idol = idolObj.name;
        var chapter = 1 + getRandomIndex(idolObj.noOfChapter);
        var page = 1 + getRandomIndex(12);
        var url = BASE_URL + idol + '/' + chapter + '/' + idol + '-' + page + '.jpg';
        return {
            name: idol.replace('-', ' ').toUpperCase(),
            image: url
        };
    }
})();

function updateIdol() {
    //console.log('Vao day');
    var idol = getIdol();
    document.querySelector('#theImage').src = idol.image;
    document.querySelector('#idolName span').textContent = idol.name;
}

function init() {
    // Không hiểu tại sao không chạy được ở điện thoại
    document.querySelector('#theImage').onload = function () {
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
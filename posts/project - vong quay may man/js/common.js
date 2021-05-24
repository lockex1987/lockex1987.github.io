// Online: https://wheelofnames.com/

/**
 * Tính ra số ngẫu nhiên trong khoảng từ min đến max (bao gồm cả min và max).
 * @param {Integer} min Giá trị nhỏ nhất
 * @param {Integer} max Giá trị lớn nhất
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Tạo hiệu ứng animate bằng thư viện animate.css.
 */
jQuery.fn.extend({
    animateCss: function (animationName) {
        const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this
            // Thêm class
            .addClass('animated ' + animationName)
            // Sau khi animate xong thì lại bỏ class
            .one(animationEnd, function () {
                jQuery(this).removeClass('animated ' + animationName);
            });
    }
});

/**
 * Hiển thị một màn hình nào đó.
 * @param {String} screenId ID của màn hình
 */
function showScreen(screenId) {
    $('.screen').hide();
    $(screenId).show();
}

/**
 * Thao tác với thông tin cấu hình từ localStorage.
 */
const Settings = (function () {
    // Tên lưu ở localStorage
    const localKeyName = 'settings';

    /**
     * Lấy thông tin.
     */
    function getData() {
        // Lấy từ localStorage
        let dataStr = localStorage.getItem(localKeyName);
        if (!dataStr) {
            dataStr = '{ "num_10": 0, "num_20": 0, "num_50": 0, "num_100": 0, "num_200": 0, "num_500": 0 }';
        }
        console.log(dataStr);
        const dataObj = JSON.parse(dataStr);

        // Chuyển xâu về số
        dataObj.num_500 = parseInt(dataObj.num_500);
        dataObj.num_200 = parseInt(dataObj.num_200);
        dataObj.num_100 = parseInt(dataObj.num_100);
        dataObj.num_50 = parseInt(dataObj.num_50);
        dataObj.num_20 = parseInt(dataObj.num_20);
        dataObj.num_10 = parseInt(dataObj.num_10);

        return dataObj;
    }

    /**
     * Cập nhật cấu hình.
     * @param {Object} obj Đối tượng chứa thông tin cấu hình
     */
    function updateData(obj) {
        localStorage.setItem(localKeyName, JSON.stringify(obj));
    }

    return {
        getData,
        updateData
    };
})();

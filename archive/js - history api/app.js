/**
 * Thực hiện gọi AJAX để lấy nội dung, không load toàn bộ.
 * @param {String} url Địa chỉ
 */
function getPage(url) {
    fetch(url + '?view_as=json')
        .then(resp => resp.json())
        .then(data => {
            // Đổi tiêu đề
            document.title = data.page;

            // Đổi nội dung
            document.getElementById('ajax-content').innerHTML = data.content;
        });
}

// Người dùng nhấn phím Back/Forward
window.addEventListener('popstate', function (evt) {
    // Lấy địa chỉ ở state
    var url = evt.state;

    // Lấy nội dung nếu có địa chỉ
    if (url) {
        getPage(url);
    }
});

window.addEventListener('load', function () {
    // Khi người dùng click vào liên kết
    document.querySelector('#navigator').addEventListener('click', function (evt) {
        if (evt.target.className == 'ajax-nav') {
            if (history.pushState) {
                evt.preventDefault();

                let url = evt.target.href;
                getPage(url);

                // Lưu địa chỉ ở state
                let state = url;
                history.pushState(state, null, url);
            }
        }
        evt.stopPropagation();
    });
});

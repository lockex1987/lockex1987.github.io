// Chỉ số bản ghi hiện tại
var nextItem = 1;

// Đánh dấu có đang xử lý hay không (để không xử lý nhiều lần)
var isLoadingMorePosts = false;

/**
 * Load thêm bản ghi.
 */
function loadMorePosts() {
    // Đánh dấu đang xử lý
    isLoadingMorePosts = true;

    // Thêm 20 bản ghi mới
    var listElm = document.querySelector('#infiniteList');
    for (var i = 0; i < 20; i++) {
        var item = document.createElement('li');
        item.innerText = 'Item ' + nextItem++;
        listElm.appendChild(item);
    }

    // Nếu đã hết bản ghi
    if (nextItem > 100) {
        window.removeEventListener('scroll', checkLoadMorePosts);
    }

    // Đánh dấu đã xử lý xong
    isLoadingMorePosts = false;
}

/**
 * Kiểm tra load bản ghi khi scroll.
 */
function checkLoadMorePosts() {
    // Nếu đang xử lý rồi thì thôi
    if (isLoadingMorePosts) {
        return;
    }

    // Tính toán xem nếu scroll đến gần cuối trang thì load thêm bản ghi
    var scrolledBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;
    var height = document.documentElement.scrollHeight;
    var threshold = 100;
    if (height - scrolledBottom < threshold) {
        loadMorePosts();
    }
}

loadMorePosts();
window.addEventListener('scroll', checkLoadMorePosts);
// Source of truth
// Lưu các thông tin cần chia sẻ giữa các component
var Store = {
    // Truyện hiện tại
    comic: null,

    // Màn hỉnh đang hiển thị, có thể là 'issue-list' hoặc 'viewer' hoặc 'comic-list'
    screen: 'comic-list'
};

// Sử dụng cơ chế observable của Riot
riot.observable(Store);

// Cập nhật màn hình hiển thị
Store.on('changeScreen', function(screen) {
    Store.screen = screen
    //console.log('Store screen', Store.screen)
})

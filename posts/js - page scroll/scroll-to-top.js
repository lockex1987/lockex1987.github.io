function scrollToTop(duration = 300) {
    // Các hàm bổ trợ
    let easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    let currentTime = () => {
        return 'now' in window.performance ? performance.now() : new Date().getTime();
    };

    // Lưu các giá trị ban đầu: vị trí, thời gian
    var start = window.pageYOffset;
    var startTime = currentTime();

    // Vị trí cần scroll đến
    var destinationOffsetToScroll = 0;

    // Hàm tính toán lại vị trí của window dựa vào delta của thời gian
    let animateScroll = () => {
        var now = currentTime();
        var time = Math.min(1, (now - startTime) / duration);
        var ratio = easeInOutQuad(time);
        var yCoord = Math.ceil(ratio * (destinationOffsetToScroll - start) + start);
        window.scroll(0, yCoord);

        // Kiểm tra đã đến đích chưa thì dừng lại
        if (window.pageYOffset === destinationOffsetToScroll) {
            return;
        }

        // Nếu vẫn cần scroll nữa thì gọi tiếp hàm
        requestAnimationFrame(animateScroll);
    };

    // Bắt đầu scroll
    animateScroll();
}
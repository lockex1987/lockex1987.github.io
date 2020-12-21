/**
 * Các hàm liên quan đến chế độ fullscreen.
 * Phải tách ra module riêng thế này để hỗ trợ thêm Safari trên iPad.
 */

/**
 * Có phải đang trong chế độ fullscreen hay không.
 */
function isFullscreen() {
    return (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    );
}

/**
 * Một đối tượng nào đó fullscreen.
 * @param {DOMNode} el Đối tượng DOM
 */
function requestFullscreen(el) {
    if (el.requestFullscreen) {
        el.requestFullscreen();
    } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
    }
}

/**
 * Thoát khỏi chế độ fullscreen.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**
 * Bật / tắt chế độ fullscreen.
 * @param {DOMNode} el Đối tượng DOM.
 */
function toggleFullscreen(el) {
    if (isFullscreen()) {
        exitFullscreen();
    } else {
        requestFullscreen(el);
    }
}

/**
 * Lắng nghe sự kiện fullscreen.
 * @param {Function} callback Hàm callback
 */
function addFullscreenListener(callback) {
    const events = [
        'fullscreenchange',
        'mozfullscreenchange',
        'webkitfullscreenchange',
        'MSFullscreenChange'
    ];
    events.forEach(evt => {
        document.addEventListener(evt, callback);
    });
}

export {
    isFullscreen,
    requestFullscreen,
    exitFullscreen,
    toggleFullscreen,
    addFullscreenListener
};

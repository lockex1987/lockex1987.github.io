/**
 * Hiển thị fullscreen một phần tử nào đó.
 * @param element Phần tử DOM
 */
function fullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
}

/**
 * Thoát khỏi chế độ fullscreen.
 */
function escapeFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	}	
}

/**
 * Kiểm tra xem có phải đang trong chế độ fullscreen hay không.
 */
function isFullscreen() {
	if (document.fullscreenElement ||
			document.webkitFullscreenElement ||
			document.mozFullScreenElement ||
			document.msFullscreenElement) {
		return true;
	} else {
		return false;
	}
}


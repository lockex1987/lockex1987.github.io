/**
 * Hiển thị fullscreen một phần tử nào đó.
 * @param i Phần tử DOM
 */
function fullscreen(i) {
	if (i.requestFullscreen) {
		i.requestFullscreen();
	} else if (i.webkitRequestFullscreen) {
		i.webkitRequestFullscreen();
	} else if (i.mozRequestFullScreen) {
		i.mozRequestFullScreen();
	} else if (i.msRequestFullscreen) {
		i.msRequestFullscreen();
	}
}

/**
 * Exit full-screen.
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
 * https://www.sitepoint.com/use-html5-full-screen-api/
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


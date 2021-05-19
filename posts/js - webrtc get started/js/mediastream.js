function hasGetUserMedia() {
	navigator.getUserMedia = navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia;

	if (navigator.getUserMedia) {
		return true;
	} else {
		alert('getUserMedia() is not supported in your browser');
		return false;
	}
}

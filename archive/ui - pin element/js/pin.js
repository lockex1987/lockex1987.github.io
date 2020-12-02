function init() {
	var videoPanel = document.getElementById('theImage');
	var getScreenTop = function () {
		return (window.pageYOffset !== undefined) ? window.pageYOffset
			: (document.documentElement || document.body.parentNode || document.body).scrollTop;
	};
	var checkPinVideo = function () {
		const startPintHeight = 360;
		const pinnedClass = 'pinned';

		if (videoPanel) {
			var top = getScreenTop();
			if (top > startPintHeight) {
				videoPanel.classList.add(pinnedClass);
			} else {
				videoPanel.classList.remove(pinnedClass);
			}
		}
	};
	window.addEventListener('scroll', checkPinVideo);
	window.addEventListener('resize', checkPinVideo);
}

init();

/**
 * Create a download link under the header.
 */
var gui = (function () {

	const CONTAINER_ID = 'captionDownloadContainer';

	// Vị trí để thêm thông báo
	var insertPosition;

	/**
	 * Add to the begining of the action toolbar.
	 * @param {Array} languages Danh sách ngôn ngữ
	 */
	function buildGui(languages) {
		removeIfAlreadyExists();

		let container = createOutterContainer('Subtitle: ');
		for (let i = 0; i < languages.length; i++) {
			let link = createDownloadLink(
				languages[i].langCode,
				languages[i].langName,
				languages[i].displayName
			);
			container.appendChild(link);
		}

		addToCurrentPage(container);
	}

	/**
	 * Add the GUI to the current page
	 * @param {DOMNode} container Node chứa hiển thị
	 */
	function addToCurrentPage(container) {
		insertPosition.parentNode.insertBefore(container, insertPosition);
	}

	/**
	 * Only 'view video' page can contain subtitle links.
	 * We should only handle 'view video' page, not 'search' page, 'setting' page,...
	 */
	function canInsert() {
        // Chúng ta tìm đến vị trí ở trên tên của Channel
		insertPosition = document.querySelector('#meta #meta-contents #container #top-row');
		return insertPosition != null;
	}

	/**
	 * Create the outter container
	 * @param {String} text Xâu nhãn hiển thị
	 */
	function createOutterContainer(text) {
		let container = document.createElement('div');
        container.setAttribute('id', CONTAINER_ID);
		container.style.padding = '10px 5px 10px 0';
		container.style.margin = '10px 0';
		container.style.color = 'blue';
        container.style.fontSize = '15px';
        container.style.lineHeight = 1.5;
        container.textContent = text;
		return container;
	}

	/**
	 * Create link.
	 * @param {String} langCode Mã ngôn ngữ
	 * @param {String} langName Tên ngôn ngữ
	 * @param {String} displayName Xâu hiển thị
	 */
	function createDownloadLink(langCode, langName, displayName) {
		let link = document.createElement('a');
		link.textContent = displayName;
		link.href = 'javascript:;';
		link.title = 'Please click to download';
		link.style.marginLeft = '10px';
		link.style.cursor = 'pointer';
		link.style.color = 'red';
		link.style.textDecoration = 'underline';
		link.style.background = 'transparent';
		link.style.border = 'none';
		link.style.fontSize = '15px';
		link.addEventListener('click', () => {
			ysd.downloadCaptionFile(langCode, langName);
		});
		return link;
	}

	/**
	 * Check if the container already exists (show we don't have to process again).
	 */
	function removeIfAlreadyExists() {
		let container = document.getElementById(CONTAINER_ID);
		if (container != null) {
			container.parentNode.removeChild(container);
		}
	}

	/**
	 * Notify that there is no subtitle.
	 */
	function notifyNotFound() {
		removeIfAlreadyExists();

		let container = createOutterContainer('No subtitle');

		addToCurrentPage(container);
	}

	return {
		buildGui,
		notifyNotFound,
		canInsert
	};
})();

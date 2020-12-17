var FilterProfanity = (function() {

	// Biểu thức chính quy
	var profanityWords;

	/**
	 * Thiết lập biểu thức chính quy.
	 * @param profanityKeywords Từ khóa raw
	 */
	function generateProfanityList(profanityKeywords) {
		var wordList = Common.normalizeWordList(profanityKeywords);
		profanityWords = new RegExp('(\\b|\\s|[^\\w]|^)(' + wordList.join('|') + ')(\\b|\\s|[^\\w]|$)', 'gi');
	}

	/**
	 * Hàm thay thế xâu.
	 * @param match Xâu khớp
	 * @return Trả về xâu là các ký tự *
	 */
	function replaceFunction(match, p1, p2, p3) {
		//var s = match[0] + "*".repeat(match.length - 1);
		//var s = "*".repeat(match.length);
		var s = p1 + "*".repeat(p2.length) + p3;
		return s;
	}

	/**
	 * Duyệt phần tử DOM.
	 * @param el Phần tử DOM
	 */
	function traverseElements(el) {
		if (el.nodeName) {
			// Bỏ qua thẻ script, style
			if (el.nodeName.toUpperCase() === "SCRIPT" || el.nodeName.toUpperCase() === "STYLE") {
				return;
			}

			if (el.nodeName.toUpperCase() === "#TEXT") {
				purgeElement(el);
			} else {
				for (var i = 0; i < el.childNodes.length; i++) {
					traverseElements(el.childNodes[i]);
				}
			}
		}
	}

	/**
	 * Không hiển thị các từ tục tĩu (thô tục) của phần tử DOM dạng text.
	 * @param el Phần tử DOM dạng text
	 */
	function purgeElement(el) {
		var oldValue = el.data;
		var newValue = oldValue.replace(profanityWords, replaceFunction);
		/*
		if (oldValue != newValue) {
			console.log("Replaced: " + oldValue);
		}*/

		el.data = newValue;
	}

	/**
	 * Lắng nghe các nội dung mới thay đổi.
	 */
	function initObserver() {
		// Hàm callback khi có thay đổi
		var callback = function(mutations) {
			mutations.forEach(function(mutation) {
				mutation.addedNodes.forEach(function(node) {
					traverseElements(node);
				});
			});
		};

		// Khởi tạo đối tượng MutationObserver
		var observer = new MutationObserver(callback);
		
		// Theo dõi phần tử DOM nào
		var target = document;

		// Cấu hình
		var config = {
			//attributes: true,
			childList: true,
			//characterData: true,
			subtree: true
		};
		
		// Theo dõi
		observer.observe(target, config);
	}

	function init(profanityKeywords) {
		generateProfanityList(profanityKeywords);
		traverseElements(document);
		initObserver();
	}

	return {
		init: init
	};
})();

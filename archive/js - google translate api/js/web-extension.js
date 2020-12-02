// File: content.js
// callTranslate(currentText);

function callTranslate(text) {
	// Không gọi AJAX trực tiếp ở đây được, bị lỗi CORS
	// Phải gọi ở background
	// Có thể gọi chrome.runtime.sendMessage hoặc chrome.extension.sendRequest
	// https://developer.chrome.com/extensions/messaging
	// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts
	chrome.extension.sendRequest({ translate: text }, (response) => {
		const translated = response.translated;
		subtitleContainer.innerHTML = translated;
		subtitleContainer.classList.add('translated');
	});
}

// File: background.js
// https://clients5.google.com

// Có thể gọi chrome.runtime.onMessage hoặc chrome.extension.onRequest
// chrome.runtime hình như không hỗ trợ bất đồng bộ
chrome.extension.onRequest.addListener(async (request, sender, sendResponse) => {
	if (request.translate) {
		const text = request.translate;

		const translated = await callApi(text);

		// Gửi lại content script
		// Nếu dùng chrome.runtime.onMessage thì phải truyền đúng tab ID
		// console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
		sendResponse({
			translated: translated
		});
	}
});

/*
File: manifest.json

	"content_security_policy": "script-src 'self' 'unsafe-eval' https://translate.googleapis.com https://clients5.google.com; object-src 'self'",

   "permissions": [
      "activeTab",
	  "https://translate.googleapis.com/*",
	  "https://clients5.google.com/*"
   ]
*/
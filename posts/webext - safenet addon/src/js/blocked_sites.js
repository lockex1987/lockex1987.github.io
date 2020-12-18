var BlockedSites = (function() {

	// Biểu thức chính quy danh sách các trang cần chặn
	var blackList;

	function checkBlocked(req) {
		var redirectUrl = chrome.runtime.getURL("blocked.html");
		
		// Cần bỏ qua chính trang chặn
		if (req.url.indexOf(redirectUrl) != 0) {
			// Không lọc CSS, JS,...
			// Tham khảo https://developer.chrome.com/extensions/webRequest#type-ResourceType
			// Các loại là "main_frame", "sub_frame", "stylesheet", "script", "image", "font", "object",
			// "xmlhttprequest", "ping", "csp_report", "media", "websocket", "other"
			//if (['main_frame', 'sub_frame', ].includes()) {
				// Kiểm tra trong danh sách blacklist
				if (req.url.search(blackList) > -1) {
					if (req.type == "main_frame") {
						chrome.tabs.update(req.tabId, { url: redirectUrl + "?url=" + encodeURIComponent(req.url) });
					} else {
						return { cancel: true };
					}
				}
			//}
		}
	}

	/**
	 * Khởi tạo việc lắng nghe kiểm tra chặn HTTPS.
	 */
	function init() {
		chrome.webRequest.onBeforeRequest.removeListener(checkBlocked);

		var obj = {};
		obj[Config.BLOCKED_SITES_CHECK_KEY] = Config.BLOCKED_SITES_CHECK_DEFAULT_VALUE;
		obj[Config.BLOCKED_SITES_LIST_KEY] = Config.BLOCKED_SITES_LIST_DEFAULT_VALUE;

		chrome.storage.sync.get(obj, function(items) {
			var blockedSitesCheck = items[Config.BLOCKED_SITES_CHECK_KEY];
			var blockedSitesList = items[Config.BLOCKED_SITES_LIST_KEY];

			if (blockedSitesCheck && blockedSitesList) {
				var wordList = Common.normalizeWordList(blockedSitesList);
				blackList = new RegExp('(' + wordList.join('|') + ')', 'gi');

				chrome.webRequest.onBeforeRequest.addListener(
					checkBlocked,
					{
						urls: [ "<all_urls>" ]
					},
					[ "blocking" ]
				);
			}
		});
	}

	return {
		init: init
	};
})();

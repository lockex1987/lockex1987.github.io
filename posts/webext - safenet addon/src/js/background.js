var Background = (function() {

	/**
	 * Lắng nghe các thay đổi (từ trang option, từ browser action).
	 */
	function initChangeListener() {
		chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
			if (message.change == 'change-safe-search') {
				SafeSearch.initSafeSearch();
			} else if (message.change == 'change-youtube-mode') {
				SafeSearch.initYoutubeStrictMode();
			} else if (message.change == "change-blocked-sites") {
				BlockedSites.init();
			}
		});
	}

	/**
	 * Kiểm tra khi người dùng vừa cài đặt add-on hoặc add-on vừa được cập nhật
	 * phiên bản mới.
	 */
	function checkVersion() {
		chrome.runtime.onInstalled.addListener(details => {
			switch (details.reason) {
				case 'install':
					// lockex1987.github.io
					chrome.tabs.create({ url: 'https://example.com/thank-you.html' });
					break;
				case 'update':
					chrome.tabs.create({ url: 'https://example.com/changelog.html' });
					break;
			}
		});
	}

	/**
	 * Thêm vào danh sách trang chặn.
	 * @param pageUrl URL cần thêm
	 */
	function updateBlockedSites(pageUrl) {
		// Lấy giá trị cũ
		var obj = {};
		obj[Config.BLOCKED_SITES_LIST_KEY] = Config.BLOCKED_SITES_LIST_DEFAULT_VALUE;
		chrome.storage.sync.get(obj, function(items) {
			var blockedSitesList = items[Config.BLOCKED_SITES_LIST_KEY];
			var newList = blockedSitesList + "\n" + pageUrl;

			// Cập nhật mới
			obj[Config.BLOCKED_SITES_LIST_KEY] = newList;
			chrome.storage.sync.set(obj, function() {
				// Cập nhật lại danh sách trang chặn
				BlockedSites.init();
			}); 
		});
	}

	/**
	 * Click chuột phải để chặn một trang web nào đó.
	 */
	function initContextMenu() {
		// Context menu khi chọn cả trang
		chrome.contextMenus.create({
			"contexts": [ "page" ],
			"title": "Chặn trang web này",
			"onclick": function(e) {
				var pageUrl = e.pageUrl;
				//var hostname = new URL(pageUrl).hostname;
				updateBlockedSites(pageUrl);
			}
		});

		// Context menu khi chọn một phần URL
		/*
		chrome.contextMenus.create({
			"contexts": [ "selection" ],
			"title": "Chặn trang web có chứa '%s'",
			"onclick": function(e) {
				var pageUrl = e.selectionText;
				//var hostname = new URL(pageUrl).hostname;
				updateBlockedSites(pageUrl);
			}
		});*/
	}

	function initPageAction() {
		/*
		// When the extension is installed or upgraded ...
		chrome.runtime.onInstalled.addListener(function() {
			// Replace all rules ...
			chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
				// With a new rule ...
				chrome.declarativeContent.onPageChanged.addRules([
					{
						// That fires when a page's URL contains a 'g' ...
						conditions: [
							new chrome.declarativeContent.PageStateMatcher({
								pageUrl: { urlContains: 'g' },
							})
						],
						// And shows the extension's page action.
						actions: [ new chrome.declarativeContent.ShowPageAction() ]
					}
				]);
			});
		});*/

		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
			if (!tab.url.match(/^about:/)) {
				chrome.pageAction.show(tab.id);
			}
		});
	}

	/**
	 * Khởi tạo
	 */
	function init() {
		BlockedHttps.initCheckHttpsBlock();
		BlockedSites.init();
		SafeSearch.initSafeSearch();
		SafeSearch.initYoutubeStrictMode();
		initChangeListener();
		initContextMenu();
		//initPageAction();
	}

	init();
})();

chrome.browserAction.onClicked.addListener(function(tab) {
	//chrome.tabs.update(tab.id, { url: redirectUrl });

	chrome.tabs.executeScript({
		file: 'live-reload.js'
	});
});

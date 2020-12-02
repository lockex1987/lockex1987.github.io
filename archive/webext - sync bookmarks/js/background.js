function openMainPage() {
	let optionsUrl = chrome.extension.getURL('index.html');
	chrome.tabs.query({ url: optionsUrl }, (tabs) => {
		if (tabs.length) {
			chrome.tabs.update(tabs[0].id, { active: true });
		} else {
			chrome.tabs.create({ url: optionsUrl });
		}
	});
}

chrome.browserAction.onClicked.addListener((tab) => {
	openMainPage();
});

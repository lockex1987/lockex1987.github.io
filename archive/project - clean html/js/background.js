// Trong file manifest.json phải có "browser_action" thì mới sử dụng được chrome.browserAction.onClicked
chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.executeScript(tab.ib, {
        file: 'js/clean-html.js'
    });
});

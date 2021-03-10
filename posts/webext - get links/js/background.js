/**
 * Mở một tab mới.
 */
function openNewTab(newUrl) {
    // Nếu đang mở thì focus
    // Nếu chưa mở thì mở tab mới
    chrome.tabs.query({ url: newUrl }, function (tabs) {
        if (tabs.length) {
            chrome.tabs.update(tabs[0].id, { active: true });
        } else {
            chrome.tabs.create({ url: newUrl });
        }
    });
}

/**
 * Khi click vào icon ở chỗ toolbar của trình duyệt
 * thì mở trang chính.
 */
chrome.browserAction.onClicked.addListener(function (tab) {
    // Lấy địa chỉ URL của trang web nằm trong extension
    const indexFileUrl = chrome.extension.getURL('index.html');
    openNewTab(indexFileUrl);
});

// Danh sách URL đang download
let queue = [];

/**
 * Xử lý khi nhận được message từ popup.
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message == 'getStats') {
        sendStats();
        return;
    }

    if (request.message == 'addAndStart') {
        // Thêm danh sách download vào hàng đợi
        queue = queue.concat(request.urls);
        // Xử lý hàng đợi
        processQueue();
        return;
    }

    if (request.message == 'addToQueue') {
        // Thêm danh sách download vào hàng đợi
        queue = queue.concat(request.urls);
        // Thông báo lại cho người dùng
        sendStats();
        return;
    }

    if (request.message == 'clearDownloads') {
        queue = [];
        sendStats();
    }
}
);

/**
 * Gửi thông tin thống kê cho popup.
 */
function sendStats() {
    chrome.runtime.sendMessage({
        message: 'stats',
        queue: queue
    });
}

/**
 * Thực hiện download.
 * Hàm này đang được gọi ở 2 chỗ:
 * - Nhấn nút 'download'
 * - Khi download xong 1 file
 */
function processQueue() {
    if (queue.length > 0) {
        const url = queue.shift();
        openNewTab(url);
    }
    sendStats();
}

/**
 * Lắng nghe sự kiện download.
 */
chrome.downloads.onChanged.addListener(function (downloadDelta) {
    // console.log('download delta', downloadDelta);

    // Nếu đã download xong thì xử lý URL tiếp theo
    if (downloadDelta.state != undefined && downloadDelta.state.current != 'in_progress') {
        processQueue();
    }
});

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
    const optionsUrl = chrome.extension.getURL('popup.html');
    openNewTab(optionsUrl);
});

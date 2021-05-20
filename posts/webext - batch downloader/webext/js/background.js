// Số download đồng thời nhiều nhất tại một thời điểm
const MAX_CONCURRENT_DOWNLOADS = 3;

// Số lượng đang download
let numDownloading;
// Số lượng đã download xong
let numFinished;
// Danh sách download
let downloadIds;
// Danh sách lỗi
let errors;
// Danh sách URL đang download
let queue;


/**
 * Reset lại các biến.
 */
function resetVariables() {
    numDownloading = 0;
    numFinished = 0;
    downloadIds = [];
    errors = [];
    queue = [];
}

/**
 * Xử lý khi nhận được message từ popup.
 */
function listenToEventsFromPopup() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.message == 'getStats') {
            // Lấy thông tin thống kê
            sendStats();
        } else if (request.message == 'addToQueue') {
            // Thêm vào hàng đợi
            queue = queue.concat(request.urls);
            processQueue();
        } else if (request.message == 'clearDownloads') {
            // Xóa danh sách download
            resetVariables();
            sendStats();
        }
    });
}

/**
 * Gửi thông tin thống kê cho popup.
 */
function sendStats() {
    chrome.runtime.sendMessage({
        message: 'stats',
        numDownloading: numDownloading,
        numQueued: queue.length,
        numFinished: numFinished,
        errors: errors
    });
}

/**
 * Thực hiện download.
 */
function processQueue() {
    while (queue.length > 0 && numDownloading < MAX_CONCURRENT_DOWNLOADS) {
        // Download và thêm vào danh sách download
        const el = queue.shift();
        numDownloading++;
        chrome.downloads.download(
            {
                url: el.url,
                filename: el.name
            },
            (downloadId) => {
                downloadIds.push({
                    id: downloadId,
                    url: el.url,
                    filename: el.name
                });
            }
        );
    }

    sendStats();
}

/**
 * Lắng nghe sự kiện download (download xong, download bị lỗi)
 */
function listenToEventFromDownloadProcess() {
    chrome.downloads.onChanged.addListener((downloadDelta) => {
        // Kiểm tra có trong danh sách download
        const ele = downloadIds.find(e => e.id == downloadDelta.id);
        if (ele) {
            if (downloadDelta.state != undefined) {
                // console.log(downloadDelta.state);
                if (downloadDelta.state.current == 'complete') {
                    // Nếu đã download thành công
                    // thì xóa khỏi danh sách download, cập nhật số download và số hoàn thành,
                    // và xử lý tiếp
                    // downloadIds.splice(idx, 1); // tìm kiếm lại, vì có thể đã bị thay đổi index
                    numDownloading--;
                    numFinished++;
                    processQueue();
                } else if (downloadDelta.state.current == 'interrupted') {
                    // Nếu bị lỗi
                    // Nếu có thể resume thì resume, còn không thì đánh dấu để download lại
                    /*
                    console.log(downloadDelta);
                    if (downloadDelta.canResume.current) {
                        chrome.downloads.resume(downloadDelta.id);
                    } else {

                    }
                    */
                    errors.push(ele);
                    numDownloading--;
                    processQueue();
                }
            }
        }

        sendStats();
    });
}

/**
 * Mở trang popup sang một tab mới.
 */
function openPage(url) {
    /*
    chrome.tabs.query(
        {
            url: url
        },
        (tabs) => {
            if (tabs.length) {
                chrome.tabs.update(
                    tabs[0].id,
                    {
                        active: true
                    }
                );
            } else {
                chrome.tabs.create({
                    url: url
                });
            }
        }
    );
    */
	
	// Mở web ở chế độ app
    chrome.windows.create({
        url: url,
        type: 'popup',
        width: 800,
        height: 600
    });
}

/**
 * Khi người dùng click vào icon ở chỗ toolbar thì mở tab mới.
 */
function openMainPageWhenClick() {
    chrome.browserAction.onClicked.addListener(() => {
        const mainPageUrl = chrome.extension.getURL('main.html');
        openPage(mainPageUrl);
    });
}

function init() {
    resetVariables();
    listenToEventsFromPopup();
    listenToEventFromDownloadProcess();
    openMainPageWhenClick();
}

init();

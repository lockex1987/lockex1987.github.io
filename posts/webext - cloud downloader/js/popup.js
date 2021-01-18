/**
 * Lấy danh sách URL người dùng nhập.
 */
function getUrls() {
    // Nhập mảng URL vào textarea
    const urls = [];
    const linksInput = document.querySelector('#linksInput');
    const arr = linksInput.value.split('\n');
    arr.forEach(s => {
        s = s.trim();
        if (s) {
            urls.push(s);
        }
    });

    linksInput.value = '';
    linksInput.style.height = '100px';

    return urls;
}

/**
 * Tự động điều chỉnh độ cao của textarea cho khớp với nội dung.
 */
function checkAutoGrow() {
    const linksInput = document.querySelector('#linksInput');
    const minHeight = 100;
    linksInput.addEventListener('input', () => {
        const scrollHeight = linksInput.scrollHeight;
        if (scrollHeight > minHeight) {
            linksInput.style.height = (scrollHeight + 5) + 'px';
        }
    });
}

/**
 * Bắt đầu download.
 */
function startDownload() {
    const urls = getUrls();

    // Thông báo cho background danh sách URL
    chrome.runtime.sendMessage({
        message: 'addAndStart',
        urls: urls
    });
}

/**
 * Thêm vào danh sách.
 */
function addToQueue() {
    const urls = getUrls();

    // Thông báo cho background danh sách URL
    chrome.runtime.sendMessage({
        message: 'addToQueue',
        urls: urls
    });
}

/**
 * Xóa các đường link download.
 */
function clearDownloads() {
    // Thông báo clear cho background
    chrome.runtime.sendMessage({
        message: 'clearDownloads'
    });
}

/**
 * Lấy danh sách các link download hiện tại.
 */
function initStats() {
    // Lấy thông tin thống kê từ background
    chrome.runtime.sendMessage({
        message: 'getStats'
    });
}

/**
 * Hiển thị danh sách download.
 */
function displayQueue(queue) {
    const linksDiv = document.querySelector('#linksDiv');
    linksDiv.innerHTML = '';
    queue.forEach((s, idx) => {
        const div = document.createElement('div');
        div.className = 'mb-2 text-truncate';

        const orderTag = document.createElement('span');
        orderTag.className = 'text-muted mr-2';
        orderTag.textContent = '#' + (idx + 1);

        const aTag = document.createElement('a');
        // div.className = 'd-block';
        aTag.href = s;
        aTag.target = '_blank';
        aTag.textContent = s;

        div.appendChild(orderTag);
        div.appendChild(aTag);
        linksDiv.appendChild(div);
    });
}

/**
 * Lắng nghe các sự kiện khi click các nút.
 */
function handleEvents() {
    // Click nút 'Start download'
    document.querySelector('#startButton').addEventListener('click', startDownload);

    // Click nút 'Thêm vào danh sách'
    document.querySelector('#addButton').addEventListener('click', addToQueue);

    // Click nút 'Clear'
    document.querySelector('#clearDownload').addEventListener('click', clearDownloads);
}

/**
 * Lắng nghe thông báo từ background.
 */
function listenToBackground() {
    // Hiển thị danh sách các URL đang download
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.message == 'stats') {
            displayQueue(request.queue);
        }
    });
}

listenToBackground();
initStats();
handleEvents();
checkAutoGrow();

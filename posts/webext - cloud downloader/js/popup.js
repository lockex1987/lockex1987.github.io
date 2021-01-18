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
    return urls;
}

// Click nút 'Start download'
document.querySelector('#startButton').addEventListener('click', () => {
    const urls = getUrls();

    // Thông báo cho background danh sách URL
    chrome.runtime.sendMessage({
        message: 'addAndStart',
        urls: urls
    });
});

// Click nút 'Thêm vào danh sách'
document.querySelector('#addButton').addEventListener('click', () => {
    const urls = getUrls();

    // Thông báo cho background danh sách URL
    chrome.runtime.sendMessage({
        message: 'addToQueue',
        urls: urls
    });
});


// Click nút 'Clear'
document.querySelector('#clearDownload').addEventListener('click', () => {
    // Thông báo clear cho background
    chrome.runtime.sendMessage({
        message: 'clearDownloads'
    });
});

// Lấy thông tin thống kê từ background
chrome.runtime.sendMessage({
    message: 'getStats'
});

// Lắng nghe thông báo từ background
// Hiển thị danh sách các URL đang download
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message == 'stats') {
        const linksDiv = document.querySelector('#linksDiv');
        linksDiv.innerHTML = '';
        request.queue.forEach((s, idx) => {
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
});

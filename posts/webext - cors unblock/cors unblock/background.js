// Cấu hình
const prefs = {
    'enabled': false
};

// Đối tượng chứa các phương thức
const cors = {};

/**
 * Lắng nghe từng request, thêm các header hợp lý.
 * Bị lỗi với YouTube ở trình duyệt Chromium ở máy ở nhà.
 */
cors.onHeadersReceived = ({ responseHeaders }) => {
    // console.log(responseHeaders);
    const originEntry = responseHeaders.find(({ name }) => name.toLowerCase() === 'access-control-allow-origin');
    const originValue = '*';
    if (originEntry) {
        // originEntry.value = originValue;
    } else {
        responseHeaders.push({
            'name': 'Access-Control-Allow-Origin',
            'value': originValue
        });
    }

    const methodsEntry = responseHeaders.find(({ name }) => name.toLowerCase() === 'access-control-allow-methods');
    const methodsValue = ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'].join(', ');
    if (methodsEntry) {
        // methodsEntry.value = methodsValue;
    } else {
        responseHeaders.push({
            'name': 'Access-Control-Allow-Methods',
            'value': methodsValue
        });
    }

    const headersEntry = responseHeaders.find(({ name }) => name.toLowerCase() === 'access-control-allow-headers');
    const headersValue = '*';
    if (headersEntry) {
        // headersEntry.value = originValue;
    } else {
        responseHeaders.push({
            'name': 'Access-Control-Allow-Headers',
            'value': headersValue
        });
    }

    return { responseHeaders };
};


/**
 * Enable CORS.
 */
cors.install = () => {
    cors.remove();

    const extra = [
        'blocking',
        'responseHeaders'
    ];
    if (/Firefox/.test(navigator.userAgent) === false) {
        extra.push('extraHeaders');
    }
    chrome.webRequest.onHeadersReceived.addListener(cors.onHeadersReceived, {
        urls: ['<all_urls>']
    }, extra);
};


/**
 * Disable CORS.
 */
cors.remove = () => {
    chrome.webRequest.onHeadersReceived.removeListener(cors.onHeadersReceived);
};

/**
 * Khởi tạo.
 */
cors.onCommand = () => {
    if (prefs.enabled) {
        cors.install();
    } else {
        cors.remove();
    }

    chrome.browserAction.setIcon({
        path: {
            '16': 'images/' + (prefs.enabled ? '' : 'disabled/') + '16.png',
            '19': 'images/' + (prefs.enabled ? '' : 'disabled/') + '19.png',
            '32': 'images/' + (prefs.enabled ? '' : 'disabled/') + '32.png',
            '38': 'images/' + (prefs.enabled ? '' : 'disabled/') + '38.png',
            '48': 'images/' + (prefs.enabled ? '' : 'disabled/') + '48.png',
            '64': 'images/' + (prefs.enabled ? '' : 'disabled/') + '64.png'
        }
    });

    chrome.browserAction.setTitle({
        title: prefs.enabled
            ? 'CORS is unblocked'
            : 'Disabled: Default server behavior'
    });
};


/**
 * Khi có thay đổi storage thì đọc lại cấu hình.
 */
chrome.storage.onChanged.addListener(ps => {
    Object.keys(ps).forEach(name => {
        prefs[name] = ps[name].newValue;
    });

    cors.onCommand();
});


/**
 * Người dùng click vào icon thì cập nhật storage.
 */
chrome.browserAction.onClicked.addListener(() => chrome.storage.local.set({
    enabled: prefs.enabled === false
}));


/**
 * Khởi tạo, lấy các cấu hình ở storage.
 */
chrome.storage.local.get(prefs, ps => {
    Object.assign(prefs, ps);

    cors.onCommand();
});

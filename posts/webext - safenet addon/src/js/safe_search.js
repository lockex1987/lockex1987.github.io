const SafeSearch = (function () {
    // Cấu hình hiện tại của người dùng
    const config = {
        googleSafeSearch: false,
        youtubeStrictMode: 'Off'
    };

    /**
     * Thêm tham số vào URL.
     * @param url URL gốc
     * @param param Tham số cần thêm vào
     * @return false nếu URL gốc đã có tham số, nếu không thì trả về URL đã có tham số
     */
    function addParameterToUrl(url, param) {
        if (url.indexOf(param) == -1) {
            return url + '&' + param;
        } else {
            return false;
        }
    }

    /**
     * Trả về đường dẫn Safe Search của Google (Yahoo, Bing,...)
     * @param url Đường dẫn đầu vào
     * @return Đường dẫn đã có Safe Search nếu chưa có, hoặc false nếu đã có
     */
    function alterUrlForSafeSearch(url) {
        // Google
        if (url.indexOf('google.') != -1) {
            if (/q=/.test(url)) {
                // Có thể bị lỗi với các dịch vụ khác của Google như Google drive
                // Cần bắt đúng chỉ là Google Search
                // return addParameterToUrl(url, "safe=active&ssui=on");
            }
        }

        return false;
    }

    /**
     * Redirect đến trang Safe Search.
     * @param req Đối tượng Request
     */
    function redirectSafeSearch(req) {
        const redirectUrl = alterUrlForSafeSearch(req.url);
        if (redirectUrl) {
            return { redirectUrl: redirectUrl };
        }
    }

    /**
     * Khởi tạo Safe Search.
     */
    function initSafeSearch() {
        chrome.webRequest.onBeforeRequest.removeListener(redirectSafeSearch);

        const obj = {};
        obj[Config.GOOGLE_SAFE_SEARCH_KEY] = Config.GOOGLE_SAFE_SEARCH_DEFAULT_VALUE;

        chrome.storage.sync.get(obj, function (items) {
            config.googleSafeSearch = items[Config.GOOGLE_SAFE_SEARCH_KEY];
            // console.log("googleSafeSearch: " + config.googleSafeSearch);

            if (config.googleSafeSearch) {
                chrome.webRequest.onBeforeRequest.addListener(
                    redirectSafeSearch,
                    {
                        urls: ['<all_urls>'],
                        types: ['main_frame', 'sub_frame', 'xmlhttprequest']
                    },
                    ['blocking']
                );
            }
        });
    }

    /**
     * Xử lý Strict Mode của YouTube.
     * Tham khảo https://support.google.com/a/answer/6214622?hl=en
     * @param req Đối tượng Request
     */
    function processYoutubeRestrict(req) {
        // Bỏ header cũ
        for (let i = 0; i < req.requestHeaders.length; ++i) {
            if (req.requestHeaders[i].name === 'YouTube-Restrict') {
                if (req.requestHeaders[i].value == config.youtubeStrictMode) {
                    return;
                } else {
                    req.requestHeaders.splice(i, 1);
                    break;
                }
            }
        }

        // Thêm header mới
        req.requestHeaders.push({
            name: 'YouTube-Restrict',
            value: config.youtubeStrictMode
        });

        // Trả về
        return {
            requestHeaders: req.requestHeaders
        };
    }

    /**
     * Khởi tạo chế độ Strict ở YouTube.
     */
    function initYoutubeStrictMode() {
        chrome.webRequest.onBeforeSendHeaders.removeListener(processYoutubeRestrict);

        const obj = {};
        obj[Config.YOUTUBE_STRICT_MODE_KEY] = Config.YOUTUBE_STRICT_MODE_DEFAULT_VALUE;

        chrome.storage.sync.get(obj, function (items) {
            config.youtubeStrictMode = items[Config.YOUTUBE_STRICT_MODE_KEY];
            // console.log("youtubeStrictMode: " + config.youtubeStrictMode);

            if (config.youtubeStrictMode != 'Off') {
                chrome.webRequest.onBeforeSendHeaders.addListener(
                    processYoutubeRestrict,
                    {
                        urls: ['*://*.youtube.com/*'],
                        types: ['main_frame', 'sub_frame', 'xmlhttprequest']
                    },
                    ['blocking', 'requestHeaders']
                );
            }
        });
    }

    return {
        initSafeSearch: initSafeSearch,
        initYoutubeStrictMode: initYoutubeStrictMode
    };
})();

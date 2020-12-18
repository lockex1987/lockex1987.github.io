/**
 * Lấy số thứ tự chương từ tên chương.
 * @param {String} title Tên chương
 * @param {Boolean} firstResult Lấy kết quả đầu tiên tìm thấy
 */
function extractChapterNumber(title, firstResult = true) {
	// Tên có thể ngăn cách bằng dấu hai chấm
	title = title.split(':')[0];

    // Lọc ra phần số
    // Có thể có dấu chấm ở giữa
    const regex = /\d[\d\.]*/g;

    if (firstResult) {
        // Làm thế này sẽ lấy ra kết quả tìm thấy đầu tiên
        const result = regex.exec(title);
        if (result) {
            return result[0];
        }
    } else {
        // Làm thế này để lấy ra kết quả tìm thấy cuối cùng
        const result = [...title.matchAll(regex)];
        if (result && result.length > 0) {
            return result[result.length - 1];
        }
    }

    // Nếu không thì trả về xâu ban đầu
    return title;
}

/**
 * Kiểm tra xem ảnh có phải là quảng cáo, credit hay không.
 * Để loại bỏ.
 * @param {String} imageUrl Đường dẫn ảnh
 * @param {Array} blackList Mảng danh sách các đường dẫn cần bỏ qua
 */
function isExtraImage(imageUrl, blackList) {
    for (let i = 0; i < blackList.length; i++) {
        if (imageUrl.includes(blackList[i])) {
            return true;
        }
    }
    return false;
}

/**
 * Hiển thị log cho người dùng
 * @param {String} message Nội dung hiển thị
 */
function writeLog(message) {
    document.querySelector('#logDiv').textContent = message;
}

/**
 * Lấy danh sách ảnh của các chương.
 * @param {Function} processChapterFunc Hàm xử lý từng chương, hàm chấp nhận 3 tham số là (chapterUrl, chapterNo, callbackFunc)
 * @param {Array} chapterLinks Danh sách chương
 * @param {Function} failedCallback Hàm gọi khi không lấy được ảnh
 */
function getAllDownloads(processChapterFunc, chapterLinks, failedCallback) {
    // Chỉ số chương hiện tại đang xử lý
    let currentIndex = 0;
    // Mảng các ảnh để download
    let allDownloads = [];

    /**
     * Hàm callback sau khi lấy được danh sách ảnh của từng chương.
     * @param {Array} images Danh sách ảnh của 1 chương
     */
    function callbackFunc(images, timeout = 0) {
        const chapterNo = chapterLinks[currentIndex].chapterNo;
        if (images.length == 0) {
            writeLog('Không tìm thấy ảnh của chương ' + chapterNo);

            if (failedCallback) {
                failedCallback(chapterNo);
            }
        } else {
            writeLog('Đã xử lý xong chương ' + chapterNo);

            // Thêm danh sách ảnh của chương đó vào danh sách tổng chung
            allDownloads = allDownloads.concat(images);

            // Tăng chỉ số chương
            currentIndex++;

            if (currentIndex < chapterLinks.length) {
                // Nếu vẫn còn chương thì crawl tiếp
                if (timeout) {
                    // Chờ một thời gian rồi mới crawl tập mới,
                    // nếu không sẽ bị tưởng là robot và chặn
                    setTimeout(function () {
                        crawl();
                    }, timeout);
                } else {
                    crawl();
                }
            } else {
                // Nếu đã crawl xong thì lưu danh sách download ảnh
                const text = JSON.stringify(allDownloads);
                const fileName = `all downloads ${chapterLinks[0].chapterNo} - ${chapterLinks[chapterLinks.length - 1].chapterNo}.json`;
                CommonUtils.saveTextAsFile(text, fileName);
            }
        }
    }

    /**
     * Hàm crawl.
     */
    function crawl() {
        const chapterObj = chapterLinks[currentIndex];
        const chapterUrl = chapterObj.url;
        const chapterNo = chapterObj.chapterNo;
        processChapterFunc(chapterUrl, chapterNo, callbackFunc);
    }

    crawl();
}

/**
 * Lấy đuôi mở rộng của URL ảnh.
 * @param {String} url URL
 */
function getImageExtension(url) {
    const fileExtension = url.split('.').pop().toLowerCase();
    if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
        return 'jpg';
    }
    return fileExtension;
}

/**
 * Chuyển nhiều dấu cách thành 1 dấu cách.
 * @param {String} text Xâu text
 */
function normalizeSpaces(text) {
    return text.replace(/\s+/g, ' ');
}

/**
 * Parse mã HTML để sử dụng các hàm xử lý DOM.
 * Nếu sử dụng cách tạo 1 thẻ div, sau đó thiết lập innerHTML thì sẽ request đến cả ảnh, có thể chậm.
 * @param {String} htmlCode Mã HTML
 */
function parseDocumentFromString(htmlCode, baseUri = '') {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');

    // Thêm baseUri để các đường dẫn đúng
    if (baseUri) {
        const base = doc.createElement('base');
        base.href = baseUri;
        doc.head.appendChild(base);
    }

    return doc;
}

/**
 * Lấy đối tượng DOM từ URL.
 * @param {String} url URL
 */
async function getDocumentFromUrl(url) {
    const resp = await fetch(url);
    const html = await resp.text();
    const doc = parseDocumentFromString(html, url);
    return doc;
}

/**
 * Tạo tên file để download xuống máy tính.
 * @param {String} chapterNo Tên chương (tên thư mục)
 * @param {Integer} idx Chỉ số của file (bắt đầu từ 0)
 * @param {String} fileExtension Đuôi mở rộng của file
 * @param {Boolean} useChapterNoPrefix Sử dụng tên thư mục làm prefix cho ảnh
 */
function createLocalFileName(chapterNo, idx, fileExtension, useChapterNoPrefix) {
    return chapterNo + '/' +
        (useChapterNoPrefix ? chapterNo + '-' : '') +
        paddingZero(idx + 1) +
        '.' + fileExtension;
}

/**
 * Lấy danh sách tên chương từ các thẻ A.
 * @param {String} cssSelector CSS selector ra các thẻ A
 */
function getChaptersFromCssSelector(cssSelector, doc) {
    const chapterLinks = [];
    doc.querySelectorAll(cssSelector)
        .forEach((aTag) => {
            const title = aTag.textContent.trim().split('\n')[0].trim();
            const url = aTag.href;
            const chapterNo = extractChapterNumber(title, false);
            chapterLinks.unshift({
                url,
                title,
                chapterNo
            });
        });
    return chapterLinks;
}

/**
 * Xử lý từng chương, lấy link ảnh theo CSS selector.
 * @param {String} chapterUrl URL của chương
 * @param {String} chapterNo Số thứ tự chương (thư mục lưu)
 * @param {Function} callbackFunc Hàm callback sau khi thực hiện xong
 * @param {String} cssSelector CSS selector để chọn ra danh sách ảnh
 * @param {Array} blackList Danh sách ảnh bỏ qua
 * @param {boolean} useChapterNoPrefix Có sử dụng prefix hay không
 * @param {String} elementProperty Tên thuộc tính chứa URL của ảnh
 */
async function processChapterFromCssSelector(chapterUrl, chapterNo, callbackFunc,
    cssSelector,
    blackList = [],
    useChapterNoPrefix = true,
    elementProperty = 'src') {
    const doc = await getDocumentFromUrl(chapterUrl);
    const images = [];
    doc.querySelectorAll(cssSelector)
        .forEach(imgTag => {
            const url = imgTag[elementProperty];
            if (!isExtraImage(url, blackList)) {
                const fileExtension = getImageExtension(url);
                images.push({
                    url,
                    name: createLocalFileName(chapterNo, images.length, fileExtension, useChapterNoPrefix)
                });
            }
        });
    if (images.length == 0) {
        writeLog('Dừng ở chương ' + chapterNo);
    } else {
        callbackFunc(images);
    }
}

/**
 * Thêm các số 0 ở đầu cho đủ 3 ký tự.
 * @param {Integer|String} number
 */
function paddingZero(number) {
    return number.toString().padStart(3, '0');
}

/**
 * Viết hoa chữ cái đầu tiên của xâu.
 */
function capitalizeString(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export default {
    capitalizeString,
    getDocumentFromUrl,
    getAllDownloads,
    getChaptersFromCssSelector,
    processChapterFromCssSelector,
    createLocalFileName,
    extractChapterNumber,
    getImageExtension,
    paddingZero
};

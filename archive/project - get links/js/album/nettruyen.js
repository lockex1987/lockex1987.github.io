/**
 * Lấy danh sách chương.
 */
function getChaptersNettruyen(doc) {
    return getChaptersFromCssSelector('#nt_listchapter a', doc);
}

/**
 * Xử lý từng chương.
 * @param {String} chapterUrl URL của chương
 * @param {String} chapterNo Số thứ tự chương (thư mục lưu)
 * @param {Function} callbackFunc Hàm callback sau khi thực hiện xong
 */
async function processChapterNettruyen(chapterUrl, chapterNo, callbackFunc) {
    const blackList = [
        'quang%2Bcao',
        'thank',
        'banner',
        'BANNER',
        'donate',
        'credit',
        'tuyenns'
    ];

    const doc = await getDocumentFromUrl(chapterUrl);
    const images = [];
    doc.querySelectorAll('.page-chapter img').forEach(imgTag => {
        const imageUrl = imgTag.src;
        if (!isExtraImage(imageUrl, blackList)) {
            const fileExtension = getImageExtension(imageUrl);
            images.push({
                url: imageUrl,
                name: createLocalFileName(chapterNo, images.length, fileExtension)
            });
        }
    });

    // Chờ 5 giây rồi mới crawl tập mới, nếu không sẽ bị tưởng là robot và chặn
    callbackFunc(images, 5 * 1000);
}

/**
 * Lấy ảnh của một chương truyện cụ thể nào đó.
 */
function getImagesOfSingleChapter() {
    const chapterNo = extractChapterNumber(document.title);
    const images = [];
    document.querySelectorAll('.page-chapter img').forEach(imgTag => {
        const url = imgTag.src;
        if (!isExtraImage(url, blackList)) {
            const fileExtension = getImageExtension(url);
            images.push({
                url: url,
                name: createLocalFileName(chapterNo, images.length, fileExtension)
            });
        }
    });

    if (images.length) {
        const text = JSON.stringify(images);
        const fileName = `single downloads ${chapterNo}.json`;
        CommonUtils.saveTextAsFile(text, fileName);
    }
}

export {
    getChaptersNettruyen,
    processChapterNettruyen
};

// Lắng nghe các sự kiện từ Extension
/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message == 'getImagesSingle') {
        getImagesOfSingleChapter();
    }
});
*/

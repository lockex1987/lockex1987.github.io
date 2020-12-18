/**
 * Lấy danh sách chương.
 */
function getChaptersManhwa18(doc) {
    return getChaptersFromCssSelector('#tab-chapper a.chapter', doc);
}

/**
 * Xử lý từng chương.
 * @param {String} chapterUrl URL của chương
 * @param {String} chapterNo Số thứ tự chương (thư mục lưu)
 * @param {Function} callbackFunc Hàm callback sau khi thực hiện xong
 */
function processChapterManhwa18(chapterUrl, chapterNo, callbackFunc) {
    const cssSelector = '.chapter-content .chapter-img';
    processChapterFromCssSelector(chapterUrl, chapterNo, callbackFunc,
        cssSelector);
}

export {
    getChaptersManhwa18,
    processChapterManhwa18
};

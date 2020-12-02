import GetLinksUtils from '../utils.js';

/**
 * Lấy danh sách các chương từ trang mangakakalot.
 * @param DOM doc
 */
function getChaptersMangakakalot(doc) {
    return GetLinksUtils.getChaptersFromCssSelector('.chapter-list a', doc);
}

/**
 * Xử lý lấy ảnh từng chương trang mangakakalot.
 * @param {String} chapterUrl URL của chương
 * @param {String} chapterNo Số thứ tự chương (thư mục lưu)
 * @param {Function} callbackFunc Hàm callback sau khi thực hiện xong
 */
function processChapterMangakakalot(chapterUrl, chapterNo, callbackFunc) {
    const cssSelector = '#vungdoc img';
    GetLinksUtils.processChapterFromCssSelector(chapterUrl, chapterNo, callbackFunc,
        cssSelector);
}

export {
    getChaptersMangakakalot,
    processChapterMangakakalot
};

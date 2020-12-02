import GetLinksUtils from '../utils.js';

/**
 * Lấy danh sách chương từ trang beeng.
 */
function getChaptersBeeng(doc) {
    return GetLinksUtils.getChaptersFromCssSelector('.listChapters a', doc);
}

/**
 * Xử lý từng chương.
 * @param {String} chapterUrl URL của chương
 * @param {String} chapterNo Số thứ tự chương (thư mục lưu)
 * @param {Function} callbackFunc Hàm callback sau khi thực hiện xong
 */
function processChapterBeeng(chapterUrl, chapterNo, callbackFunc) {
    const cssSelector = '#lightgallery2 img';
    GetLinksUtils.processChapterFromCssSelector(chapterUrl, chapterNo, callbackFunc,
        cssSelector);
}

export {
    getChaptersBeeng,
    processChapterBeeng
};

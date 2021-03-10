import GetLinksUtils from '../utils.js';

/**
 * Lấy danh sách các chương từ trang manganelo.
 * @param DOM doc
 */
function getChaptersManganelo(doc) {
    return GetLinksUtils.getChaptersFromCssSelector('.row-content-chapter a', doc);
}

/**
 * Xử lý lấy ảnh từng chương trang manganelo.
 * @param {String} chapterUrl URL của chương
 * @param {String} chapterNo Số thứ tự chương (thư mục lưu)
 * @param {Function} callbackFunc Hàm callback sau khi thực hiện xong
 */
function processChapterManganelo(chapterUrl, chapterNo, callbackFunc) {
    const cssSelector = '.container-chapter-reader img';
    GetLinksUtils.processChapterFromCssSelector(chapterUrl, chapterNo, callbackFunc,
        cssSelector);
}

export {
    getChaptersManganelo,
    processChapterManganelo
};

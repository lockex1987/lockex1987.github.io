import GetLinksUtils from '../utils.js';

/**
 * Lấy danh sách chương.
 */
function getChaptersReadcomiconline(doc) {
    return GetLinksUtils.getChaptersFromCssSelector('.listing a', doc);
}

/**
 * Xử lý từng chương.
 * @param {String} chapterUrl URL của chương
 * @param {String} chapterNo Số thứ tự chương (thư mục lưu)
 * @param {Function} callbackFunc Hàm callback sau khi thực hiện xong
 */
async function processChapterReadcomiconline(chapterUrl, chapterNo, callbackFunc) {
    const images = await getImagesReadcomiconline(chapterUrl, chapterNo);

    // Chờ 20 giây rồi mới crawl tập mới,
    // nếu không sẽ bị tưởng là robot và chặn
    callbackFunc(images, 20 * 1000);
}

/**
 * Lấy ảnh của một chương.
 * @param {String} chapterUrl URL của chương
 * @param {String} chapterNo Số thứ tự chương (thư mục lưu)
 */
async function getImagesReadcomiconline(chapterUrl, chapterNo) {
    const htmlCode = await fetch(chapterUrl).then(resp => resp.text());
    const images = [];
    const regex = /lstImages\.push\("(.+?)"\)/g;
    let group;
    while ((group = regex.exec(htmlCode)) !== null) {
        const imageUrl = group[1];
        const fileExtension = GetLinksUtils.getImageExtension(imageUrl);
        images.push({
            url: imageUrl,
            name: GetLinksUtils.createLocalFileName(chapterNo, images.length, fileExtension)
        });
    }
    return images;
}

export {
    getChaptersReadcomiconline,
    processChapterReadcomiconline
};

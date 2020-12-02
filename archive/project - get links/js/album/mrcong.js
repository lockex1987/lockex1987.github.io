/**
 * Các link dạng: 'https://mrcong.com/page/' + page
 * @param {DOM} doc
 */
function getChaptersMrcong(doc) {
    return getChaptersFromCssSelector('#main-content .post-box-title a', doc);
}

/**
 * Lấy link download mediafire.
 * @param {String} url
 */
async function getImagesMrcong(url) {
    const resp = await fetch(url);
    const text = await resp.text();
    // href="http://www.mediafire.com/file/g32b82ci2upedjz/MFStar_Vol.272.rar/file"
    const regex = /"http:\/\/www\.mediafire\.com\/file\/.+?"/i;
    const a = regex.exec(text);
    const file = a[0].replace(/"/g, '');
    return {
        url,
        file
    };
}

/**
 * Lấy tên thư mục lưu.
 * @param {String} postUrl
 */
function getFolderMrcong(postUrl) {
    const folder = 'mrcong';
    return folder;
}

export {
    getChaptersMrcong,
    getImagesMrcong,
    getFolderMrcong
};

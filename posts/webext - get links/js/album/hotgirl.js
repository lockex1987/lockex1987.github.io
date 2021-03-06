import GetLinksUtils from '../utils.js';


/**
 * Lấy các ảnh từ trang hotgirl.biz
 * https://hotgirl.biz/xiuren-vol-2006-shi-shi-kiki/
 * https://hotgirl.biz/xiuren-no-3121/
 */
async function getImagesHotgirl(postUrl, folder) {
    const doc = await GetLinksUtils.getDocumentFromUrl(postUrl);

    const images = [];
    let no = 0;
    const a = doc.querySelectorAll('.thecontent img');
    a.forEach((img, i) => {
        const imageUrl = img.getAttribute('data-lazy-src');
        if (imageUrl) {
            const extension = GetLinksUtils.getImageExtension(imageUrl);
            images.push({
                url: imageUrl,
                name: GetLinksUtils.createLocalFileName(folder, no, extension)
            });
            no++;
        }
    });
    return images;
}

/**
 * Lấy tên thư mục lưu.
 * @param {String} postUrl
 */
function getFolderHotgirl(postUrl) {
    const urlObject = new URL(postUrl);
    const folder = urlObject.pathname
        .replace(/\//g, '')
        .replace(/-/g, ' ');
    return folder;
}

export {
    getImagesHotgirl,
    getFolderHotgirl
};

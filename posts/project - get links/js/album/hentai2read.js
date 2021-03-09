import GetLinksUtils from '../utils.js';

/**
 * Lấy link ảnh của một chương.
 * @param {String} postUrl
 * @param {String} folder
 */
async function getImagesHentai2read(postUrl, folder) {
    const htmlCode = await fetch(postUrl).then(response => response.text());
    const regex = /'images' : (\[.+\])/g;
    const arr = regex.exec(htmlCode);
    const links = JSON.parse(arr[1]);

    const images = links.map((s, i) => {
        const fileExtension = GetLinksUtils.getImageExtension(s);
        return {
            url: 'https://static.hentaicdn.com/hentai' + s,
            name: GetLinksUtils.createLocalFileName(folder, i, fileExtension)
        };
    });
    return images;
}

/**
 * Lấy tên thư mục lưu.
 * @param {String} postUrl
 */
function getFolderHentai2read(postUrl) {
    const arr = postUrl.split('/');
    const folder = arr[3];
    return folder;
}

export {
    getImagesHentai2read,
    getFolderHentai2read
};

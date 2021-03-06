import GetLinksUtils from '../utils.js';


/**
 * Lấy các ảnh từ trang truyentranhphapbi.com
 * https://www.truyentranhphapbi.com/2020/12/dragon-ball-hoi-cellandroid-tap-7.html
 */ 
async function getImagesTruyentranhphapbi(postUrl, folder) {
    const doc = await GetLinksUtils.getDocumentFromUrl(postUrl);

    const images = [];
    let no = 1;
    const a = doc.querySelectorAll('.full-size img');
    a.forEach((img, i) => {
        const imageUrl = img.src;
        if (imageUrl) {
            const extension = GetLinksUtils.getImageExtension(imageUrl);
            images.push({
                url: imageUrl,
                name: GetLinksUtils.createLocalFileName(folder, no, extension)
            });
            no++;
        }
    });

    const coverUrl = getCoverImage(doc);
    const coverExtension = GetLinksUtils.getImageExtension(coverUrl);
    images.unshift({
        url: coverUrl,
        name: GetLinksUtils.createLocalFileName(folder, 0, coverExtension)
    });

    return images;
}


/**
 * Lấy ảnh bìa full.
 */
function getCoverImage(doc) {
    const firstImage = doc.querySelector('.post-body img');
    const aTag = firstImage.parentNode;
    return aTag.href;
}


/**
 * Lấy tên thư mục lưu.
 * @param {String} postUrl
 */
function getFolderTruyentranhphapbi(postUrl) {
    const urlObject = new URL(postUrl);
    const folder = urlObject.pathname
        .split('/')
        .pop()
        .replace('.html', '')
        .replace(/\//g, '')
        .replace(/-/g, ' ');
    return folder;
}


export {
    getImagesTruyentranhphapbi,
    getFolderTruyentranhphapbi
};

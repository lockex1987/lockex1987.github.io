import GetLinksUtils from '../utils.js';

/**
 * Download truyện Conan từ trang kenhsinhvien.vn.
 * https://kenhsinhvien.vn/forum/conan-reading-room.510/
 */
async function getImagesKenhsinhvien(postUrl, folder) {
    const doc = await GetLinksUtils.getDocumentFromUrl(postUrl);

    const images = [];
    let no = 0;
    const a = doc.querySelectorAll('.LbImage');
    a.forEach((img, i) => {
        const imageUrl = img.getAttribute('src');
        if (imageUrl) {
            const extension = 'jpg';
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
function getFolderKenhsinhvien(postUrl) {
    const folder = GetLinksUtils.extractChapterNumber(postUrl);
    return folder;
}

export {
    getImagesKenhsinhvien,
    getFolderKenhsinhvien
};

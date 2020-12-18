/**
 * Lấy các ảnh từ trang hotgirl.biz
 * https://hotgirl.biz/xiuren-vol-2006-shi-shi-kiki/
 */
async function getImagesHotgirl(postUrl, folder) {
    const doc = await getDocumentFromUrl(postUrl);

    const images = [];
    let no = 0;
    const a = doc.querySelectorAll('.thecontent img');
    a.forEach((img, i) => {
        const imageUrl = img.getAttribute('data-lazy-src');
        if (imageUrl) {
            const extension = getImageExtension(imageUrl);
            images.push({
                url: imageUrl,
                name: createLocalFileName(folder, no, extension)
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

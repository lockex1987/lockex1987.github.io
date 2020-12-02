/**
 * Lấy link các ảnh bìa.
 * @param {String} postUrl URL
 */
async function getImagesComicvine(postUrl, folder) {
    const doc = await getDocumentFromUrl(postUrl);

    return [...doc.querySelectorAll('.issue-grid li')]
        .map(liTag => {
            const imgTag = liTag.querySelector('img');
            const url = imgTag.src.replace('scale_small', 'scale_large');
            const numberTag = liTag.querySelector('.issue-number');
            const number = extractChapterNumber(numberTag.textContent);
            return {
                url: url,
                name: folder + '/' + paddingZero(number) + '.' + getImageExtension(url)
            };
        });
}

/**
 * Lấy tên thư mục lưu.
 * @param {String} postUrl
 */
function getFolderComicvine(postUrl) {
    const arr = this.postUrl.split('/');
    const comicName = arr[3];
    const folder = comicName + '-covers';
    return folder;
}

export {
    getImagesComicvine,
    getFolderComicvine
};

function getImageUrls() {
    let urls = [];
    let imageNum = 27;
    for (let i = 0; i < imageNum; i++) {
        let j = i;
        //var j = Math.floor(Math.random() * IMAGES.length);
        let u = IMAGES[j];
        urls.push(u);
    }
    return urls;
}

function bindHorizontalMasonry(urls) {
    let html = urls.reduce((s, url) => {
        return s + `<div class="image-thumb" style="background-image:url(${url});">
                        <img src="${url}">
                    </div>`;
    }, '');
    document.querySelector('.masonry-horizontal').innerHTML = html;
}

function bindVerticalMasonry(urls) {
    let html = urls.reduce((s, url) => {
        return s + `<img src="${url}">`;
    }, '');
    document.querySelector('.masonry-vertical').innerHTML = html;
}

function initMasonry() {
    let urls = getImageUrls();
    bindVerticalMasonry(urls);
    bindHorizontalMasonry(urls);
}

initMasonry();
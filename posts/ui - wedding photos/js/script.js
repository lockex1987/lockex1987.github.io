function bindImages() {
    let html = '';
    IMAGES.forEach(url => {
        html += `
                <a href="${url}" data-fancybox="gallery" class="wrapper">
                    <img data-src="${url}">
                </a>`;
    });
    document.querySelector('.photos').innerHTML = html;
}

bindImages();

//
// lazyloadImages();
// lazyloadOld(document.querySelectorAll(".photos img"));
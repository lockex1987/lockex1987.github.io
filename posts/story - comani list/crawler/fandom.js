function normalizeTitle(s) {
    return s.replace(/"/g, '')
        .replace('\n', ' ')
        .replace(':', '')
        .replace(/\s+/g, ' ');
}

// https://marvel.fandom.com/wiki/Ultimates_Vol_1
JSON.stringify(
    [...document.querySelectorAll('#gallery-0 .wikia-gallery-item')].map(item => {
        const image = item.querySelector('.thumb .gallery-image-wrapper img').src.split('/revision/')[0];
        const caption = item.querySelector('.lightbox-caption');
        const title = caption.querySelector('a').textContent;
        const issue = '';
        const subtitle = normalizeTitle(caption.querySelector('span[style="color:grey;font-style:italic"]').textContent);
        const link = title.href;
        return {
            image,
            title,
            issue,
            subtitle,
            link
        };
    }),
    null,
    4
);


// https://marvel.fandom.com/wiki/Infinity_(Event)
JSON.stringify(
    [...document.querySelectorAll('img')].map(img => {
        const image = img.src.split('/revision/')[0];
        const wrapper = img.parentNode.parentNode.parentNode.parentNode.parentNode;
        const thTag = wrapper.querySelector('th');
        const childNodes = thTag.childNodes;
        const title = normalizeTitle(childNodes[1].textContent);
        const issue = '';
        const subtitle = normalizeTitle(childNodes[4].textContent);
        const link = childNodes[4].href;
        return {
            image,
            title,
            issue,
            subtitle,
            link
        };
    }),
    null,
    4
);

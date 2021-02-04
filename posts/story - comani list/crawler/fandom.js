JSON.stringify(
    [...document.querySelectorAll('#gallery-0 .wikia-gallery-item')].map(item => {
        const imageSource = item.querySelector('.thumb .gallery-image-wrapper img').src.split('/revision/')[0];

        const caption = item.querySelector('.lightbox-caption');
        const title = caption.querySelector('a');
        const subtitle = caption.querySelector('span[style="color:grey;font-style:italic"]');

        return {
            image: imageSource,
            title: title.textContent,
            issue: '',
            subtitle: subtitle.textContent.replace(/"/g, ''),
            link: title.href
        };
    }),
    null,
    4
);

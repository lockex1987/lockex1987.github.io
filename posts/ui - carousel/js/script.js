import HEROES from './heroes.js';

/**
 * Xây dựng nội dung HTML cho demo 1.
 */
function bindGalleryCarouselHtml() {
    const heroes = HEROES;

    // Nội dung của nat-carousel-inner
    const html = `
        ${heroes.map((h) => `
            <div class="nat-carousel-item">
                <div class="card h-100">
                    <img class="card-img-top object-fit-cover"
                            src="images/${h.image}"
                            title="${h.image}"/>
                    <div class="card-body">
                        <div class="card-title text-success">
                            #${h.rank}: ${h.nameVietnamese}
                        </div>
                        <div class="card-subtitle text-info">
                            ${h.nicknameVietnamese}
                        </div>
                        <div class="card-text text-muted">
                            ${h.nickname}
                        </div>
                    </div>
                </div>
            </div>`
    ).join('')}`;
    const carouselInner = document.querySelector('#gallery .nat-carousel-inner');
    carouselInner.innerHTML = html;

    // Nội dung của nat-carousel-indicators
    const carouselIndicators = document.querySelector('#gallery .nat-carousel-indicators');
    carouselIndicators.innerHTML = `
            ${heroes.map((h, idx) => `
                <li data-item-to="${idx}"></li>`
    ).join('')}`;
    carouselIndicators.querySelector('[data-item-to]').classList.add('active');

    // Tự động chuyển
    // Carousel.autoPlay(carouselInner, 2 * 1000);
}

function adjustCarouselWidth() {
    const gallery = document.querySelector('#gallery');
    const originalWidth = Math.floor(parseFloat(getComputedStyle(gallery).width.replace('px', '')));
    const gutterWidth = 32;
    const gapWidth = 16;
    const numberOfItem = 3;
    const itemWidth = Math.floor((originalWidth - 2 * gutterWidth - (numberOfItem - 1) * gapWidth) / numberOfItem);
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1200) {
        const newWidth = itemWidth * numberOfItem + (numberOfItem - 1) * gapWidth + gutterWidth * 2;
        console.log(originalWidth, itemWidth, newWidth);
        gallery.style.width = newWidth + 'px';
    }
}



bindGalleryCarouselHtml();
adjustCarouselWidth();

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
                    <div class="embed-responsive embed-responsive-300by430">
                        <div class="embed-responsive-item d-flex justify-content-center align-items-center">
                            <img class="mh-100x h-100 w-100 object-fit-cover"
                                style="border-radius: 0.25rem 0.25rem 0 0"
                                src="images/${h.image}"
                                title="${h.image}"/>
                        </div>
                    </div>
                    
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
    const carousel = document.querySelector('#gallery');

    const windowWidth = window.innerWidth;
    if (windowWidth >= 1200) {
        const gutterWidth = 32;
        const gapWidth = 16;
        const numberOfItem = 3;
        carousel.style.width = Carousel.computePreferWidth(carousel, gutterWidth, gapWidth, numberOfItem);
    } else if (windowWidth >= 1200) {
        const gutterWidth = 32;
        const gapWidth = 16;
        const numberOfItem = 2;
        carousel.style.width = Carousel.computePreferWidth(carousel, gutterWidth, gapWidth, numberOfItem);
    } else {
        carousel.style.width = 'auto';
    }
}


bindGalleryCarouselHtml();
adjustCarouselWidth();

window.addEventListener('resize', adjustCarouselWidth);

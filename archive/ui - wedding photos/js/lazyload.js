
// https://github.com/tuupola/jquery_lazyload
function lazyloadOld(images) {
    let observerConfig = {
        root: null,
        rootMargin: '0px',
        threshold: [0]
    };
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                // Lấy đối tượng img
                let img = entry.target;

                // Bỏ không theo dõi nữa
                observer.unobserve(img);

                // Cập nhật ảnh
                img.src = img.dataset.src;
            }
        });
    }, observerConfig);

    images.forEach(img => {
        observer.observe(img);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    let images = [...document.querySelectorAll('img[data-src]')];
    let processing = false;
	let threshold = 200;

    function createPrefetchLinks() {
        images.forEach(e => {
            let prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = e.dataset.src;
            document.body.appendChild(prefetchLink);
        });
    }

    function lazyLoad() {
        if (processing === false) {
            processing = true;

            setTimeout(() => {
                images.forEach((img) => {
                    let rect = img.getBoundingClientRect();
                    //if (rect.top <= window.innerHeight && rect.bottom >= 0) {
					if (rect.top <= window.innerHeight + threshold) {
                        // Cập nhật ảnh
                        img.src = img.dataset.src;

                        // Loại bỏ ảnh khỏi danh sách
                        images = images.filter((e) => {
                            return e !== img;
                        });

                        // Nếu đã load hết thì giải phóng tài nguyên
                        if (images.length === 0) {
                            document.removeEventListener('scroll', lazyLoad);
                            window.removeEventListener('resize', lazyLoad);
                            window.removeEventListener('orientationchange', lazyLoad);
                        }
                    }
                });

                processing = false;
            }, 20);
        }
    }

    document.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationchange', lazyLoad);

    createPrefetchLinks();

    // Gọi luôn, có những ảnh cần hiển thị
    lazyLoad();
});
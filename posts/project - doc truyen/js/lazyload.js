// https://github.com/tuupola/jquery_lazyload
function lazyload(images) {
    // Cập nhật lại source của ảnh
    var updateImageSource = function (img) {
        img.src = img.getAttribute("data-src")
    }

    // Nếu không hỗ trợ đối tượng IntersectionObserver thì load bình thường
    if (!window.IntersectionObserver) {
        images.forEach(function (img) {
            updateImageSource(img)
        })
        return
    }

    // Khởi tạo đối tượng IntersectionObserver
    let observerConfig = {
        root: null,
        rootMargin: "0px",
        threshold: [0]
    }
    let observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio > 0) {
                // Lấy đối tượng img
                let img = entry.target

                // Bỏ không theo dõi nữa
                observer.unobserve(img)

                // Cập nhật ảnh
                updateImageSource(img)
            }
        })
    }, observerConfig)

    // Theo dõi các ảnh
    images.forEach(function (img) {
        observer.observe(img)
    })
}
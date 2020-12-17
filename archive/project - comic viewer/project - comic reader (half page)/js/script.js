/**
 * Load ảnh.
 * @param {String} url Đường dẫn
 */
function loadImage(url) {
    const img = document.createElement('img');
    const viewer = document.querySelector('#viewer');

    img.onload = () => {
        const width = img.width;
        const height = img.height;
        const ratio = width / height;

        if (width < 300 || ratio < 1) {
            // Nếu ảnh nhỏ hoặc kiểu portrait
            img.classList.add('single');
            img.classList.add('mx-auto');
        } else {
            // Nếu ảnh kiểu landscape thì tách làm 2 ảnh
            img.classList.add('second');
            img.classList.add('border-bottom');

            // Thêm ảnh phía trước
            const previousImg = document.createElement('img');
            previousImg.src = url;
            previousImg.className = 'h-auto d-block mb-2 first';
            viewer.insertBefore(previousImg, img);
        }
    };

    img.src = url;
    img.className = 'h-auto d-block mb-2';

    viewer.appendChild(img);
}


function init() {
    images.forEach(url => {
        loadImage(url);
    });
}

init();

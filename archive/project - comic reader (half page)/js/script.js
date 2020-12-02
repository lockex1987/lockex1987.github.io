const displayHalf = true;

const loadImage = (url) => {
    const img = document.createElement('img');
    const frame = document.querySelector('#frame');

    img.onload = () => {
        const width = img.width;
        const height = img.height;
        const ratio = width / height;

        if (width < 300 || ratio < 1) {
            img.classList.add('single');
            img.classList.add('mx-auto');
        } else {
            img.classList.add('second');
            img.classList.add('border-bottom');

            // Thêm ảnh
            const firstImg = document.createElement('img');
            firstImg.src = url;
            firstImg.className = 'h-auto d-block mb-2 ' + 'first';
            frame.insertBefore(firstImg, img);
        }
    };

    img.src = url;
    img.className = 'h-auto d-block mb-2';

    frame.appendChild(img);
};


const init = () => {
    images.forEach(url => {
        loadImage(url);
    });
};

init();

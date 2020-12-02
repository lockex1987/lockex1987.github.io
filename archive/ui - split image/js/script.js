const splitImage = (url, row, column) => {
    const theImage = new Image();

    theImage.onload = () => {
        const tileWidth = theImage.width / column;
        const tileHeight = theImage.height / row;
        const gallery = document.querySelector('#gallery');

        for (let y = 0; y < row; y++) {
            for (let x = 0; x < column; x++) {
                const canvas = document.createElement('canvas');
                canvas.width = tileWidth;
                canvas.height = tileHeight;

                const context = canvas.getContext('2d');
                context.drawImage(theImage,
                    x * tileWidth,
                    y * tileHeight,
                    tileWidth,
                    tileHeight,
                    0,
                    0,
                    tileWidth,
                    tileHeight
                );

                const img = document.createElement('img');
                img.className = 'd-block mb-1';
                img.src = canvas.toDataURL('image/png');
                gallery.appendChild(img);
            }
        }
    };

    theImage.src = url;
};

splitImage('images/red_green_blue_yellow.png', 1, 4);
splitImage('images/football.jpg', 4, 1);
splitImage('images/truyentranh.jpg', 1, 2);

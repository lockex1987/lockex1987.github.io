/**
 * Tách một ảnh thành nhiều ảnh con.
 * @param {String} url Đường dẫn
 * @param {Integer} row Số hàng
 * @param {Integer} column Số cột
 */
function splitImage(url, row, column) {
    const theImage = new Image();

    theImage.onload = () => {
        const tileWidth = theImage.width / column;
        const tileHeight = theImage.height / row;

        for (let y = 0; y < row; y++) {
            for (let x = 0; x < column; x++) {
                const canvas = document.createElement('canvas');
                canvas.width = tileWidth;
                canvas.height = tileHeight;

                const context = canvas.getContext('2d');
                context.drawImage(
                    theImage,
                    x * tileWidth,
                    y * tileHeight,
                    tileWidth,
                    tileHeight,
                    0,
                    0,
                    tileWidth,
                    tileHeight
                );

                // Tạo thẻ img
                const img = document.createElement('img');
                img.className = 'd-block mb-1';
                img.src = canvas.toDataURL('image/png');

                const gallery = document.querySelector('#gallery');
                gallery.appendChild(img);
            }
        }
    };

    theImage.src = url;
}

splitImage('images/red_green_blue_yellow.png', 1, 4);
splitImage('images/football.jpg', 4, 1);
splitImage('images/truyentranh.jpg', 1, 2);

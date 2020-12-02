var preferedWidth = Math.min(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth,
    900
) - 20;

// Doi tuong canvas va context
var canvas = document.getElementById('canvas');
canvas.width = preferedWidth;
canvas.height = preferedWidth * 9 / 16;
var ctx = canvas.getContext('2d');

window.onload = function () {
    // Lay tat ca hinh anh
    var images = document.querySelectorAll('#slider img');
    // Vi tri hinh anh
    var currentImage = 0;
    var img = images[currentImage];

    // Ty le zoom
    const START_RATIO = 1000;
    const END_RATIO = 1500;
    const BASE_RATIO = 1000;
    var ratio = START_RATIO;



    // Kich thuoc canvas
    var x = 0;
    var y = 0;
    var width = canvas.width;
    var height = canvas.height;

    // Bat dau animation
    update();

    // Animation
    function update() {
        // Tang ty le zoom
        ratio++;
        // Neu ty le zoom qua cao thi reset lai
        if (ratio > END_RATIO) {
            ratio = START_RATIO;

            // Chuyen hinh anh
            currentImage++;
            if (currentImage >= images.length) {
                currentImage = 0;
            }
            img = images[currentImage];
        }

        // Tinh lai cac kich thuoc
        // Formula: width = (ratio / BASE_RATIO) * (width - 2 * sx);
        // => sx = (img.width - img.width / (ratio / BASE_RATIO)) / 2;
        var sx = img.width * (1 - BASE_RATIO / ratio) / 2;
        var sy = img.height * (1 - BASE_RATIO / ratio) / 2;
        var swidth = img.width * BASE_RATIO / ratio;
        var sheight = img.height * BASE_RATIO / ratio;

        // Ve hinh anh
        ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);

        // Tiep tuc animation
        requestAnimationFrame(update);
        //setTimeout(update, 20); // setTimeout cung dung lai khi tab inactive (test tren Firefox)
    }
};
function canvasFromImage(imageUrl, callback) {
    let img = new Image();
    img.addEventListener('load', () => {
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        callback(img, canvas, ctx);
    });

    img.src = imageUrl;
}

function invertColor() {
    canvasFromImage('images/rhino.jpg', (img, canvas, ctx) => {
        let demoDiv = document.querySelector('#invertColorDemo');
        demoDiv.appendChild(img);
        demoDiv.appendChild(canvas);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        document.querySelector('#invertbtn').addEventListener('click', () => {
            for (let i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];     // red
                data[i + 1] = 255 - data[i + 1]; // green
                data[i + 2] = 255 - data[i + 2]; // blue
                //data[i + 3] = 255;
            }
            ctx.putImageData(imageData, 0, 0);
        });
    });
}

function grayscale() {
    canvasFromImage('images/rhino.jpg', (img, canvas, ctx) => {
        let demoDiv = document.querySelector('#grayscaleDemo');
        demoDiv.appendChild(img);
        demoDiv.appendChild(canvas);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        document.querySelector('#grayscalebtn').addEventListener('click', () => {
            for (let i = 0; i < data.length; i += 4) {
                let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg; // red
                data[i + 1] = avg; // green
                data[i + 2] = avg; // blue
            }
            ctx.putImageData(imageData, 0, 0);
        });
    });
}

function colorPicker() {
    canvasFromImage('images/logo.png', (img, canvas, ctx) => {
        let demoDiv = document.querySelector('#colorPickerDemo');
        demoDiv.appendChild(canvas);

        let color = document.getElementById('color');
        canvas.addEventListener('mousemove', (evt) => {
            let x = evt.layerX;
            let y = evt.layerY;
            let pixel = ctx.getImageData(x, y, 1, 1);
            let data = pixel.data;
            let rgba = 'rgba(' + data[0] + ', ' + data[1] + ', ' + data[2] + ', ' + (data[3] / 255) + ')';
            color.style.background = rgba;
            color.textContent = rgba;
        });
    });
}

function isWhiteColor(red, green, blue) {
    return (red == 255 && green == 255 && blue == 255);
}

function convertWhiteToTransparent() {
    canvasFromImage('images/logo.png', (img, canvas, ctx) => {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            let red = data[i];
            let green = data[i + 1];
            let blue = data[i + 2];
            let alpha = data[i + 3];
            
            if (isWhiteColor(red, green, blue)) {
                data[i + 3] = 0;
            }
        }
        ctx.putImageData(imageData, 0, 0);

        let transparentImage = new Image();
        transparentImage.src = canvas.toDataURL('image/png');

        let demoDiv = document.querySelector('#filterDemo');
        demoDiv.appendChild(img);
        demoDiv.appendChild(transparentImage);
    });
}


invertColor();
grayscale();
colorPicker();
convertWhiteToTransparent();

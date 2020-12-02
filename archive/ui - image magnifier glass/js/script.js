function getCursorPos(evt, element) {
    evt = evt || window.event;
    
    // Get the x and y positions of the image
    let a = element.getBoundingClientRect();

    // Calculate the cursor's x and y coordinates, relative to the image
    let x = evt.pageX - a.left;
    let y = evt.pageY - a.top;
    
    // Consider any page scrolling
    x -= window.pageXOffset;
    y -= window.pageYOffset;

    return {
        x,
        y
    };
}

function magnify(img, glass, zoom) {
    // Execute a function when someone moves the magnifier glass over the image
    // and also for touch screens
    glass.addEventListener('mousemove', moveMagnifier);
    img.addEventListener('mousemove', moveMagnifier);
    glass.addEventListener('touchmove', moveMagnifier);
    img.addEventListener('touchmove', moveMagnifier);

    function moveMagnifier(evt) {
        let bw = 3;
        let w = glass.offsetWidth / 2;
        let h = glass.offsetHeight / 2;

        // Get the cursor's x and y positions
        let { x, y } = getCursorPos(evt, img);

        // Prevent the magnifier glass from being positioned outside the image
        if (x > img.width - (w / zoom)) {
            x = img.width - (w / zoom);
        }
        if (x < w / zoom) {
            x = w / zoom;
        }
        if (y > img.height - (h / zoom)) {
            y = img.height - (h / zoom);
        }
        if (y < h / zoom) {
            y = h / zoom;
        }
        
        // Set the position of the magnifier glass
        glass.style.left = (x - w) + 'px';
        glass.style.top = (y - h) + 'px';

        // Display what the magnifier glass 'sees'
        glass.style.backgroundPosition = '-' + ((x * zoom) - w + bw) + 'px -' + ((y * zoom) - h + bw) + 'px';

        // Set background properties for the magnifier glass
        glass.style.backgroundImage = 'url("' + img.src + '")';
        glass.style.backgroundSize = (img.width * zoom) + 'px ' + (img.height * zoom) + 'px';
    }
}

// Initiate Magnify Function with the id of the image, and the strength of the magnifier glass
magnify(
    document.getElementById('theImage'),
    document.getElementById('theGlass'),
    3
);

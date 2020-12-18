/* CONSTANTS */
const galleryContainer = document.querySelector(".gallery-container");
const thumbnailContainer = document.querySelector(".thumbnail-container");
const numberOfImages = 6;
const scrollSpeed = 3;
const slildeData = [
    {
        title: 'Images',
        images: [
            'https://picsum.photos/200/300',
            'https://picsum.photos/200/310',
            'https://picsum.photos/200/320',
            'https://picsum.photos/200/330',
            'https://picsum.photos/200/340',
            'https://picsum.photos/200/350',
            'https://picsum.photos/200/360',
            'https://picsum.photos/200/370',
            'https://picsum.photos/200/380',
            'https://picsum.photos/200/390'
        ]
    }
];

/* VARIABLES */
let galleryWidth, thumbnailWidth;  // These get recalculated on resize so they need to be variable
let activeImage = 3;               // This will change when a thumbnail is clicked;

/**
  * @desc Main initializing function
*/
function init() {
    loadThumbnails(slildeData[0].images);
    selectThumbnail(activeImage);
}
init();

/**
  * @desc Load the thumbnails for a specific gallery
  * @param string images - an array of image paths, must be valid image URL's
*/
function loadThumbnails(images) {
    updateWidths();       // Make sure the widths are set

    images.forEach(image => {
        thumbnailContainer.append(createThumbnailElement(image, thumbnailWidth));
    });
}

/**
  * @desc De-select the active thumbnail
*/
function deselectActiveThumbnail() {
    const ACTIVE = document.querySelector(".thumbnail.active")
    if (ACTIVE !== null) ACTIVE.classList.remove("active");
}

/* CONTROLS */
let isDown = false;
let keyDown = false;
let startX = 0;
let endX;
let timestamp = 0;
let vX = 0;
let velocity = 0;
let friction = 0.7;
let maxSpeed = 200;

// Event Listeners
/*
thumbnailContainer.addEventListener('touchstart', handleInputDown);
thumbnailContainer.addEventListener('touchmove', handleInputMove);
thumbnailContainer.addEventListener('touchend', handleInputEnd);
*/

thumbnailContainer.addEventListener('mousedown', handleInputDown);
thumbnailContainer.addEventListener('mousemove', handleInputMove);
//thumbnailContainer.addEventListener('mouseleave', handleInputEnd);
thumbnailContainer.addEventListener('mouseup', handleInputEnd);

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Handler Functions
/**
  * @desc Used for when an input is detected. This way I am hoping
  * to have one function that I can use for both mouse and touch.
*/
function handleKeyDown(e) {
    e.preventDefault();
    keyDown = true;
    if (e.code === 'ArrowRight') {
        velocity = -100;
    } else if (e.code === 'ArrowLeft') {
        velocity = 100;
    }
    thumbnailContainer.classList.add('active');
}

/**
  * @desc Called when the user releases a key
*/
function handleKeyUp() {
    keyDown = false;
    thumbnailContainer.classList.remove('active');
}

/**
  * @desc Handles input down, can be called by a touch or mouse event
*/
function handleInputDown(e) {
    e.preventDefault();
    isDown = true;
    velocity = 0;   // This is needed to prevent glitchy movement
    thumbnailContainer.classList.add('active');
    startX = getTranslateX(thumbnailContainer);
}

/**
  * @desc Handles input end, used for mouse or touch events
*/
function handleInputEnd() {
    isDown = false;
    startX = endX;
    thumbnailContainer.classList.remove('active');
}

/**
  * @desc Handles input movement, used for mouse or touch events
*/
function handleInputMove(e) {
    if (!isDown) return;
    e.preventDefault();

    var now = performance.now();

    // Mouse event or Touch event
    if (e.pageX !== undefined) {
        currentX = e.pageX;
    } else {
        currentX = e.touches[0].pageX;
    }

    var dt = now - timestamp;
    var distance = currentX - vX;
    var speed = Math.round(distance / dt * 1000);

    if (speed > maxSpeed) {
        speed = maxSpeed;
    } else if (speed < -maxSpeed) {
        speed = -maxSpeed;
    }

    velocity = checkVelocityRange(speed);
    vX = currentX;
    timestamp = now;
}

/* PHYSICS BASED SCOLLING */

/**
  * @desc Set the velocity based on the mouse or touch movement
*/
function scrollGallery() {
    let newPos = getTranslateX(thumbnailContainer) + velocity;
    let maxTranslate = thumbnailContainer.offsetWidth - galleryContainer.offsetWidth

    if (newPos > 0) {
        newPos = 0;
        velocity = 0;
    } else if (newPos < -maxTranslate) {
        newPos = -maxTranslate;
        velocity = 0;
    }

    thumbnailContainer.style.transform = `translateX(${newPos}px)`;
}
setInterval(scrollGallery, 100); // calculate the new position ever 100th of a second

/**
  * @desc Always apply friction to velocity if velocity is not 0.
  * This will make the gallery slow down over time when the mouse
  * or touch ends
*/
function applyFriction() {
    if (keyDown) return; // disable friction if using arrow keys
    velocity *= friction;
    // Set the velocity to 0 if it is less then 1 (-/+)
    if (velocity < 1 && velocity > -1) {
        velocity = 0;
    };
}
setInterval(applyFriction, 100); // apply friction every 100th of a second


/**
  * @desc Make sure the velocity is less then the maximum speed (-/+)
*/
function checkVelocityRange(velocity) {
    if (velocity > maxSpeed) return maxSpeed;
    if (velocity < -maxSpeed) return -maxSpeed;
    return velocity;
}

/* SELECTING THUMBNAILS */

/**
  * @desc Click handler for thumbnails
  * @param HTMLObject - The thumbnail element that was clicked
*/
function thumbnailClickHandler(thumbnail) {
    selectThumbnail(getPosition(thumbnail));
}

/**
  * @desc Select a specific thumbnail by index
  * @param integer num - Index of the thumbnail to be selected
*/
function selectThumbnail(num) {
    deselectActiveThumbnail();        // Deselect the previously selected image
    document.querySelector(`.thumbnail:nth-child(${num + 1})`).classList.add('active');
}

/* HELPER FUNCTIONS */

/**
  * @desc Update the widths based on the number of images
*/
function updateWidths() {
    galleryWidth = getElementWidth('.gallery-container');
    thumbnailWidth = galleryWidth / numberOfImages;
}

/**
  * @desc Get the width of an element
  * @param string selector - a class or id used to reference an element i.e. '.myClass'
*/
function getElementWidth(selector) {
    return document.querySelector(selector).offsetWidth;
}

/**
  * @desc Create a THUMBNAIL html div element.
  * @param string src - a path to an image
  * @param string width - the width that the thumbnail should be
*/
function createThumbnailElement(src, width) {
    const THUMBNAIL = document.createElement("div");
    THUMBNAIL.classList.add('thumbnail');
    THUMBNAIL.style.width = `${width}px`;
    THUMBNAIL.setAttribute("data-src", src);
    THUMBNAIL.setAttribute("onClick", 'thumbnailClickHandler(this)');

    const IMG = getImage(src);
    const IMG_REFLECT = getImage(src);

    THUMBNAIL.innerHTML = IMG.outerHTML;
    THUMBNAIL.append(IMG_REFLECT);

    return THUMBNAIL; //returns html div
}

/**
  * @desc Create an IMAGE element
  * @param string src - a path to an image
*/
function getImage(src) {
    let img = document.createElement("img");
    img.src = src;

    return img;
}

/**
  * @desc Sets the thumbnail sizes and updates the widths on window resize
*/
function setThumbnailSize() {
    const THUMBNAILS = document.querySelectorAll(".thumbnail");

    updateWidths();
    THUMBNAILS.forEach((thumbnail) => {
        thumbnail.style.width = `${thumbnailWidth}px`;
    });
    thumbnailContainer.style.transform = `translateX(-${thumbnailWidth}px)`;
}

window.onresize = setThumbnailSize;  // Call this function on window resize

/**
  * @desc Get the index position of an element based on its siblings
  * @param HTMLElement element - The element to find the position of
*/
function getPosition(element) {
    var i = 0;
    while ((element = element.previousSibling) != null) // false only if there is no element before
        i++;

    return i;
}

/**
  * @desc Used to determine the translateX property of an element. returns 0 if not defined
  * @param HTMLElement element - The element to find translateX value of
*/
function getTranslateX(element) {
    var style = window.getComputedStyle(element);
    var matrix = new WebKitCSSMatrix(style.webkitTransform);
    return matrix.m41;
}
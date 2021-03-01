// Global variables used to track status.
let curHeight = 0;
let curPos = 0;
let newPos = 0;
let mouseStatus = 'up';

// This function gets the original div height.
function setPos(e) {
    // For handling events in ie vs. w3c
    curevent = (typeof event == 'undefined' ? e : event);
    // Sets mouse flag as down.
    mouseStatus = 'down';
    // Gets position of click.
    curPos = curevent.clientY;
    // Accepts height of the div.
    tempHeight = document.getElementById('mydiv').style.height;
    // These lines split the height value from the 'px' units.
    heightArray = tempHeight.split('p');
    curHeight = parseInt(heightArray[0]);
}

// This changes the height of the div while the mouse button is depressed.
function getPos(e) {
    if (mouseStatus == 'down') {
        curevent = (typeof event == 'undefined' ? e : event);
        // Get new mouse position.
        newPos = curevent.clientY;
        // Calculate movement in pixels.
        const pxMove = parseInt(newPos - curPos);
        // Determine new height.
        let newHeight = parseInt(curHeight + pxMove);
        // Conditional to set minimum height to 5.
        newHeight = (newHeight < 5) ? 5 : newHeight;
        // Set the new height of the div.
        document.getElementById('mydiv').style.height = newHeight + 'px';
    }
}

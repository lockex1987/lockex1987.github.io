import {
    isFullscreen,
    exitFullscreen,
    toggleFullscreen,
    addFullscreenListener
} from './fullscreen.js';

const imageElement = document.querySelector('#myImage');

document.addEventListener('keydown', (evt) => {
    const key = evt.key.toLowerCase();
    if (key === 'f') {
        toggleFullscreen(imageElement);
    } else if (key === 'escape') {
        exitFullscreen();
    }
});

addFullscreenListener(() => {
    console.log(isFullscreen() ? 'Full' : 'Not');
});

document.querySelector('#theButton').addEventListener('click', () => {
    toggleFullscreen(imageElement);
});

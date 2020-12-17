function toggleFullScreen() {
    if (!document.fullscreenElement) {
        const imageElement = document.querySelector('#myImage');
        imageElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener('keydown', (evt) => {
    const key = evt.key.toLowerCase();
    if (key === 'f') {
        toggleFullScreen();
    } else if (key === 'escape') {
        document.exitFullscreen();
    }
});

document.addEventListener('fullscreenchange', () => {
    console.log(document.fullscreenElement ? 'Full' : 'Not');
});

document.querySelector('#theButton').addEventListener('click', () => {
    toggleFullScreen();
});

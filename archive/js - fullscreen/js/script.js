let videoElement = document.querySelector('#myImage');

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        videoElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener('keydown', (evt) => {
    if (evt.keyCode == 13) {
        toggleFullScreen();
    }
});

document.addEventListener('fullscreenchange', () => {
    console.log(document.fullscreenElement ? 'Full' : 'Not');
});

videoElement.addEventListener('click', () => {
    toggleFullScreen();
});

alert(1);


import Playlist from './Playlist.js';

function init() {
    new Vue({
        el: '#app',
        ...Playlist
    });
}

// window.onYouTubeIframeAPIReady = init;
init();


/**
 * Sửa lỗi 100vh trên thiết bị iOS Safari:
 *   https://viblo.asia/p/sua-loi-100vh-tren-thiet-bi-ios-safari-gGJ59GEjZX2.
 */
function calculateWindowHeight() {
    const doc = document.documentElement;
    doc.style.setProperty('--window-height', `${window.innerHeight}px`);
}

window.addEventListener('resize', calculateWindowHeight);
calculateWindowHeight();

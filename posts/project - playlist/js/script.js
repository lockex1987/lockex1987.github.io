import Playlist from './Playlist.js';

function init() {
    new Vue({
        el: '#app',
        ...Playlist
    });
}

window.onYouTubeIframeAPIReady = init;

import Playlist from './Playlist.js';


// Thêm trường idx
chapters.forEach((e, idx) => {
    e.idx = idx;
});


new Vue({
    el: '#app',
    ...Playlist
});

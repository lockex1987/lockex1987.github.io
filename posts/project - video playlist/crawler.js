var playlist = [];
document.querySelectorAll('ytd-playlist-video-renderer').forEach(div => {
    var image = div.querySelector('yt-img-shadow img').src;
    var duration = div.querySelector('.ytd-thumbnail-overlay-time-status-renderer').textContent.trim();
    var title = div.querySelector('#video-title').textContent.trim();
    playlist.push({
        title,
        duration,
        image
    });
});
console.log(JSON.stringify(playlist, null, 2));

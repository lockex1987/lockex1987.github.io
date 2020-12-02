function enableVietnameseSubtitle() {

    const vietnameseTrack = document.querySelector('track[srclang=vi]');
    console.log(vietnameseTrack);
    const theVideo = document.querySelector('video');

    /*
    document.querySelectorAll('track').forEach(track => {
        track.mode = 'hidden';
    });
    vietnameseTrack.mode = 'showing';
    vietnameseTrack.default = true; // 'default';
    */

    theVideo.textTracks[10].mode = 'showing';
}
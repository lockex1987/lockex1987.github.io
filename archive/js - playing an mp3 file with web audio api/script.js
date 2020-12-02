function initAudioPlayer(audioUrl) {
    var audioContext = new AudioContext();

    window.fetch(audioUrl)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            console.log('Loaded');
            const playButton = document.querySelector('#play');
            playButton.disabled = false;
            playButton.addEventListener('click', () => play(audioBuffer));
        });

    function play(audioBuffer) {
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
    }
}

initAudioPlayer('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3');

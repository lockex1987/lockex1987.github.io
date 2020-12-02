/**
 * TODO: Sử dụng Svelte, tách thành các component.
 * Sau đó, build ra các file CSS và JS.
 */
function createMediaPlayer(cssSelector) {

    // Thẻ audio hoặc video (nguồn của player)
    const mediaTag = document.querySelector(cssSelector);

    // Thẻ span chứa dòng phụ đề
    let baseText;

    // Dòng span chứa nội dung tương tự phụ đề để tạo hiệu ứng karaoke
    let karaokeText;

    // Các dòng phụ đề
    let lines;

    // Có hiển thị karaoke hay không
    const shouldDisplayKaraoke =
        mediaTag.tagName.toLowerCase() == 'audio' ?
            (mediaTag.getAttribute('data-karaoke') == 'false' ? false : true) :
            false;

    /*
    $(mediaTag).on("durationchange loadedmetadata loadeddata progress canplay canplaythrough", function () {
        if (this.readyState == 4) {
            var loaded = this.buffered.end(0)
            $("#player .buffer").css("width", `${loaded / this.duration * 100}%`)
        }
    })
    */

    // Nút play và pause
    let playButton;
    let pauseButton;

    // Nút mute
    let volumeButton;

    // Nút full-screen
    let fullScreenButton;

    // Nút subtitle
    let subtitleButton;

    // Hiển thị thời gian hiện tại
    let currentTime;

    // Hiển thị tổng thời gian
    let durationTime;

    // Thanh track
    let timeline;

    // Thanh process
    let barProcess;

    // Đang chạy đến chỗ nào rồi
    let playHead;

    // Boolean value so that audio position is updated only when the playHead is released
    let onplayHead = false;

    function buildGui() {
        // Ẩn thẻ
        mediaTag.controls = false;

        let mediaPlayer = document.createElement('div');
        mediaPlayer.innerHTML = `                  
                <div class="media-player">
                    <div class="subtitle-wrapper">
                        <span class="subtitle">
                            <span class="base"></span>
                            <span class="karaoke"></span>
                        </span>
                    </div>

                    <div class="player-controls">
                        <div>
                            <button class="play-button xfas xfa-play mx-1">
                                <svg width="16px" height="16px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="#4E4E50">
                                        <path d="M16 10v28l22-14z"/>
                                    </g>
                                </svg>                        
                            </button>

                            <button class="pause-button xfas xfa-pause mx-1" style="display: none">
                                <svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                    <g fill="#4E4E50" transform="translate(-576.000000, -144.000000)">
                                        <path d="M580,146 L583,146 L583,158 L580,158 Z M585,146 L588,146 L588,158 L585,158 Z M585,146"/>
                                    </g>
                                </svg>
                            </button>
                        </div>

                        <div class="time-info">
                            <span class="current-time">0:00</span> / <span class="duration-time">0:00</span>
                        </div>
                        <div class="timeline">
                            <div class="bar-process" style="width: 0px"></div>
                            <div class="play-head d-none" style="left: 0px"></div>
                        </div>
                        <div style="display: none">
                            <button class="volume-button fas fa-volume-up"></button>
                        </div>
                        <div style="displayX: none">
                            <button class="full-screen-button xfas xfa-expand-arrows-alt mx-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                    <g fill="#4E4E50">
                                        <path d="M 4 4 L 4 13 L 6 13 L 6 7.4375 L 14.5625 16 L 6 24.5625 L 6 19 L 4 19 L 4 28 L 13 28 L 13 26 L 7.4375 26 L 16 17.4375 L 24.5625 26 L 19 26 L 19 28 L 28 28 L 28 19 L 26 19 L 26 24.5625 L 17.4375 16 L 26 7.4375 L 26 13 L 28 13 L 28 4 L 19 4 L 19 6 L 24.5625 6 L 16 14.5625 L 7.4375 6 L 13 6 L 13 4 Z"/>
                                    </g>
                                </svg>
                            </button>
                        </div>

                        <div style="display: none">
                            <button class="subtitle-button fas fa-closed-captioning"></button>
                        </div>
                    </div>
                </div>`;
        mediaTag.parentNode.appendChild(mediaPlayer);
        mediaTag.parentNode.classList.add('media-container');

        baseText = mediaPlayer.querySelector('.subtitle .base');
        karaokeText = mediaPlayer.querySelector('.subtitle .karaoke');
        playButton = mediaPlayer.querySelector('.play-button');
        pauseButton = mediaPlayer.querySelector('.pause-button');
        volumeButton = mediaPlayer.querySelector('.volume-button');
        fullScreenButton = mediaPlayer.querySelector('.full-screen-button');
        subtitleButton = mediaPlayer.querySelector(".subtitle-button");
        currentTime = mediaPlayer.querySelector(".current-time");
        durationTime = mediaPlayer.querySelector(".duration-time");
        timeline = mediaPlayer.querySelector(".timeline");
        barProcess = mediaPlayer.querySelector(".bar-process");
        playHead = mediaPlayer.querySelector(".play-head");

        subtitleButton.parentNode.style.display = "none";
        if (mediaTag.tagName.toLowerCase() == "audio") {
            fullScreenButton.parentNode.style.display = "none";
        }
    }

    function initSubtitle() {
        let hasSubtitle = false;

        // Trên TV bị lỗi
        let tracks = mediaTag.querySelectorAll('track');
        if (tracks) {
            // tracks.forEach(function (track) {});
            for (let i = 0; i < tracks.length; i++) {
                let track = tracks[i];
                hasSubtitle = true;

                if (track.default) {
                    fetch(track.src)
                        .then(res => res.text())
                        .then(response => {
                            // console.log(response);
                            // console.log(track.getAttribute('data-type'));
                            if (track.getAttribute('data-type') == 'lrc') {
                                lines = parseLrcText(response);
                            } else if (track.getAttribute('data-type') == 'srt') {
                                lines = parseSrtText(response);
                            }

                            console.log(lines);
                        })
                        .catch(error => alert(error));
                }
            }
        }

        if (!hasSubtitle) {
            baseText.parentNode.parentNode.style.display = 'none';
        }
    }

    function updateSubtitleText() {
        if (!lines) {
            return;
        }

        // Tìm ra phần tử đầu tiên mà lớn hơn
        var idx = lines.findIndex(findCurrentLine);
        if (idx >= 0) {
            baseText.innerHTML = lines[idx].text;
            if (shouldDisplayKaraoke) {
                karaokeText.innerHTML = lines[idx].text;
            }

            // Để chỗ update màu ở đây thì bị chạy giật cục
            // vì hàm này được gọi ít lần
        } else {
            baseText.innerHTML = '';
            if (shouldDisplayKaraoke) {
                karaokeText.innerHTML = '';
            }
        }
    }

    function disableNativeSubtitles() {
        for (var i = 0; i < mediaTag.textTracks.length; i++) {
            mediaTag.textTracks[i].mode = "hidden";
        }
    }

    function findCurrentLine(e) {
        // Nên cho xuất hiện sớm trước khoảng 0.5 giây?
        // Giới hạn xuất hiện tối đa chỉ trong 3 giây?
        if (e.start <= mediaTag.currentTime && mediaTag.currentTime < e.end) {
            return true;
        }
        return false;
    }

    function updateCurrentLineProgress() {
        if (lines) {
            var current = lines.find(findCurrentLine);
            if (current) {
                // Tính phần trăm của hiện tại
                if (current.end > 0) {
                    var percent =
                        ((mediaTag.currentTime - current.start) * 100) /
                        (current.end - current.start);
                    karaokeText.style.width = percent + "%";
                    // console.log(percent);
                }
            }
        }

        window.requestAnimationFrame(updateCurrentLineProgress);
    }

    // Timeline width adjusted for playHead
    // Nếu tạo biến thế này thì khi resize sẽ phải tính lại
    // Nên khi nào sử dụng thì tính lại
    function getTimelineWidth() {
        return timeline.offsetWidth - playHead.offsetWidth;
    }

    /**
     * Play hoặc pause.
     */
    function playPauseAudio() {
        if (mediaTag.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
    }

    /**
     * Play.
     */
    function playAudio() {
        playButton.style.display = 'none';
        pauseButton.style.display = '';
        mediaTag.play();
    }

    /**
     * Pause.
     */
    function pauseAudio() {
        playButton.style.display = '';
        pauseButton.style.display = 'none';
        mediaTag.pause();
    }

    function updateMuteVolume() {
        if (mediaTag.volume == 0) {
            mediaTag.volume = 1;
            //mediaTag.muted = false;
            volumeButton.className = "volume-button fas fa-volume-up";
        } else {
            mediaTag.volume = 0;
            //mediaTag.muted = true;
            volumeButton.className = "volume-button fas fa-volume-mute";
        }
    }

    /**
     * Hiển thị thời gian hiện tại.
     * Hiển thị progress được bao nhiêu phần trăm.
     * Nếu mà đã xong thì hiển thị nút play.
     */
    function timeUpdate() {
        if (!isNaN(mediaTag.duration)) {
            currentTime.textContent = secondToMinutes(mediaTag.currentTime);
            durationTime.textContent = secondToMinutes(mediaTag.duration);

            var timelineWidth = getTimelineWidth();
            var newMargLeft = timelineWidth * (mediaTag.currentTime / mediaTag.duration);
            updateProgressPosition(newMargLeft);

            if (mediaTag.currentTime == mediaTag.duration) {
                playButton.style.display = '';
                pauseButton.style.display = 'none';
            }
        }
    }

    /**
     * Đổi số giây thành định dạng mm:ss.
     */
    function secondToMinutes(seconds) {
        seconds = Math.round(seconds);
        var numMinutes = Math.floor(seconds / 60);
        var numSeconds = seconds % 60;
        numSeconds = numSeconds >= 10 ? numSeconds : "0" + numSeconds;
        return numMinutes + ":" + numSeconds;
    }

    /**
     * Hiển thị tổng thời gian.
     */
    function updateDuration() {
        if (!isNaN(mediaTag.duration)) {
            durationTime.textContent = secondToMinutes(mediaTag.duration);
        }
    }

    /**
     * mousemove EventListener.
     * Moves playHead as user drags
     */
    function movePlayHead(event) {
        var newMargLeft = event.clientX - getPosition(timeline);
        updateProgressPosition(newMargLeft);
    }

    function updateProgressPosition(newMargLeft) {
        if (newMargLeft < 0) {
            newMargLeft = 0;
        } else {
            var timelineWidth = getTimelineWidth();
            if (newMargLeft > timelineWidth) {
                newMargLeft = timelineWidth;
            }
        }

        playHead.style.left = newMargLeft + "px";
        barProcess.style.width = newMargLeft + "px";
    }

    /**
     * Returns click as decimal (.77) of the total timeline width.
     */
    function clickPercent(event) {
        //var pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft + this.offsetParent.offsetParent.offsetLeft)) / this.offsetWidth;
        var timelineWidth = getTimelineWidth();
        return (event.clientX - getPosition(timeline)) / timelineWidth;
    }

    /**
     * Returns elements left position relative to top-left of viewport.
     * @param el
     */
    function getPosition(el) {
        return el.getBoundingClientRect().left;
    }

    function updateCurrentTime(event) {
        if (!isNaN(mediaTag.duration)) {
            mediaTag.currentTime = mediaTag.duration * clickPercent(event);
        }
    }

    /**
     * Đánh dấu đang click vào playHead.
     * Khi move thì cập nhật vị trí playHead.
     * Tạm bỏ sự kiện cập nhật timeUpdate.
     */
    function mouseDown() {
        onplayHead = true;
        window.addEventListener("mousemove", movePlayHead, true);
        mediaTag.removeEventListener("timeupdate", timeUpdate);
    }

    /**
     * Nếu đang drag playHead và bỏ ra thì:
     * - Thêm sự kiện cập nhật timeUpdate
     * - Bỏ sự kiện move của window
     */
    function mouseUp(event) {
        if (onplayHead == true) {
            movePlayHead(event);
            updateCurrentTime(event);

            window.removeEventListener("mousemove", movePlayHead, true);
            mediaTag.addEventListener("timeupdate", timeUpdate);
        }
        onplayHead = false;
    }

    function handleFullscreen() {
        // If fullscreen mode is active...	
        if (isFullScreen()) {
            // ...exit fullscreen mode
            // (Note: this can only be called on document)
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }

            setFullscreenData(false);
        } else {
            // ...otherwise enter fullscreen mode
            // (Note: can be called on document, but here the specific element is used as it will also ensure that the element's children, e.g. the custom controls, go fullscreen also)
            var videoContainer = mediaTag.parentNode;

            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.mozRequestFullScreen) {
                videoContainer.mozRequestFullScreen();
            } else if (videoContainer.webkitRequestFullScreen) {
                // Safari 5.1 only allows proper fullscreen on the video element. This also works fine on other WebKit browsers as the following CSS (set in styles.css) hides the default controls that appear again, and 
                // ensures that our custom controls are visible:
                // figure[data-fullscreen=true] video::-webkit-media-controls { display:none !important; }
                // figure[data-fullscreen=true] .controls { z-index:2147483647; }
                videoContainer.webkitRequestFullScreen();
            } else if (videoContainer.msRequestFullscreen) {
                videoContainer.msRequestFullscreen();
            }

            setFullscreenData(true);
        }
    }

    // Set the video container's fullscreen state
    function setFullscreenData(state) {
        //videoContainer.setAttribute('data-fullscreen', !!state);
        // Set the fullscreen button's 'data-state' which allows the correct button image to be set via CSS
        //fullscreen.setAttribute('data-state', !!state ? 'cancel-fullscreen' : 'go-fullscreen');
    }

    function initPlayer() {
        buildGui();
        initSubtitle();

        mediaTag.addEventListener("timeupdate", updateSubtitleText);

        // Nếu là audio thì thêm hiệu ứng karaoke
        if (shouldDisplayKaraoke) {
            window.requestAnimationFrame(updateCurrentLineProgress);
        }

        // Nếu là video thì mặc định không hiển thị subtitle
        // Chúng ta sẽ tự hiển thị
        if (mediaTag.tagName.toLowerCase() == "video") {
            disableNativeSubtitles();
        }

        // Play button event listenter
        playButton.addEventListener("click", playPauseAudio);
        pauseButton.addEventListener("click", playPauseAudio);

        volumeButton.addEventListener("click", updateMuteVolume);

        fullScreenButton.addEventListener('click', handleFullscreen);

        // Listen for fullscreen change events (from other controls, e.g. right clicking on the video itself)
        /*
        document.addEventListener('fullscreenchange', function(e) {
            setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
        });
        document.addEventListener('webkitfullscreenchange', function() {
            setFullscreenData(!!document.webkitIsFullScreen);
        });
        document.addEventListener('mozfullscreenchange', function() {
            setFullscreenData(!!document.mozFullScreen);
        });
        document.addEventListener('msfullscreenchange', function() {
            setFullscreenData(!!document.msFullscreenElement);
        });*/

        // Timeupdate event listener
        mediaTag.addEventListener("timeupdate", timeUpdate);

        // Gets audio file duration
        // Có khi load xong rồi
        mediaTag.addEventListener("canplaythrough", updateDuration);
        updateDuration();

        // Makes timeline clickable
        timeline.addEventListener("click", function (event) {
            movePlayHead(event);
            updateCurrentTime(event);
        });

        // Makes playHead draggable
        playHead.addEventListener("mousedown", mouseDown);
        window.addEventListener("mouseup", mouseUp);
    }

    try {
        initPlayer();
    } catch (ex) {
        alert(ex.message);
    }
}

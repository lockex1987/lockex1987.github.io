/**
 * Khởi tạo đối tượng media player.
 * @param {DOMNode} mediaTag Thẻ audio hoặc video (nguồn của player)
 */
function createMediaPlayer(mediaTag) {
    // Vùng div chính
    const mediaPlayer = createMediaPlayerDiv();

    // Nút play và pause
    const playButton = mediaPlayer.querySelector('.play-button');
    const pauseButton = mediaPlayer.querySelector('.pause-button');

    // Hiển thị thời gian hiện tại
    const currentTimeLabel = mediaPlayer.querySelector('.current-time');

    // Hiển thị tổng thời gian
    const durationTimeLabel = mediaPlayer.querySelector('.duration-time');

    // Thanh track
    const timeline = mediaPlayer.querySelector('.timeline');

    // Thanh process
    const barProcess = mediaPlayer.querySelector('.bar-process');

    // Vòng tròn thể hiện đang chạy đến chỗ nào rồi
    const playHead = mediaPlayer.querySelector('.play-head');

    // Đánh dấu có phải đang click vào playHead hay không
    let onplayHead = false;

    // Nút full-screen
    const fullScreenButton = mediaPlayer.querySelector('.full-screen-button');

    // -------------------------------

    // Thẻ span chứa dòng phụ đề
    const baseText = mediaPlayer.querySelector('.subtitle .base');

    // Dòng span chứa nội dung tương tự phụ đề để tạo hiệu ứng karaoke
    const karaokeText = mediaPlayer.querySelector('.subtitle .karaoke');











    // Các dòng phụ đề
    let lines;

    // Có hiển thị karaoke hay không
    const shouldDisplayKaraoke =
        mediaTag.tagName.toLowerCase() == 'audio'
            ? (mediaTag.getAttribute('data-karaoke') != 'false')
            : false;

    /**
     * Tạo vùng div chính.
     */
    function createMediaPlayerDiv() {
        const mediaPlayer = document.createElement('div');
        mediaPlayer.innerHTML = `                  
                <div class="media-player">
                    <div class="subtitle-wrapper">
                        <span class="subtitle">
                            <span class="base"></span>
                            <span class="karaoke"></span>
                        </span>
                    </div>

                    <div class="player-controls">
                        <svg width="16px"
                                height="16px"
                                viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg"
                                class="play-button cursor-pointer xfas xfa-play mr-1">
                            <g fill="#4E4E50">
                                <path d="M16 10v28l22-14z"/>
                            </g>
                        </svg>                        
                    
                        <svg width="16px"
                                height="16px"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                                class="pause-button cursor-pointer xfas xfa-pause mr-1"
                                style="display: none">
                            <g fill="#4E4E50" transform="translate(-576.000000, -144.000000)">
                                <path d="M580,146 L583,146 L583,158 L580,158 Z M585,146 L588,146 L588,158 L585,158 Z M585,146"/>
                            </g>
                        </svg>

                        <span class="time-info">
                            <span class="current-time">0:00</span> / <span class="duration-time">0:00</span>
                        </span>

                        <div class="timeline">
                            <div class="bar-process" style="width: 0px"></div>
                            <div class="play-head" style="left: 0px"></div>
                        </div>
    
                        <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                width="16px"
                                height="16px"
                                class="full-screen-button xfas xfa-expand-arrows-alt ml-1 cursor-pointer"
                                style="display: none">
                            <g fill="#4E4E50">
                                <path d="M 4 4 L 4 13 L 6 13 L 6 7.4375 L 14.5625 16 L 6 24.5625 L 6 19 L 4 19 L 4 28 L 13 28 L 13 26 L 7.4375 26 L 16 17.4375 L 24.5625 26 L 19 26 L 19 28 L 28 28 L 28 19 L 26 19 L 26 24.5625 L 17.4375 16 L 26 7.4375 L 26 13 L 28 13 L 28 4 L 19 4 L 19 6 L 24.5625 6 L 16 14.5625 L 7.4375 6 L 13 6 L 13 4 Z"/>
                            </g>
                        </svg>
                    </div>
                </div>`;
        return mediaPlayer;
    }

    /**
     * Khởi tạo giao diện.
     */
    function buildGui() {
        // Ẩn thẻ
        mediaTag.controls = false;

        // Thêm vùng div chính
        mediaTag.parentNode.appendChild(mediaPlayer);

        // Thêm class cho div cha để style
        mediaTag.parentNode.classList.add('media-container');
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

    /**
     * Hiển thị tổng thời gian.
     */
    function updateDuration() {
        if (!isNaN(mediaTag.duration)) {
            durationTimeLabel.textContent = secondToMinutes(mediaTag.duration);
        }
    }

    /**
     * Hàm này được gọi khi đang chạy.
     */
    function timeUpdate() {
        if (!isNaN(mediaTag.duration)) {
            // Hiển thị thời gian hiện tại
            currentTimeLabel.textContent = secondToMinutes(mediaTag.currentTime);
            durationTimeLabel.textContent = secondToMinutes(mediaTag.duration);

            // Hiển thị progress được bao nhiêu phần trăm.
            const timelineWidth = getTimelineWidth();
            const newMargLeft = timelineWidth * (mediaTag.currentTime / mediaTag.duration);
            updateProgressPosition(newMargLeft);

            // Nếu mà đã chạy xong thì hiển thị nút play
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
        const numMinutes = Math.floor(seconds / 60);
        let numSeconds = seconds % 60;
        numSeconds = numSeconds >= 10 ? numSeconds : '0' + numSeconds;
        return numMinutes + ':' + numSeconds;
    }

    /**
     * Lấy kích thước của timeline (có điều chỉnh với kích thước của playHead).
     */
    function getTimelineWidth() {
        return timeline.offsetWidth - playHead.offsetWidth;
    }

    /**
     * Cập nhật lại độ dài đã chạy được.
     * @param {Float} newMargLeft Độ dài đã chạy được
     */
    function updateProgressPosition(newMargLeft) {
        // Kiểm tra giới hạn trong vùng timeline
        if (newMargLeft < 0) {
            newMargLeft = 0;
        } else {
            const timelineWidth = getTimelineWidth();
            if (newMargLeft > timelineWidth) {
                newMargLeft = timelineWidth;
            }
        }

        playHead.style.left = newMargLeft + 'px';
        barProcess.style.width = newMargLeft + 'px';
    }

    /**
     * Khi chuyển playHead khi người dùng click vào timeline.
     * @param {Event} evt Đối tượng Event
     */
    function movePlayHead(evt) {
        const newMargLeft = evt.clientX - getPosition(timeline);
        updateProgressPosition(newMargLeft);
    }

    /**
     * Returns elements left position relative to top-left of viewport.
     * @param el DOMNode Phần tử DOM
     */
    function getPosition(el) {
        return el.getBoundingClientRect().left;
    }

    /**
     * Cập nhật thời gian hiện tại khi người dùng click vào timeline.
     * @param {Event} evt Đối tượng Event
     */
    function updateCurrentTime(evt) {
        if (!isNaN(mediaTag.duration)) {
            mediaTag.currentTime = mediaTag.duration * clickPercent(evt);
        }
    }

    /**
     * Tính phần trăm của vị trí người dùng click vào timeline.
     */
    function clickPercent(evt) {
        const timelineWidth = getTimelineWidth();
        return (evt.clientX - getPosition(timeline)) / timelineWidth;
    }

    /**
     * Đánh dấu đang click vào playHead.
     * Khi move thì cập nhật vị trí playHead.
     * Tạm bỏ sự kiện cập nhật timeUpdate.
     */
    function mouseDown() {
        onplayHead = true;
        window.addEventListener('mousemove', movePlayHead, true);
        mediaTag.removeEventListener('timeupdate', timeUpdate);
    }

    /**
     * Nếu đang drag playHead và bỏ ra thì:
     * - Thêm sự kiện cập nhật timeUpdate (do bị bỏ khi mousedown)
     * - Bỏ sự kiện move của window (thêm khi mousedown)
     */
    function mouseUp(evt) {
        if (onplayHead == true) {
            movePlayHead(evt);
            updateCurrentTime(evt);

            window.removeEventListener('mousemove', movePlayHead, true);
            mediaTag.addEventListener('timeupdate', timeUpdate);
        }
        onplayHead = false;
    }

    // Các hàm liên quan đến API fullscreen
    // Tham khảo bài viết fullscreen
    // ../js%20-%20fullscreen/js/fullscreen.js

    /**
     * Có phải đang trong chế độ fullscreen hay không.
     */
    function isFullscreen() {
        return (
            document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
        );
    }

    /**
     * Một đối tượng nào đó fullscreen.
     * @param {DOMNode} el Đối tượng DOM
     */
    function requestFullscreen(el) {
        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
        }
    }

    /**
     * Thoát khỏi chế độ fullscreen.
     */
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    /**
     * Bật / tắt chế độ fullscreen.
     * @param {DOMNode} el Đối tượng DOM.
     */
    function toggleFullscreen(el) {
        if (isFullscreen()) {
            exitFullscreen();
        } else {
            requestFullscreen(el);
        }
    }

    /**
     * Xử lý khi click nút fullscreen.
     */
    function handleFullscreen() {
        const videoContainer = mediaTag.parentNode;
        toggleFullscreen(videoContainer);
    }

    /**
     * Không hiển thị phụ đề native (VTT).
     */
    function disableNativeSubtitles() {
        for (let i = 0; i < mediaTag.textTracks.length; i++) {
            mediaTag.textTracks[i].mode = 'hidden';
        }
    }

    // -------------------------------

    /**
 * Return the given SRT timestamp as milleseconds.
 * @param {string|number} timestamp
 * @returns {number} milliseconds
 */
    function toSecond(srtTimestamp) {
    // Là số rồi thì trả về luôn
        if (!isNaN(srtTimestamp)) {
            return srtTimestamp;
        }

        // Có dạng hh:mm:ss,ZZZ
        const match = srtTimestamp.match(/^(?:(\d{2,}):)?(\d{2}):(\d{2})[,.](\d{3})$/);

        if (!match) {
            throw new Error('Invalid SRT or VTT time format: "' + srtTimestamp + '"');
        }

        const hours = match[1] ? parseInt(match[1], 10) * 3600 : 0;
        const minutes = parseInt(match[2], 10) * 60;
        const seconds = parseInt(match[3], 10);
        const milliseconds = parseFloat(match[4], 10) / 1000;
        return hours + minutes + seconds + milliseconds;
    }

    /**
 * Chuyển cả dòng thời gian.
 * @param value
 * @returns {{start: Number, end: Number}}
 */
    function parseTimestamps(value) {
    // Timestamp regex
        const regex = /^((?:\d{2,}:)?\d{2}:\d{2}[,.]\d{3}) --> ((?:\d{2,}:)?\d{2}:\d{2}[,.]\d{3})(?: (.*))?$/;
        const match = regex.exec(value);
        const cue = {
            start: toSecond(match[1]),
            end: toSecond(match[2])
        };
        return cue;
    }

    /**
 * Parse an SRT string.
 * @param {String} srtString Nội dung file SRT
 * @return {Array} subtitles Mảng các câu (nội dung, thời gian)
 */
    function parseSrtText(srtString) {
    // Nếu nội dung file rỗng thì dừng lại
        if (!srtString) {
            return [];
        }

        // Chuẩn hóa và tách thành mảng
        const source = srtString
            .trim()
            .concat('\n')
            .replace(/\r\n/g, '\n')
            .replace(/\n{3,}/g, '\n\n')
            .split('\n');

        // Duyệt các phần tử của mảng
        return source.reduce((captions, row, index) => {
            // Lấy phần tử cuối cùng của mảng hiện tại
            const caption = captions[captions.length - 1];

            // Nếu là dòng index
            // Nếu mà chưa có index
            // thì kiểm tra dòng đó có phải là index không
            if (!caption.index) {
                if (/^\d+$/.test(row)) {
                    caption.index = parseInt(row, 10);
                    return captions;
                }
            }

            // Nếu là dòng thời gian
            // Nếu mà chưa có thuộc tính start, end thì
            if (!caption.hasOwnProperty('start')) {
                Object.assign(caption, parseTimestamps(row));
                return captions;
            }

            // Dòng nội dung (hoặc dòng trắng)
            // Chú ý nội dung có thể trên nhiều dòng
            // Nếu là xâu rỗng thì là chuẩn bị để bắt đầu 1 phần tử mới
            // Nếu không thì sẽ là nội dung
            if (row === '') {
                delete caption.index;
                if (index !== source.length - 1) {
                    captions.push({});
                }
            } else {
                caption.text = caption.text
                    ? caption.text + '\n' + row
                    : row;
            }

            return captions;
        }, [{}]);
    }

    function parseLrcText(text) {
        const a = text.split('\n');
        const result = [];
        a.forEach(function (line) {
        // Kiểm tra xem có chứa xâu thời gian không
            const timeAnchors = line.match(/\d+:\d+\.\d+/g);
            if (!timeAnchors) {
                return;
            }

            const _t = line.split(']');
            const text = _t[_t.length - 1];
            timeAnchors.forEach(function (anchor) {
                const _r = anchor.split(':').map(parseFloat);
                const time = parseInt(_r[0], 10) * 60 + parseFloat(_r[1]);
                result.push({
                    start: time,
                    text: text
                });
            });
        });

        // Cập nhật giá trị end
        for (let i = 0; i < result.length - 1; i++) {
            result[i].end = result[i + 1].start;
        }
        result[result.length - 1].end = -1;

        return result;
    }

    function initSubtitle() {
        let hasSubtitle = false;

        // Trên TV bị lỗi
        const tracks = mediaTag.querySelectorAll('track');
        if (tracks) {
            // tracks.forEach(function (track) {});
            for (let i = 0; i < tracks.length; i++) {
                const track = tracks[i];
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

                            // console.log(lines);
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
        const idx = lines.findIndex(findCurrentLine);
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
            const current = lines.find(findCurrentLine);
            if (current) {
                // Tính phần trăm của hiện tại
                if (current.end > 0) {
                    const percent =
                        ((mediaTag.currentTime - current.start) * 100) /
                        (current.end - current.start);
                    karaokeText.style.width = percent + '%';
                    // console.log(percent);
                }
            }
        }

        window.requestAnimationFrame(updateCurrentLineProgress);
    }

    /**
     * Hàm khởi tạo.
     */
    function initPlayer() {
        buildGui();

        // Lắng nghe sự kiện bật tắt
        playButton.addEventListener('click', playPauseAudio);
        pauseButton.addEventListener('click', playPauseAudio);

        // Lời độ dài của audio hoặc video
        // Có khi load xong rồi
        mediaTag.addEventListener('canplaythrough', updateDuration);
        updateDuration();

        // Khi đang play thì cập nhật giao diện
        mediaTag.addEventListener('timeupdate', timeUpdate);

        // Khi click vào timeline thì tua
        timeline.addEventListener('click', (evt) => {
            movePlayHead(evt);
            updateCurrentTime(evt);
        });

        // Có thể tua bằng cách kéo playHead
        playHead.addEventListener('mousedown', mouseDown);
        window.addEventListener('mouseup', mouseUp);

        // Nếu là thẻ video thì hiển thị nút fullscreen
        if (mediaTag.tagName.toLowerCase() == 'video') {
            fullScreenButton.style.display = '';

            // Xử lý fullscreen
            fullScreenButton.addEventListener('click', handleFullscreen);
        }

        // Nếu là video thì mặc định không hiển thị subtitle
        // Chúng ta sẽ tự hiển thị
        if (mediaTag.tagName.toLowerCase() == 'video') {
            disableNativeSubtitles();
        }

        // -------------------------------

        // Xử lý subtitle
        initSubtitle();

        mediaTag.addEventListener('timeupdate', updateSubtitleText);

        // Xử lý karaoke
        // Nếu là audio thì thêm hiệu ứng karaoke
        if (shouldDisplayKaraoke) {
            window.requestAnimationFrame(updateCurrentLineProgress);
        }
    }

    try {
        initPlayer();
    } catch (ex) {
        alert(ex.message);
    }
}

/**
 * Hiển thị danh sách.
 */
function bindPlaylist() {
    var html = '';
    playlist.forEach((item, idx) => {
        html += `
                <div class='item-video item-search'>
                    <img class='thumb' src='https://i.ytimg.com/vi/${item.id}/hqdefault.jpg' data-index="${idx}">
                    <div class="video-info">
                        <p class='title'>${item.title}</p>
                        <p class='len'>${item.duration}</p>
                    </div>
                </div>`;
    });
    document.querySelector('#result-search').innerHTML = html;
}

function addPlayEvent() {
    document.querySelector('#result-search').addEventListener('click', function(event) {
        var target = event.target;
        if (target.className == 'thumb') {
            var idx = parseInt(target.dataset.index);
            var item = playlist[idx];
            play(item);
        }
    });
}

/**
 * Chơi một video nào đó.
 * @param {Object} item Đối tượng của video
 */
function play(item) {
    var videoId = item.id;

    
    document.querySelector('#video').innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}?ecver=1&amp;autoplay=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560&amp;width=560"
                    width="560"
                    height="315"
                    allowtransparency="true"
                    frameborder="0">
            </iframe>`;
    
    /*
    document.querySelector('#video').innerHTML = `
            <iframe width="100%"
                    height="350"
                    src="https://www.youtube.com/embed/${videoId}"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen>
            </iframe>`;
    */

    document.querySelector('#currentTitle').innerHTML = item.title; // + ` - <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">${videoId}</a>`;
}

function init() {
    bindPlaylist();
    addPlayEvent();
}

init();
/**
 * Tinh giảm lại tên truyện.
 */
function normalizeTitle(title) {
    if (title.includes('": ')) {
        title = title.split('": ')[0] + '"'
    }

    var regex = /["“’]([^"]*?)["”’]/g
    var arr
    var retval = []
    while ((arr = regex.exec(title)) !== null) {
        retval.push(arr[1])
    }

    if (retval.length == 0) {
        return title
    } else if (retval.length == 1) {
        return retval[0]
    } else {
        return retval.map(s => `"${s}"`).join(', ')
    }
}

/**
 * Xây dựng giao diện danh sách truyện.
 */
function bindStoryList() {
    var html = playlist.map((story, idx) => `
                <li class="media mb-3">
                    <div class="media-left mr-3">
                        <img data-src="${story.imageLink}" class="media-object cursor-pointer" onclick="openStoryMobile(${idx})"/>
                    </div>
                    <div class="media-body">
                        <h5 class="media-heading text-primary cursor-pointer mt-0" onclick="openStoryMobile(${idx})">
                            ${normalizeTitle(story.title)}
                        </h5>
                        <p>
                            ${story.title}
                        </p>
                    </div>
                </li>
                `).join('')
    document.querySelector('#storyList').innerHTML = html
}

/**
 * Filter danh sách.
 */
function addFilterInputAction() {
    var filterInput = document.querySelector('#filterInput')
    var items = document.querySelectorAll('#storyList li')
    filterInput.addEventListener('keyup', function () {
        var value = filterInput.value.toLowerCase()
        items.forEach(li => {
            li.style.display = (li.textContent.toLowerCase().indexOf(value) > -1) ? '' : 'none'
        })
    })
}

/**
 * Click chọn một truyện nào đó.
 */
function openStoryMobile(idx) {
    var story = playlist[idx]
    document.querySelector('#currentTitle').textContent = normalizeTitle(story.title)

    var myAudio = document.querySelector('#myAudioMobile')
    myAudio.src = story.audioLink
    myAudio.currentTime = 0
    myAudio.play()
}

/**
 * Khởi tạo giao diện mobile.
 */
function initMobile() {
    // Xây dựng danh sách truyện
    bindStoryList()

    // Thêm sự kiện filter danh sách
    addFilterInputAction()

    // Load ảnh chậm
    lazyload(document.querySelectorAll("#storyList img"))
}

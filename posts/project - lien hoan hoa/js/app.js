// AJAX?
var data = DATA;

var versions = [];
var chapters;
var currentVersion;


function returnHomeScreen() {
    document.querySelector("#versionScreen").style.display = "none";
    document.querySelector("#homeScreen").style.display = "block";
}

function gotoVersionScreen() {
    document.querySelector("#versionScreen").style.display = "block";
    document.querySelector("#homeScreen").style.display = "none";
}

function returnVersionScreen() {
    document.querySelector("#chapterScreen").style.display = "none";
    document.querySelector("#versionScreen").style.display = "block";
}

function gotoChapterScreen() {
    document.querySelector("#chapterScreen").style.display = "block";
    document.querySelector("#versionScreen").style.display = "none";
}

function bindVersionList() {
    var versionList = document.querySelector("#versionList");
    var idx = 0;
    data.forEach(function(story) {
        story.versions.forEach(function(version) {
            version.story = {
                name: story.name,
                folder: story.folder
            };
            versions.push(version);
            var item = document.createElement("div");
            item.className = "version";
            var html = `
                <div class="avatar">
                    <img src="http://lienhoanhoa.net/online/${story.folder}/${version.folder}/000.jpg"/>
                </div>
                <div class="info">
                    <h3 class="title">${story.name}</h3>
                    <p class="note">${version.name}</p>
                </div>
            `;
            item.index = idx;
            item.addEventListener("click", viewVersion);
            item.innerHTML  = html;
            versionList.appendChild(item);

            idx++;
        });
    });

    DATA = null;
    data = null;
}

function viewVersion() {
    var idx = this.index;
    currentVersion = versions[idx];
    document.querySelector("#versionName").textContent = currentVersion.story.name + ": " + currentVersion.name;
    var chapterList = document.querySelector("#chapterList");
    chapterList.innerHTML = "";
    chapters = [];
    var idx = 0;
    currentVersion.chapters.forEach(function(chapter) {
        chapters.push(chapter);

        var item = document.createElement("div");
        item.className = "chapter";
        var html = `
            <div class="avatar">
                <img src="http://lienhoanhoa.net/online/${currentVersion.story.folder}/${currentVersion.folder}/${chapter.folder}/000.jpg"/>
            </div>
            <div class="info">
                <h3 class="title">${chapter.name}</h3>
            </div>
        `;
        item.innerHTML  = html;
        item.index = idx;
        item.addEventListener("click", viewChapter);
        chapterList.appendChild(item);
        idx++;
    });

    gotoVersionScreen();
}

function viewChapter() {
    var idx = this.index;

    var currentChapter = chapters[idx];
    //console.log(JSON.stringify(currentChapter));

    document.querySelector("#chapterName").textContent = currentChapter.name;

    var pageList = document.querySelector("#pageList");
    pageList.innerHTML = "";

    var prefix = `http://lienhoanhoa.net/online/${currentVersion.story.folder}/${currentVersion.folder}/${currentChapter.folder}/`;
    insertImage(pageList, prefix + "000.jpg");
    insertImage(pageList, prefix + "000a.jpg");
    insertImage(pageList, prefix + "000b.jpg");
    for (var i = 1; i <= currentChapter.pages; i++) {
        insertImage(pageList, prefix + ("" + i).padStart(3, "0") + ".jpg");
    }
    insertImage(pageList, prefix + "End.jpg");

    gotoChapterScreen();
}

function insertImage(pageList, src) {
    var img = document.createElement("img");
    img.src = src;
    img.className = "page";
    pageList.appendChild(img);
}

bindVersionList();
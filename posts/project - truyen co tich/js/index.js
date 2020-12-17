function addEvents() {
    var soundBack = document.querySelector('#soundBack');
    

    var buttonPrev = document.querySelector('#buttonPrev');
    var buttonNext = document.querySelector('#buttonNext');

    buttonPrev.addEventListener('click', function() {
        
        soundBack.play();
    });

    buttonNext.addEventListener('click', function() {
        
    });

    document.querySelector('.home').addEventListener('click', returnMainScreen);

    document.querySelector('.exit').addEventListener('click', exitApp);
}

function exitApp() {
    playSelect();
    setTimeout(function() {
        window.location.href = '../../index.html';
    }, 500);
}

// Danh sách truyện hiện tại
var stories;

function viewCategory(idx) {
    document.querySelector('#screen1').style.display = 'none';
    document.querySelector('#screen2').style.display = 'flex';
    
    stories = data[idx].stories;

    var html = `
    ${stories.slice(0, 5).map((s, idx) =>
        `
        <div class="item" onclick="listenStory(${idx})">
            <p class="title">
                ${s.title}
            </p>
            <button class="btn">
                <img src="images/play.png" />
            </button>
        </div>
        `
    ).join('')}
    `;

    document.querySelector("#storyList").innerHTML = html;

    playSelect();
}

function playSelect() {
    var soundSelect = document.querySelector('#soundSelect');
    soundSelect.play();
}

function listenStory(idx) {
    var story = stories[idx];
    //console.log(story);
    var player = document.getElementById("html5Player");
	player.src = story.src;
	player.play();
}

function returnMainScreen() {
    document.querySelector('#screen1').style.display = 'flex';
    document.querySelector('#screen2').style.display = 'none';
    playSelect();
}

function bindCategories() {
    var html = `
    ${data.map((c, idx) =>
        `
        <button class="btn category" onclick="viewCategory(${idx})">${c.name}</button>
        `
    ).join('')}
    `;

    document.querySelector("#categoryList").innerHTML = html;
}

bindCategories();
addEvents();
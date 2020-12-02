// https://javascript-minifier.com/

let domain = 'http://locahost/';
//let domain = 'https://lockex1987.github.io/';

let version = new Date().getTime();


function initViewer() {
    if (!window.pageViewer) {
        window.pageViewer = new PageViewer();
    }
    window.pageViewer.show();
}

function loadStyle() {
    if (typeof PageViewer == 'undefined') {
        let style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = domain + 'posts/project - page viewer/css/viewer.css?v=' + version;
        style.onload = loadScript;
        document.body.appendChild(style);
    } else {
        initViewer();
    }
}

function loadScript() {
    let script = document.createElement('script'); 
    script.setAttribute('src', domain + 'posts/project - page viewer/js/viewer.js?v=' + version);
    script.onload = initViewer;
    document.body.appendChild(script);
}

loadStyle();
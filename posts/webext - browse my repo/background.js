// https://github.com/lockex1987/lockex1987.github.io/tree/master/posts/sass%20-%20repsonsive
// https://lockex1987.github.io/posts/sass%20-%20repsonsive/

let username = 'lockex1987';
let githubPath = `https://github.com/${username}/${username}.github.io/`;
let pagePath = `https://${username}.github.io/`;

function githubToPage(url) {
    return url.replace(githubPath, pagePath)
        .replace('/tree/master/', '/')
        .replace('/blob/master/', '/');
}

function pageToGithub(url) {
    return githubPath + 'tree/master/' + url.substring(pagePath.length);
}

chrome.browserAction.onClicked.addListener((tab) => {
    let url = tab.url;
    let redirectUrl = url.includes(githubPath) ? githubToPage(url) : pageToGithub(url);
    chrome.tabs.update(
        tab.id,
        {
            url: redirectUrl
        }
    );
});

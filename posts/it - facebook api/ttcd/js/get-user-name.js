function escapeUnicodeCharaters(text) {
    let regex = /\\u([\d\w]{4})/gi;
    text = text.replace(regex, (match, grp) => {
        return String.fromCharCode(parseInt(grp, 16));
    });
    return unescape(text);
}

function getUserName() {
    let name = '';

    let tags = document.querySelectorAll('#userNav a');
    if (tags && tags.length > 1) {
        name = tags[1].title;
    }

    if (!name) {
        let regex = /"NAME":"(.*?)"/g;
        let str = document.documentElement.innerHTML;
        let m = regex.exec(str);
        if (m) {
            name = m[1];
        }
    }

    return name;
}

escapeUnicodeCharaters(getUserName());
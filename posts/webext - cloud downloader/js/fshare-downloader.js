console.info('Fshare downloader');

let thread;

function countDown(waitSeconds) {
    let n = waitSeconds;
    thread = setInterval(() => {
        if (n < 0) {
            clearInterval(thread);
        } else {
            console.log(n);
            document.title = n;
            n--;
        }
    }, 1000);
}

function waitAndDownload(downloadUrl, waitSeconds) {
    setTimeout(() => {
        window.open(downloadUrl, '_self');
    }, (waitSeconds + 5) * 1000);
}

function checkDownload() {
    const form = document.querySelector('#form-download');
    if (!form) {
        console.log('Không phải trang download');
        return;
    }

    const formData = new FormData(form);
    const formDataString = new URLSearchParams(formData).toString();
    const fetchOptions = {
        method: 'POST',
        body: formDataString,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    };

    const getLinkUrl = form.action;
    fetch(getLinkUrl, fetchOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const downloadUrl = data.url;
            const waitSeconds = data.wait_time;
            waitAndDownload(downloadUrl, waitSeconds);
            countDown(waitSeconds);
        });
}

checkDownload();

function getLinksOfFolder(folderLink) {
    fetch(folderLink, {
        headers: { accept: 'application/json, text/plain, */*' }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let text = '';
            data.items.forEach(e => {
                console.log(e.linkcode, e.name);
                text += 'https://www.fshare.vn/file/' + e.linkcode + '\n';
            });
            console.log(text);
        });
}

// getLinksOfFolder('https://www.fshare.vn/api/v3/files/folder?linkcode=9N7T9JNFUONX&sort=type,name');

/**
 * Đọc nội dung file text trong file zip.
 * @param {Event} evt 
 */
async function displayFileAsText(evt) {
    const aTag = evt.target;
    const content = await aTag.fileRef.async('string');    
    const txt = document.getElementById('textAreaFileSelectedAsText');
    txt.innerHTML = content;
}

/**
 * Lắng nghe việc chọn file zip.
 */
function listZipFile() {
    document.getElementById('inputFile').addEventListener('change', async (evt) => {
        const zipFileToLoad = evt.target.files[0];
        const ulTag = document.getElementById('ulFilesContained');
        ulTag.innerHTML = '';

        const zip = await JSZip.loadAsync(zipFileToLoad);
    
        zip.forEach((relativePath, zipEntry) => {
            console.log(relativePath, zipEntry);
        });

        for (let nameKey in zip.files) {
            const fileObject = zip.files[nameKey];

            const aTag = document.createElement('a');
            aTag.innerHTML = nameKey;
            aTag.href = '#';
            aTag.fileRef = fileObject;
            aTag.onclick = displayFileAsText;

            const liTag = document.createElement('li');
            liTag.appendChild(aTag);
            ulTag.appendChild(liTag);
        }
    });
}

function loadZipFile(zipFile) {
    JSZip.loadAsync(zipFile)
        .then((zip) => {
            let indexFile = zip.file('index.html');
            if (indexFile == null) {
                alert('The archive must have a index.html file');
            } else {
                indexFile.async('string')
                    .then((content) => {
                        processHtml(content, zip);
                    });
            }
        });
}

function processHtml(content, zip) {
    let htmlResult = document.getElementById('htmlResult');
    htmlResult.innerHTML = content;

    let fullPath = window.location.href;
    let idx = fullPath.lastIndexOf('/');
    let programFolder = fullPath.substring(0, idx + 1);

    // Process images
    let images = htmlResult.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        let img = images[i];
        let src = img.src;
        // Nếu là đường dẫn tương đối
        if (src.indexOf(programFolder) >= 0) {
            src = src.substring(programFolder.length);
            console.log(src);
            changeImageSource(img, src, zip);
        }
    }
}

function changeImageSource(img, src, zip) {
    zip.file(src)
        .async('base64')
        .then((base64) => {
            img.src = 'data:image/png;base64, ' + base64;
        });
}

function displayHtml() {
    document.getElementById('zipFile').addEventListener('change', (evt) => {
        let zipFile = evt.target.files[0];
        loadZipFile(zipFile);
    });
}

listZipFile();
displayHtml();

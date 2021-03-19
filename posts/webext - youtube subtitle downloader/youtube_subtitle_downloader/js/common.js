/**
 * Get the query string that contains parameters and values of current page.
 * For example, if you visit https://www.youtube.com/watch?v=1BVV9UqELbA,
 * this function will return 'v=1BVV9UqELbA' (does not contain ? character).
 */
function getQueryString() {
    const search = window.location.search;
    if (search) {
        return search.substring(1);
    } else {
        return '';
    }
}


/**
 * Call AJAX.
 * @param {String} url Địa chỉ
 * @param {Function} callback Hàm callback
 */
function updateAjax(url, callback) {
    const req = new XMLHttpRequest();
    req.addEventListener('readystatechange', () => {
        if (req.readyState == 4 && req.status == 200) {
            callback(req.responseText);
        }
    });
    req.open('GET', url);
    req.send();
}


/**
 * Save text file (by JS).
 * @param text Nội dung của văn bản cần lưu
 * @param fileName Tên file
 */
function saveTextAsFile(text, fileName) {
    // Tạo đối tượng Blob
    const textFileAsBlob = new Blob([text], { type: 'text/plain' });
    const hrefLink = window.URL.createObjectURL(textFileAsBlob);

    // Tạo một thẻ a tạm và giả lập thao tác click vào thẻ đó
    const downloadLink = document.createElement('a');
    downloadLink.download = fileName;
    downloadLink.textContent = 'Download file';
    downloadLink.href = hrefLink;
    downloadLink.style.display = 'none';
    downloadLink.addEventListener('click', (evt) => {
        // Remove the a tag
        document.body.removeChild(evt.target);
    });

    // Gắn nó vào DOM và thực hiện thao tác click
    document.body.appendChild(downloadLink);
    downloadLink.click();
}


/**
 * Return original form (unescaped) of escaped characters.
 * Có trường hợp xâu là &amp;quot; do đó cần thay thế &amp; trước
 * @param {String} inputText Xâu đầu vào
 */
function unescapeHTML(inputText) {
    // Escaped characters
    const ESCAPE_SEQ = [
        /&amp;/g,
        /&quot;/g,
        /&lt;/g,
        /&gt;/g,
        /&#39;/g
    ];
    const UNESCAPE_SEQ = [
        '&',
        '"',
        '<',
        '>',
        "'"
    ];
    for (let i = 0; i < ESCAPE_SEQ.length; i++) {
        inputText = inputText.replace(ESCAPE_SEQ[i], UNESCAPE_SEQ[i]);
    }
    return inputText;
}


export {
    getQueryString,
    updateAjax,
    saveTextAsFile,
    unescapeHTML
};

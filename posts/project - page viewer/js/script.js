/**
 * Copy văn bản vào clip-board.
 * @param text Văn bản
 */
function copyToClipboard(text) {
    // Cách làm là chúng ta tạo một đối tượng textarea,
    // thêm nó vào trang hiện tại (nhưng đừng hiển thị nó ra ngoài),
    // thiết lập nội dung của nó là văn bản,
    // chọn (bôi đen) và thực hiện lệnh copy,
    // cuối cùng thì bỏ đối tượng đi
    var tempElem = document.createElement('textarea');
    tempElem.style.position = 'absolute';
    tempElem.style.left = '-9999px';
    tempElem.style.top = '0px';
    tempElem.value = text;

    document.body.appendChild(tempElem);

    tempElem.select();
    tempElem.setSelectionRange(0, tempElem.value.length);
    document.execCommand("copy");

    document.body.removeChild(tempElem);
}

// Copy bookmarklet
document.querySelector('#btnCopyBookmarklet').addEventListener('click', () => {
    let href = encodeURI(document.querySelector('#bookmarklet').href);
    copyToClipboard(href);
    alert('Copied');
});

document.querySelector('#btnCopyInlineBookmarklet').addEventListener('click', () => {
    let href = encodeURI(document.querySelector('#inlineBookmarklet').href);
    copyToClipboard(href);
    alert('Copied');
});


// Thêm nội dung cho văn bản dài
fetch('content.html')
    .then(resp => {
        return resp.text();
    })
    .then(html => {
        window.pageViewer = new PageViewer(html);
    });


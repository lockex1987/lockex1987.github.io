// Truy cập link gốc (http://quyensach.blogspot.com/2016/01/TDK-NhuSonMaiXuanHaiPhuongOanh.html)
// Sau đó thực hiện script sau ở browser console.

/**
 * Hàm save as do mình tự làm.
 * @param textToWrite Nội dung của văn bản cần lưu
 * @param fileNameToSaveAs Tên file
 */
function saveTextAsFile(textToWrite, fileNameToSaveAs) {
	// Tạo đối tượng Blob
	var textFileAsBlob = new Blob([textToWrite], { type:'text/plain' });
	
	// Tạo một thẻ a tạm và giả lập thao tác click vào thẻ đó
	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
	downloadLink.style.display = "none";
	downloadLink.onclick = function(event) {
		// Remove the a tag
		document.body.removeChild(event.target);
	};
	// Gắn nó vào DOM và thực hiện thao tác click
	document.body.appendChild(downloadLink);
	downloadLink.click();
}

function processHtml(htmlSource, idx) {
    //console.log(response);
    var el = document.createElement( 'html' );
    el.innerHTML = htmlSource;
    var title = el.querySelector('.post-title').innerHTML;
    var body = el.querySelector('.post-body').innerHTML;
    var textToWrite = `
            <h3>${title}</h3>
            ${body}`;
    //console.log(body);
    saveTextAsFile(textToWrite, idx + ".html");
}

function loadLink(link, idx) {
    fetch(link)
        .then(res => res.text())
        .then(response => {
            processHtml(response, idx);
        });
}

//loadLink('http://quyensach.blogspot.com/2016/01/TayDu001.html');

document.querySelectorAll('.post-body a').forEach(function(a, idx) {
    var link = a.href;
    //console.log(a.href);
    loadLink(link, idx);
});

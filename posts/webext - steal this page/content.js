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

function processLinks() {
	var links = document.querySelectorAll("link[href]");
	//links.forEach(e => console.log(e.href))
	links.forEach(e => e.href = e.href);
}

function processScripts() {
	var scripts = document.querySelectorAll("script[src]");
	scripts.forEach(e => e.src = e.src);
}

function processImages() {
	var images = document.querySelectorAll("img[src]");
	images.forEach(e => e.src = e.src);
}

function normalizeTags() {
	processLinks();
	processScripts();
	processImages();
}

function stealThisPage() {
	normalizeTags();
	
	var textToWrite = "<!DOCTYPE html>" +
			"<html>" +
			"<head>" + document.head.innerHTML + "</head>" +
			"<body>" + document.body.innerHTML + "</body>" +
			"</html>";
	var fileNameToSaveAs = document.title + ".html";
	saveTextAsFile(textToWrite, fileNameToSaveAs);
}

stealThisPage();


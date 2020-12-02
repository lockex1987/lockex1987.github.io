function testSaveTextAsFile() {
	let textToWrite = document.getElementById('inputTextToSave').value;
	let fileNameToSaveAs = document.getElementById('inputFileNameToSaveAs').value;
	CommonUtils.saveTextAsFile(textToWrite, fileNameToSaveAs);
}

function testLoadFileAsText() {
	let fileToLoad = document.getElementById('fileToLoad').files[0];
	loadFileAsText(fileToLoad, function (textFromFileLoaded) {
		document.getElementById('loadResult').innerHTML = textFromFileLoaded;
	});
}

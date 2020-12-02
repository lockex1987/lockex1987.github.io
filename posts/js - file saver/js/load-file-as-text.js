/**
 * Đọc nội dung file text do mình tự làm.
 */
function loadFileAsText(fileToLoad, callback) {
	let fileReader = new FileReader();
	fileReader.onload = function (fileLoadedEvent) {
		let textFromFileLoaded = fileLoadedEvent.target.result;
		callback(textFromFileLoaded);
	};
	fileReader.readAsText(fileToLoad, 'UTF-8');
}

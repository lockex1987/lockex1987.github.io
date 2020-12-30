/**
 * Đọc nội dung file text do mình tự làm.
 */
function loadFileAsText(fileToLoad, callback) {
    const fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent) => {
        const textFromFileLoaded = fileLoadedEvent.target.result;
        callback(textFromFileLoaded);
    };
    fileReader.readAsText(fileToLoad, 'UTF-8');
}

export {
    loadFileAsText
};

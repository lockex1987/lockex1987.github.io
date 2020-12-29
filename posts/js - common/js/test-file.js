import { loadFileAsText } from './load-file-as-text.js';

function testSaveTextAsFile() {
    const textToWrite = document.getElementById('inputTextToSave').value;
    const fileNameToSaveAs = document.getElementById('inputFileNameToSaveAs').value;
    CommonUtils.saveTextAsFile(textToWrite, fileNameToSaveAs);
}

function testLoadFileAsText() {
    const fileToLoad = document.getElementById('fileToLoad').files[0];
    loadFileAsText(fileToLoad, (textFromFileLoaded) => {
        document.getElementById('loadResult').innerHTML = textFromFileLoaded;
    });
}

document.querySelector('#testSaveButton').addEventListener('click', testSaveTextAsFile);
document.querySelector('#testLoadButton').addEventListener('click', testLoadFileAsText);

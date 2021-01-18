/**
 * Click nút "Clear".
 */
function handleClear() {
    document.querySelector('#clearDownloads').addEventListener('click', () => {
        // Thông báo background
        chrome.runtime.sendMessage({
            message: 'clearDownloads'
        });

        // Cập nhật trạng thái
        const progressBar = document.querySelector('#progressBar');
        progressBar.style.width = '0%';
    });
}

/**
 * Click nút 'Choose file'.
 */
function handleOpenChooseFile() {
    // Mô phỏng click vào input[type=file] để bật dialog chọn file
    document.querySelector('#chooseFileButton').addEventListener('click', () => {
        document.querySelector('#fileToLoad').click();
    });
}

/**
 * Xử lý khi chọn file.
 */
function handleFileChosen() {
    const fileInput = document.querySelector('#fileToLoad');
    fileInput.addEventListener('change', () => {
        const noOfFile = fileInput.files.length;
        let count = 0;
        // console.log(noOfFile);
        for (let i = 0; i < noOfFile; i++) {
            const fileToLoad = fileInput.files[i];

            loadFileAsText(fileToLoad, (textFromFileLoaded) => {
                const urls = JSON.parse(textFromFileLoaded);
                count++;
                // console.log(count);
                if (count == noOfFile) {
                    fileInput.value = '';

                    // Thông báo cho background danh sách URL
                    chrome.runtime.sendMessage({
                        message: 'addToQueue',
                        urls: urls
                    });
                }
            });
        }
    });
}

/**
 * Đọc nội dung file text do mình tự làm.
 * @param Object fileToLoad Đối tượng file được chọn
 * @param Function callback Hàm gọi sau khi lấy được xong nội dung file
 */
function loadFileAsText(fileToLoad, callback) {
    const fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent) => {
        const textFromFileLoaded = fileLoadedEvent.target.result;
        callback(textFromFileLoaded);
    };
    fileReader.readAsText(fileToLoad, 'UTF-8');
}

/**
 * Nhận được thông báo có thống kê mới.
 */
function listenToStatsEvent() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.message == 'stats') {
            [
                'numDownloading',
                'numQueued',
                'numFinished'
            ].forEach((fieldName) => {
                const newValue = request[fieldName];
                updateStat(fieldName, newValue);
            });

            const errors = request.errors;
            const errorsDiv = document.querySelector('#errors');
            errorsDiv.innerHTML = (errors && errors.length > 0) ? JSON.stringify(errors, null, 2) : '';

            const numDownloading = request.numDownloading;
            const numQueued = request.numQueued;
            const numFinished = request.numFinished;
            const total = numDownloading + numQueued + numFinished;
            if (total > 0) {
                const percent = Math.round(numFinished * 100 / total);
                const progressBar = document.querySelector('#progressBar');
                progressBar.style.width = percent + '%';
            }
        }
    });
}

/**
 * Cập nhật lại một giá trị thống kê.
 * @param String fieldName
 * @param Number newValue
 */
function updateStat(fieldName, newValue) {
    const el = document.querySelector('#' + fieldName);

    /*
    let cssClass = 'highlighted';
    if (el.textContent != newValue) {
        el.classList.remove(cssClass);
        setTimeout(() => {
            el.classList.add(cssClass);
        }, 0);
    }
    */

    el.textContent = newValue;
}

/**
 * Lấy thông tin thống kê từ background.
 */
function getStats() {
    chrome.runtime.sendMessage({
        message: 'getStats'
    });
}

function init() {
    handleClear();
    handleOpenChooseFile();
    handleFileChosen();
    listenToStatsEvent();
    getStats();
}

init();

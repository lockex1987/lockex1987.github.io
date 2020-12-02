console.info('Mega downloader');

function checkDownloadButton() {
    let dlButton = document.querySelector('.download-file');
    if (dlButton != null) {
        // Nếu có nút thì thực hiện click để download
        dlButton.click();
    } else {
        // Kiểm tra tiếp
        setTimeout(checkDownloadButton, 1000);
    }
}

checkDownloadButton();

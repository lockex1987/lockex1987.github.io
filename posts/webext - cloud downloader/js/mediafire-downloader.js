console.info('Mediafire');

function checkDownloadButton() {
    const dlButton = document.querySelector('#download_link .input');
    if (dlButton != null && dlButton.href) {
        // Nếu có nút thì thực hiện click để download
        dlButton.click();
    } else {
        // Kiểm tra tiếp
        setTimeout(checkDownloadButton, 1000);
    }
}

checkDownloadButton();

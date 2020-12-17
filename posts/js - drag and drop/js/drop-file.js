/**
 * Khởi tạo.
 */
function initFilesZone() {
    // Vùng drop
    const zone = document.querySelector('#filesZone');

    // Đối tượng chọn file
    const file = document.querySelector('#filesZone input');

    // Khi click vào vùng thì bật hộp thoại chọn file
    zone.addEventListener('click', () => {
        file.click();
    });

    // Thiết lập vùng drop
    setupHighlightDropZone(zone);

    // Xử lý các file, hiển thị tên và dung lượng
    const handleFiles = (evt) => {
        const files = evt.target.files || evt.dataTransfer.files;
        let html = '';        
        for (let i = 0; i < files.length; i++) {
            const f = files[i];
            html += '<li>' + f.name + ', ' + f.size + '</li>';
        }
        document.querySelector('#fileList').innerHTML = html;
    };

    // Khi drop thì xử lý file
    zone.addEventListener('drop', (evt) => {
        // Khi drop file thì phải thêm cả cái này
        // Nếu không thì sẽ download file
        evt.preventDefault();

        handleFiles(evt);
    });

    // Khi chọn file thì cũng xử lý file
    file.addEventListener('change', (evt) => {
        handleFiles(evt); 
    });
}

initFilesZone();

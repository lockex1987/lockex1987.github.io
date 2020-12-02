(function() {

    // Danh sách các file đang upload
    var uploadingFiles = [];

    // Chỉ số file đang upload
    var currentIndex = 0;
    
    /**
     * Lắng nghe sự kiện bắt đầu upload file.
     * @param {Files} files Các file được chọn
     */
    function startUploadFilesHandler(files) {
        uploadingFiles = files;
        currentIndex = 0;

        bindUploadingFiles();
        document.querySelector('#uploadingSection').style.display = 'block';
        uploadFile();
    }

    /**
     * Hiển thị danh sách các file đang upload.
     */
    function bindUploadingFiles() {
        var tableBodyHtml = '';
        for (var idx = 0; idx < uploadingFiles.length; idx++) {
            var f = uploadingFiles[idx];
            tableBodyHtml += `
                    <tr>
                        <td>${idx + 1}</td>
                        <td>${f.name}</td>
                        <td class="text-right">${f.size}</td>
                        <td>
                            <div class="progress" style="height:10px; width: 250px;">
                                <div class="progress-bar" style="width:0%;height:10px" id="progressBar${idx}"></div>
                            </div>
                        </td>
                    </tr>
                `;
        }

        document.querySelector('#uploadingList').innerHTML = `
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên</th>
                            <th class="text-right">Dung lượng</th>
                            <th>Tiến trình</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableBodyHtml}
                    </tbody>
                </table>`;
    }

    /**
     * Upload file.
     */
    function uploadFile() {
        var formData = new FormData();
        formData.append('myFile', uploadingFiles[currentIndex]);

        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', uploadCompleteHandler);
        xhr.upload.addEventListener('progress', uploadProgressHandler);
        xhr.responseType = 'json';
        xhr.open('POST', 'server/file_upload.php'); 
        xhr.send(formData);
    }

    /**
     * Cập nhật phần trăm upload được.
     * @param {Event} e 
     */
    function uploadProgressHandler(e) {
        var percent = (e.loaded / e.total) * 100;
        document.querySelector(`#progressBar${currentIndex}`).style.width = percent + '%';
    }

    /**
     * Xử lý khi đã upload xong một file.
     * @param {Event} e 
     */
    function uploadCompleteHandler(e) {
        document.querySelector(`#progressBar${currentIndex}`).style.width = '100%';
        currentIndex++;
        if (currentIndex < uploadingFiles.length) {
            // Nếu còn file thì upload tiếp
            uploadFile();
        } else {
            // Đã upload xong, ẩn vùng upload
            document.querySelector('#uploadingList').innerHTML = '';
            document.querySelector('#uploadingSection').style.display = 'none';

            // Thông báo đã upload xong
            PubSub.publish('uploadFinish');
        }
    }

    function init() {
        // Thêm subscriber 1
        PubSub.subscribe('startUploadFiles', startUploadFilesHandler);
    }

    init();
})();
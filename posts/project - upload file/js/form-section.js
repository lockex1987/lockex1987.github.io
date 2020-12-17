(function() {

    function init() {
        // Khi click vào nút thì mở hộp thoại chọn file (giả lập click vào file input)
        document.querySelector('#uploadButton').addEventListener('click', function() {
            document.querySelector('#uploadFileInput').click();
        });

        // Khi chọn file xong thì thông báo bắt đầu upload file
        document.querySelector('#uploadFileInput').addEventListener('change', function() {
            PubSub.publish('startUploadFiles', this.files);
        });
    }

    init();
})();
function callGet1() {
    var data = $('#frm').serialize();

    $.ajax({
        url: '../php - mock api/get_demo.php',
        //type: 'GET',
        data: data,
        success: function (data) {    
            document.getElementById('demo1').innerHTML = data;
        }
    });
}

function callGet2() {
    var data = {
        name: 'Nguyễn Anh & Tuấn'
    };
    $.ajax({
        url: '../php - mock api/get_demo.php',
        data: data,
        success: function (data) {    
            document.getElementById('demo2').innerHTML = data;
        }
    });
}

function callParallel() {
    let n = 2;
    let count = n;
    let results = [];
    for (let i = 1; i <= 2; i++) {
        let data = {
            name: 'CTTD' + i
        };
        $.ajax({
            url: '../php - mock api/get_demo.php',
            data: data,
            success: function (s) {
                results.push(s);
                count--;
                if (count == 0) {
                    results.forEach(data => {
                        var idx = parseInt(data.substring(data.length - 1));
                        document.getElementById('demo' + idx).innerHTML = data;
                    });
                }
            }
        }); 
    }
}

function callPostForm() {
    var data = $('#frm').serialize();

    $.ajax({
        url: '../php - mock api/post_form_demo.php',
        type: 'POST',
        data: data,
        success: function (data) {    
            document.getElementById('demo3').innerHTML = data;
        }
    });
}

function callPostJson() {
    var data = JSON.stringify({ name: 'Nguyễn Anh & Tuấn' }); // phải chỉ định rõ chuyển JSON về xâu
    $.ajax({
        url: '../php - mock api/post_json_demo.php',
        type: 'POST',
        data: data,
        contentType: 'application/json', // phải thêm cái này, nếu không mặc định sẽ là "application/x-www-form-urlencoded; charset=UTF-8"
        //processData: false, // 
        success: function (data) {    
            document.getElementById('demo4').innerHTML = data;
        }
    });
}

function callPostUpload() {
    var file = document.querySelector('#uploadImage').files[0];
    var data = new FormData();
    data.append('uploadImage', file);

    $.ajax({
        url: '../php - mock api/post_upload_demo.php',
        type: 'POST',
        data: data,
        contentType: false,
        processData: false,
        success: function (data) {
            // Không cần dùng JSON.parse
            var html = (data.code == 0) ? `<img src="uploads/${data.fileName}"/>` : 'Lỗi';
            document.getElementById('demo5').innerHTML = html;
        },
        xhr: function () {
            var req = new XMLHttpRequest();
            req.upload.addEventListener('progress', function (evt) {
                if (evt.lengthComputable) {
                    var percent = evt.loaded * 100 / evt.total;
                    console.log(percent);
                }
            });
            return req;
        }
    });
}

function callErrorPage() {
    $.ajax({
        url: '../php - mock api/my_401.php',
        success: function (data) {    
            alert('Thành công');
        },
        error: function (xhr) {
            alert('Thất bại');
        }
    });
}

/**
 * Các request AJAX thêm CRSF token để phòng chống lỗi CSRF.
 */
function setupAjaxCommon() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': getCsrfToken()
        }
    });

    // Kiểm tra gọi AJAX nếu người dùng chưa đăng nhập, hoặc session đã hết hạn
    $(document).ajaxError(function (evt, xhr) {
        console.log(xhr);

		//processLaravelValidationErrors(xhr);

        if (xhr.status == 401 || xhr.status == 440) {
            alert('Session đã hết hạn');
            //window.location = '/';
        }
    });
}

// Bạn vẫn cần jQuery vì nhiều plugin cần nó (Bootstrap)

setupAjaxCommon();

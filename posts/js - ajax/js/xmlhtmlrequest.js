function callAjax1(method, url, callback, data) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            callback(req);
        }
    };

    req.open(method, url, true);
    if (method == 'GET') {
        req.send();
    } else {
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        req.send(data);
    }
}

function callAjax(method, url, callback, data, dataType, errorCallback) {
    var req = new XMLHttpRequest();
    req.addEventListener('load', function () {
        console.log(req.status);
        if (req.status >= 400) {
            errorCallback(req);
        } else {
            callback(req);
        }
    });
    req.addEventListener('error', function () {
        alert('Error');
    });
    req.addEventListener('abort', function () {
        alert('Abort');
    });
    req.upload.addEventListener('progress', function (evt) {
        if (evt.lengthComputable) {
            var percent = evt.loaded * 100 / evt.total;
            console.log(percent);
        }
    });

    req.open(method, url);
    if (method == 'GET') {
        req.send();
    } else {
        if (dataType == 'json') {
            req.setRequestHeader('Content-type', 'application/json');
        } else if (dataType == 'upload') {
            // Không cần chỉ định
        } else {
            // Bắt buộc phải có cái này nếu gửi POST dạng form
            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        req.send(data);
    }
}


function callGet1() {
    callAjax1('GET', '../php - mock api/get_demo.php?name=' + 'Nguyễn Anh & Tuấn', function (req) {
        document.getElementById('demo1').innerHTML = req.responseText;
    });
}

function callGet2() {
    callAjax('GET', '../php - mock api/get_demo.php?name=' + encodeURIComponent('Nguyễn Anh & Tuấn'), function (req) {
        document.getElementById('demo2').innerHTML = req.responseText;

        var allHeaders = req.getAllResponseHeaders();
        console.log(allHeaders);
        var contentType = req.getResponseHeader('content-type')
        console.log(contentType);
    });
}

function callParallel() {
    let n = 2;
    let count = n;
    let results = [];
    for (let i = 1; i <= 2; i++) {
        callAjax('GET', '../php - mock api/get_demo.php?name=' + 'CTTD' + i, function (req) {
            let s = req.responseText;
            results.push(s);
            count--;
            if (count == 0) {
                results.forEach(data => {
                    var idx = parseInt(data.substring(data.length - 1));
                    document.getElementById('demo' + idx).innerHTML = data;
                });
            }
        });
    }
}

function callPostForm() {
    var data = 'name=' + encodeURIComponent('Nguyễn Anh Tuấn');
    callAjax('POST', '../php - mock api/post_form_demo.php', function (req) {
        document.getElementById('demo3').innerHTML = req.responseText;
    }, data);
}

function callPostJson() {
    var data = JSON.stringify({ name: 'Nguyễn Anh Tuấn' });
    callAjax('POST', '../php - mock api/post_json_demo.php', function (req) {
        document.getElementById('demo4').innerHTML = req.responseText;
    }, data, 'json');
}

function callPostUpload() {
    var file = document.querySelector('#uploadImage').files[0];
    var data = new FormData();
    data.append('uploadImage', file);
    callAjax('POST', '../php - mock api/post_upload_demo.php', function (req) {
        var data = JSON.parse(req.responseText);
        var html = (data.code == 0) ? `<img src="uploads/${data.fileName}"/>` : 'Lỗi';
        document.getElementById('demo5').innerHTML = html;
    }, data, 'upload');
}

function callErrorPage() {
    callAjax(
        'GET',
        '../php - mock api/my_401.php',
        function (req) {
            alert('Thành công');
        },
        null,
        null,
        function (req) {
            alert('Thất bại');
        }
    );
}

function setupAjaxCommon() {
    (function (open) {
        XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
            this.addEventListener('load', () => {
                if (this.status >= 400) {
                    if ([440, 401, 419].includes(this.status)) {
                        alert('Session đã hết hạn, CSRF token không hợp lệ, chưa đăng nhập');
                    }
                }
            });

            open.call(this, method, url, async, user, pass);
            this.setRequestHeader('X-CSRF-TOKEN', getCsrfToken());
            // Thiết lập thế này để phương thức $request->ajax() trả về true
            this.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        };
    })(XMLHttpRequest.prototype.open);
}

setupAjaxCommon();

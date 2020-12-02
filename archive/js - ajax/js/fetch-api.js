function ajaxGet(url) {
    return fetch(url);
}

function ajaxPostForm(url, textData) {
    return fetch(url, {
        method: 'POST',
        body: textData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    });
}

function ajaxPostJson(url, jsonObj) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(jsonObj),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    });
}

function ajaxPostUpload(url, formData) {
    return fetch(url, {
        method: 'POST',
        body: formData
    });
}

function ajaxDelete(url) {
    return fetch(url, {
        method: 'DELETE'
    });
}

var ajaxJson = resp => resp.json();

var ajaxText = resp => resp.text();

// ----------------------------------------------------------------------------

function callGet1() {
    ajaxGet('../php - mock api/get_demo.php?name=' + 'Nguyễn Anh & Tuấn')
        .then(ajaxText)
        .then(data => document.getElementById('demo1').innerHTML = data);
}

function callGet2() {
    ajaxGet('../php - mock api/get_demo.php?name=' + encodeURIComponent('Nguyễn Anh & Tuấn'))
        .then(resp => resp.text())
        .then(data => document.getElementById('demo2').innerHTML = data);
}

function callParallel() {
    var promises = [];
    for (var i = 1; i <= 2; i++) {
        promises.push(ajaxGet('../php - mock api/get_demo.php?name=CTTD' + i).then(ajaxText));
    }

    Promise
        .all(promises)
        .then(results => {
            console.log(results);
            results.forEach(data => {
                var idx = parseInt(data.substring(data.length - 1));
                console.log(data);
                document.getElementById('demo' + idx).innerHTML = data;
            });
        });
}

function callPostForm() {
    var data = 'name=' + encodeURIComponent('Nguyễn Anh Tuấn');

    ajaxPostForm('../php - mock api/post_form_demo.php', data)
        .then(ajaxText)
        .then(data => document.getElementById('demo3').innerHTML = data);
}

function callPostJson() {
    var data = { name: 'Nguyễn Anh Tuấn' };

    ajaxPostJson('../php - mock api/post_json_demo.php', data)
        .then(ajaxText)
        .then(data => document.getElementById('demo4').innerHTML = data);
}

function callPostUpload() {
    var file = document.querySelector('#uploadImage').files[0];
    var data = new FormData();
    data.append('uploadImage', file);

    ajaxPostUpload('../php - mock api/post_upload_demo.php', data)
        .then(resp => resp.json())
        .then(data => {
            var html = (data.code == 0) ? `<img src="uploads/${data.fileName}"/>` : 'Lỗi';
            document.getElementById('demo5').innerHTML = html;
        });
    // Fetch API không hỗ trợ progress
}

function callErrorPage() {
    ajaxGet('../php - mock api/my_401.php')
        .then(ajaxJson)
        .then(data => alert('Thành công'))
        .catch(error => {
            console.log(error);
            alert('Thất bại');
        });
}


function setupAjaxCommon() {
    const constantMock = window.fetch;

    window.fetch = function () {
        var url = arguments[0];
        var config = arguments.length > 1 ? arguments[1] : {};
        if (!config.headers) {
            config.headers = {};
        }
        // Thiết lập thế này để phương thức $request->ajax() trả về true
        config.headers['X-Requested-With'] = 'XMLHttpRequest'
        config.headers['X-CSRF-TOKE'] = getCsrfToken();

        return new Promise((resolve, reject) => {
            constantMock(url, config)
                .then(resp => {
                    var status = resp.status;
                    if (status >= 400) {
                        if ([440, 401, 419].includes(status)) {
                            alert('Session đã hết hạn, CSRF token không hợp lệ, chưa đăng nhập');
                        }
                        reject(resp);
                    } else {
                        resolve(resp);
                    }
                })
                .catch(error => {
                    // Lỗi mạng mới vào đây
                    alert(error);
                    //reject(error);
                });
        });
    }
}

setupAjaxCommon();

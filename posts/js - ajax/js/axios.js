function callGet1() {
    axios.get('../php - mock api/get_demo.php?name=' + 'Nguyễn Anh & Tuấn')
            .then(resp => {
                console.log(resp);
                document.getElementById('demo1').innerHTML = resp.data;
            });
}

async function callGet2() {
    var { data } = await axios.get('../php - mock api/get_demo.php', {
            params: {
                name: 'Nguyễn Anh & Tuấn'
            }
        });
    document.getElementById('demo2').innerHTML = data;
}

function callParallel() {
    var promises = [];
    for (var i = 1; i <= 2; i++) {
        promises.push(axios.get('../php - mock api/get_demo.php?name=CTTD' + i));
    }

    var get1 = () => axios.get('../php - mock api/get_demo.php?name=CTTD1');
    var get2 = () => axios.get('../php - mock api/get_demo.php?name=CTTD2');

    axios
            //.all([get1(), get2()])
            .all(promises)
            .then(results => {
                results.forEach(resp => {
                    var data = resp.data;
                    var idx = parseInt(data.substring(data.length - 1));
                    console.log(data);
                    document.getElementById('demo' + idx).innerHTML = data;
                });
            });
}

function callPostForm() {
    var data = 'name=' + encodeURIComponent('Nguyễn Anh Tuấn');

    axios.post('../php - mock api/post_form_demo.php', data, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            })
            .then(resp => document.getElementById('demo3').innerHTML = resp.data);
}

function callPostJson() {
    var data = { name: 'Nguyễn Anh Tuấn' };

    axios.post('../php - mock api/post_json_demo.php', data)
            .then(resp => document.getElementById('demo4').innerHTML = resp.data);
}

function callPostUpload() {
    var file = document.querySelector('#uploadImage').files[0];
    var data = new FormData();
    data.append('uploadImage', file);

    axios.post('../php - mock api/post_upload_demo.php', data, {
                onUploadProgress: progressEvent => {
                    console.log(progressEvent) // .loaded
                }
            })
            .then(resp => {
                var data = resp.data;
                var html = (data.code == 0) ? `<img src="uploads/${data.fileName}"/>` : 'Lỗi';
                document.getElementById('demo5').innerHTML = html;
            });
}

function callErrorPage() {
    axios.get('../php - mock api/my_401.php')
        .then(resp => alert('Thành công'))
        .catch((error) => {
            alert('Thất bại');
            console.log(error);
            console.log(error.response);
        });
}



function setupAjaxCommon() {
    var requestHandler = request => {
        request.headers['X-CSRF-TOKE'] = getCsrfToken();
        // Thiết lập thế này để phương thức $request->ajax() trả về true
        request.headers['X-Requested-With'] = 'XMLHttpRequest'
        return request
    };
    axios.interceptors.request.use(requestHandler);

    var successHandler = response => response;
    var errorHandler = error => {
        const { status } = error.response
        if ([440, 401, 419].includes(status)) {
            alert('Session đã hết hạn, CSRF token không hợp lệ, chưa đăng nhập');
            //window.location = '/';
        }
        return Promise.reject(error)
    };
    axios.interceptors.response.use(successHandler, errorHandler);
}

setupAjaxCommon();

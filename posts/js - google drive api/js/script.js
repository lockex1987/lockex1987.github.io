// Tham khảo:
// https://developers.google.com/drive
// https://developers.google.com/identity/protocols/oauth2
// https://codepen.io/ravi-shukla/pen/ywQdYw
// https://github.com/lockex1987/lockex1987.github.io/blob/master/posts/project%20-%20money%20manager/js/app.js

/**
 * Khởi tạo Vue.
 * @param {Object} GoogleAuth Đối tượng GoogleAuth
 */
function initVueApp(GoogleAuth) {
    new Vue({
        el: '#app',

        data() {
            return {
                isAuthorized: false,
                files: null,
                isUploading: false,
                fileSize: 0,
                uploadedBytes: 0,
                uploadedPercent: 0
            };
        },

        mounted() {
            // Handle initial sign-in state. (Determine if user is already signed in.)
            this.setSigninStatus();

            // Listen for sign-in state changes.
            GoogleAuth.isSignedIn.listen(this.setSigninStatus);
        },

        methods: {
            /**
             * Thiết lập trạng thái đăng nhập.
             */
            setSigninStatus() {
                const user = GoogleAuth.currentUser.get();
                this.isAuthorized = !!user.hasGrantedScopes(GOOGLE_API.SCOPE);
                if (this.isAuthorized) {
                    this.getFiles();
                } else {
                    this.files = null;
                }
            },

            /**
             * Đăng nhập hoặc đăng xuất.
             */
            handleAuthClick() {
                if (GoogleAuth.isSignedIn.get()) {
                    // User is authorized and has clicked 'Sign out' button
                    // console.log('Sao không đăng xuất?');
                    GoogleAuth.signOut();
                } else {
                    // User is not signed in, start Google auth flow
                    GoogleAuth.signIn();
                }
            },

            /**
             * Bỏ kết nối.
             */
            revokeAccess() {
                // TODO: Cần cập nhật lại setSigninStatus
                GoogleAuth.disconnect();
            },

            /**
             * Upload file.
             * Nội dung file tự sinh.
             */
            uploadGeneratedFile() {
                const fileContent = 'sample text';
                const file = new Blob([fileContent], { type: 'text/plain' });

                const metadata = {
                    name: 'sample.txt',
                    mimeType: 'text/plain'
                };
                const form = new FormData();
                form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
                form.append('file', file);

                this.uploadFile(form);
            },

            /**
             * Upload file bình thường.
             */
            async uploadNormalFile() {
                // Nếu đang upload rồi thì dừng lại
                if (this.isUploading) {
                    return;
                }

                const accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
                const file = this.$refs.fileInput.files[0];

                // Bước 1: Lấy URL resumable session
                const metadata = {
                    name: file.name,
                    mimeType: file.type
                };
                const resp = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', {
                    method: 'POST',
                    body: JSON.stringify(metadata),
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                    // mode: 'no-cors'
                });
                const location = resp.headers.get('Location');
                // console.log(location);

                // Bước 2: Upload file
                // Upload theo từng phần nhỏ
                this.fileSize = file.size;
                // Kích thước của từng phần, đơn vị là byte
                // 1 MB
                const chunkSize = 1 * 1024 * 1024;
                this.uploadedBytes = 0;
                // return;

                const reader = new FileReader();
                let blob = file.slice(this.uploadedBytes, this.uploadedBytes + chunkSize); // a single chunk in starting of step size
                let totalFailures = 0;
                reader.addEventListener('load', (evt) => {
                    this.isUploading = true;
                    this.uploadedPercent = Math.round(this.uploadedBytes * 100 / this.fileSize);

                    // console.log(this.uploadedBytes + ', ' + this.fileSize);
                    const xhr = new XMLHttpRequest();
                    xhr.open('put', location);
                    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
                    // xhr.setRequestHeader('Content-Length', chunkSize);
                    xhr.setRequestHeader('Content-Range', `bytes ${this.uploadedBytes}-${Math.min(this.uploadedBytes + chunkSize, this.fileSize) - 1}/${this.fileSize}`);
                    xhr.responseType = 'json';
                    xhr.addEventListener('load', () => {
                        // console.log('File ID', xhr.response.id);
                        if (xhr.status >= 200 && xhr.status < 400) {
                            totalFailures = 0;

                            // if file is not completely uploaded
                            this.uploadedBytes = this.uploadedBytes + chunkSize;
                            if (this.uploadedBytes <= this.fileSize) {
                                // getting next chunk
                                blob = file.slice(this.uploadedBytes, this.uploadedBytes + chunkSize);
                                // Reading it through file reader which will call onload again
                                // So it will happen recursively until file is completely uploaded
                                reader.readAsArrayBuffer(blob);
                            } else {
                                // if file is uploaded completely
                                // just changed loaded which could be used to show status
                                console.log('Completed');
                                this.isUploading = false;
                                this.getFiles();
                            }
                        } else {
                            totalFailures++;
                            if (totalFailures < 3) {
                                // Nếu có lỗi thì thử lại
                                console.log('Try again', totalFailures);
                                reader.readAsArrayBuffer(blob);
                            } else {
                                this.isUploading = false;
                            }
                        }
                    });

                    // Nếu có lỗi thì thử lại
                    xhr.addEventListener('error', (evt) => {
                        console.log(evt);
                        setTimeout(() => {
                            console.log('Try again');
                            reader.readAsArrayBuffer(blob);
                        }, 1000);
                    });

                    /*
                    xhr.upload.addEventListener('progress', (evt) => {
                        if (evt.lengthComputable) {
                            const percent = evt.loaded * 100 / evt.total;
                            console.log(`${evt.loaded} / ${evt.total} ${percent}%`);
                        }
                    });
                    */
                    // const form = new FormData();
                    // form.append('file', file);
                    // form.append('file', reader.result);
                    // xhr.send(form);
                    xhr.send(reader.result);
                });

                // Reading that chunk
                // When it read it, onload will be invoked
                reader.readAsArrayBuffer(blob);
            },

            /**
             * Upload file.
             * @param {} form 
             */
            uploadFile(form) {
                const accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.

                const xhr = new XMLHttpRequest();
                xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
                xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
                xhr.responseType = 'json';
                xhr.addEventListener('load', () => {
                    console.log('File ID', xhr.response.id);
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log('Completed');
                    }
                });
                xhr.upload.addEventListener('progress', (evt) => {
                    if (evt.lengthComputable) {
                        const percent = evt.loaded * 100 / evt.total;
                        console.log(`${evt.loaded} / ${evt.total} ${percent}%`);
                    }
                });
                xhr.send(form);
            },

            /**
             * Tạo thư mục.
             */
            async createFolder() {
                // Dùng cách này, owner không phải là 'me'
                const fileMetadata = {
                    name: 'Test folder a',
                    // title: 'Test folder b',
                    mimeType: 'application/vnd.google-apps.folder'
                };
                const resp = await gapi.client.drive.files.create({
                    resource: fileMetadata
                    // fields: 'id'
                });
                console.log(resp.result.id);

                /*
                const access_token = gapi.auth.getToken().access_token;
                const request = gapi.client.request({
                    path: '/drive/v2/files/',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + access_token,
                    },
                    body: {
                        title: 'Folder',
                        mimeType: 'application/vnd.google-apps.folder',
                    }
                });

                request.execute(function (resp) {
                    console.log(resp);
                    // document.getElementById('info').innerHTML = 'Created folder: ' + resp.title;
                });
                */
            },

            /**
             * Lấy danh sách file.
             */
            async getFiles() {
                const resp = await gapi.client.drive.files.list({
                    // Chỉ hiện thị các file của mình, không hiển thị các file share và đã xóa
                    q: "'me' in owners and trashed = false",
                    // q: "trashed = false",
                    // pageSize: 10,
                    // fields: 'nextPageToken, files(id, name)',
                    // mimeType, kind
                    fields: 'files(id, name, webContentLink, webViewLink, size)'
                });
                this.files = resp.result.files;
            },

            /**
             * Download file.
             * @param {String} fileId ID của file
             * @param {String} fileName Tên của file
             */
            async downloadFile(fileId, fileName) {
                console.log(fileId);
                const resp = await gapi.client.drive.files.get({
                    fileId: fileId,
                    alt: 'media'
                });
                console.log(resp);
                CommonUtils.downloadBlob(resp, fileName);
                // window.location = 'https://www.googleapis.com/drive/v3/files/' + fileId + '?alt=media&key=' + GOOGLE_API.API_KEY;
            },

            /**
             * Xóa file.
             * @param {String} fileId ID của file
             */
            async deleteFile(fileId) {
                const resp = await gapi.client.drive.files.delete({
                    fileId: fileId
                });
                console.log(resp);
                this.getFiles();
            },

            /**
             * Hiển thị dung lượng file.
             * @param {Integer} n Dung lượng file
             */
            prettifyNumber(n) {
                if (n === undefined) {
                    return '';
                }
                if (typeof n == 'string') {
                    n = parseInt(n);
                }
                return CommonUtils.prettifyNumber(n);
            }
        }
    });
}


/**
 * Hàm này sẽ được gọi sau khi Google API load xong.
 */
function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient);
    // gapi.client.load('drive', 'v2', makeRequest);
}


/**
 * Khởi tạo.
 */
async function initClient() {
    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    await gapi.client.init({
        apiKey: GOOGLE_API.API_KEY,
        discoveryDocs: [
            GOOGLE_API.DISCOVERY_URL
        ],
        clientId: GOOGLE_API.CLIENT_ID,
        scope: GOOGLE_API.SCOPE
    });

    const GoogleAuth = gapi.auth2.getAuthInstance();
    document.querySelector('#app').style.display = '';
    initVueApp(GoogleAuth);
}

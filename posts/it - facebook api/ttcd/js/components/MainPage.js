let MainPage = {
    template: `
            <div>
                <div class="text-right mb-4">
                    <img src="images/user.svg" style="width: 1em;"/>

                    <a href="javascript:;" class="text-decoration-none" title="Đăng xuất" @click="processLogout()">
                        {{ user.username }}
                    </a>
                </div>

                <section v-show="screen == 'form'">
                    <div v-if="!currentUid">
                        Vui lòng đăng nhập Facebook và mở extension trên tab Facebook.
                    </div>

                    <div class="text-center" v-else>
                        <div>
                            <img class="rounded" :src="getFacebookAvatar(currentUid)"/>
                        </div>

                        <div>
                            {{ currentUsername }}
                        </div>

                        <div class="mt-2">
                            <button @click="saveCookie()" type="button" class="btn btn-primary mb-1">
                                Lưu thông tin
                            </button>

                            <button @click="gotoScreen('list')" type="button" class="btn btn-secondary mb-1">
                                Từ chối
                            </button>

                            <button @click="clickClearButton()" type="button" class="btn btn-danger mb-1 d-none">
                                Thoát khỏi Facebook hiện tại
                            </button>
                        </div>
                    </div>
                </section>

                <section v-show="screen == 'list'">
                    <div v-if="listCookies">
                        <div v-if="listCookies.length == 0">
                            Bạn chưa có tài khoản Facebook trên hệ thống Truyền thông chủ động.
                        </div>

                        <div class="list-table" v-else>
                            <div>
                                Danh sách tài khoản Facebook hiện có
                            </div>
                            <div class="cookie mt-3 d-flex w-100 p-1 rounded align-items-center"
                                    v-for="(cc, idx) in listCookies">
                                <img :src="getFacebookAvatar(cc.fb_id)" class="rounded-circle mr-2 facebook-avatar"/>

                                <div class="mr-2">
                                    <div class="fullname">
                                        {{ cc.name }}
                                    </div>
                                    <div class="small">
                                        <span class="text-danger" v-if="cc.webStatus == 'failed'">
                                            Token không hợp lệ
                                        </span>
                                        <span class="text-success" v-if="cc.webStatus == 'ok'">
                                            Token hợp lệ
                                        </span>
                                    </div>
                                </div>

                                <img src="images/check.svg"
                                        class="icon choose-icon ml-auto cursor-pointer"
                                        title="Chọn"
                                        @click="chooseCookieRow(cc)"/>

                                <img src="images/bin.svg"
                                        class="icon delete-icon ml-3 cursor-pointer"
                                        title="Xóa"
                                        @click="deleteCookieRow(idx)"/>
                            </div>
                        </div>
                    </div>

                    <div class="mt-2 text-center">
                        <button @click="gotoScreen('form')" type="button" class="btn btn-primary mb-1">
                            Thêm tài khoản Facebook
                        </button>
                    </div>
                </section>
            </div>`,

    props: [
        'user',
        'token'
    ],

    data() {
        return {
            // Xâu chứa cookie
            currentCookie: '',
            // ID người dùng Facebook hiện tại
            currentUid: '',
            // Tên người dùng Facebook hiện tại
            currentUsername: '',
            // Token hiện tại
            currentAccessToken: '',
            // Mã dtsg để gọi API lấy access token
            currentDtsg: '',
            // Danh sách cookie được lưu
            listCookies: null,
            // Màn hình (form hoặc list)
            screen: 'list'
        };
    },

    mounted() {
        this.checkCurrentTab();
    },

    methods: {
        gotoScreen(screen) {
            this.screen = screen;
        },

        /**
         * Đăng xuất.
         */
        processLogout() {
            localStorage.removeItem('ttcdToken');
            window.location.reload();
        },

        /**
         * Lấy cookie của Facebook.
         */
        loadFacebookCookie(callback) {
            let filter = {
                url: 'https://www.facebook.com'
            };
            let getCookieCallback = (cookie) => {
                let result = '';
                for (let i = 0; i < cookie.length; i++) {
                    result += cookie[i].name + '=' + cookie[i].value + ';';
                    if (cookie[i].name == 'c_user') {
                        this.currentUid = cookie[i].value;
                    }
                }
                this.currentCookie = result;
                callback();
            };
            chrome.cookies.getAll(filter, getCookieCallback);
        },

        /**
         * Lấy tên người dùng của Facebook.
         * Tab hiện tại cần là Facebook.
         * @param {Function} callback Hàm callback sau khi đã lấy được tên
         */
        getFacebookUserName(tab) {
            chrome.tabs.executeScript(tab.id, {
                file: './js/get-user-name.js'
            }, (results) => {
                let name = results[0];
                this.currentUsername = name;
            });
        },

        /**
         * Lấy mã dtsg từ trang Facebook.
         * @param tab Tab trình duyệt
         */
        getDtsgCodeFromFacebookPage(tab) {
            chrome.tabs.executeScript(tab.id, {
                file: './js/get-dtsg.js'
            }, (results) => {
                let dtsg = results[0];
                this.currentDtsg = dtsg;
            });
        },

        /**
         * Kiểm tra tab hiện tại.
         */
        checkCurrentTab() {
            // Kiểm tra tab hiện tại có phải là facebook không
            chrome.tabs.getSelected(null, (tab) => {
                if (tab.url.includes('www.facebook.com')) {
                    this.loadFacebookCookie(() => {
                        // Nếu đã đăng nhập
                        if (this.currentUid) {
                            this.getFacebookUserName(tab);
                            this.getDtsgCodeFromFacebookPage(tab);
                        }
                    });
                }
            });
        },

        /**
         * Lấy ảnh đại diện của Facebook từ ID người dùng
         * https://developers.facebook.com/docs/graph-api/reference/v2.2/user/picture
         * @param {String} uid 
         */
        getFacebookAvatar(uid) {
            return `http://graph.facebook.com/${uid}/picture?type=large`;
        },

        /**
         * Hiển thị các thông tin cookie cũ đã lưu.
         */
        bindOldCookies(oldData) {
            if (oldData) {
                console.log(oldData);
                this.listCookies = oldData;
            } else {
                this.listCookies = [];
            }

            // Kiểm tra trạng thái các token
            this.listCookies.forEach((cc, idx) => {
                this.getUserInfoByAccessToken(cc.token, (data) => {
                    if (!data.name) {
                        this.$set(cc, 'webStatus', 'failed');
                    } else {
                        this.$set(cc, 'webStatus', 'ok');
                    }
                });
            });
        },

        /**
         * Lắng nghe sự kiện xóa cookie.
         */
        deleteCookieRow(idx) {
            let fbId = this.listCookies[idx].fb_id;

            this.listCookies.splice(idx, 1);

            // Lưu vào storage
            let options = {
                headers: {
                    'Authorization': 'Bearer ' + this.token
                },
                data: {
                    fb_ids: [
                        fbId
                    ]
                }
            };
            axios.delete(apiRoot + '/register/add_fb', options)
                    .then(resp => {
                        console.log(resp.data);
                    });
        },

        /**
         * Lắng nghe sự kiện chọn cookie.
         */
        chooseCookieRow(cc) {
            this.importCookie(cc.cookie);
        },

        /**
         * Lưu cookie vào trình duyệt.
         * @param {String} cookie 
         */
        importCookie(cookie) {
            // Xóa các cookie cũ.
            // Sau đó thiết lập lại.
            this.clearAllCookies(() => {
                cookie.split(';').forEach(s => {
                    let [name, val] = s.split('=');
                    const domains = [
                        'https://www.facebook.com',
                        'https://upload.facebook.com',
                        'https://business.facebook.com',
                        'https://web.facebook.com',
                        'https://m.facebook.com',
                        'https://mbasic.facebook.com',
                        'https://developers.facebook.com',
                        'https://mobile.facebook.com'
                    ];
                    domains.forEach(d => {
                        chrome.cookies.set({
                            url: d,
                            name: name,
                            value: val
                        });
                    });
                });

                // Chuyển đến trang Facebook
                chrome.tabs.getSelected(null, (tab) => {
                    if (tab.url.indexOf('https://www.facebook.com') < 0) {
                        chrome.tabs.update(tab.id, {
                            url: 'https://www.facebook.com'
                        });
                    }
                });

                // Reload lại trang
                chrome.tabs.getSelected(null, (tab) => {
                    let code = 'window.location.reload();';
                    chrome.tabs.executeScript(tab.id, { code: code });
                });

                // Load lại thông tin
                setTimeout(this.checkCurrentTab, 3000);
            });
        },

        /**
         * Xóa các cookie cũ của domain facebook.com.
         * @param {Function} callback Hàm callback
         */
        clearAllCookies(callback) {
            let removeCookie = (cookie) => {
                let url = 'http' + (cookie.secure ? 's' : '') + '://' + cookie.domain + cookie.path;
                chrome.cookies.remove({
                    url: url,
                    name: cookie.name
                });
            };

            chrome.cookies.getAll({ domain: 'facebook.com' }, (allCookies) => {
                allCookies.forEach(cookie => removeCookie(cookie));

                callback();
            });
        },

        /**
         * Lưu thông tin cookie.
         */
        saveCookie() {
            this.getAccessToken(() => {
                if (!this.currentAccessToken) {
                    noti.error('Có lỗi khi lấy access token');
                } else {
                    this.addToListCookies();
                    this.gotoScreen('list');
                }
            });
        },

        /**
         * Thêm vào danh sách cookie.
         */
        addToListCookies() {
            let cc = {
                fb_id: this.currentUid,
                name: this.currentUsername,
                cookie: this.currentCookie,
                token: this.currentAccessToken,
                webStatus: 'ok'
            };

            // Kiểm tra nếu tồn tại thì xóa đi
            let idx = this.listCookies.findIndex(e => e.fb_id == cc.fb_id);
            if (idx >= 0) {
                this.listCookies.splice(idx, 1);
            }

            // Thêm mới
            this.listCookies.push(cc);

            // Lưu vào storage
            let params = {
                extra_info: [
                    cc
                ]
            };
            let options = {
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            };
            axios.post(apiRoot + '/register/add_fb', params, options)
                    .then(resp => {
                        console.log(resp.data);
                    });
        },

        /**
         * Xử lý khi nhấn nút clear.
         */
        clickClearButton() {
            // Xóa cookie, sau đó reload lại trang để người dùng đăng nhập tài khoản khác
            this.clearAllCookies(() => {
                chrome.tabs.getSelected(null, (tab) => {
                    if (tab.url.includes('www.facebook.com')) {
                        let code = 'window.location.reload();';
                        chrome.tabs.executeScript(tab.id, { code: code });
                    }
                });
            });
        },

        /**
         * Lấy access token.
         */
        getAccessToken(callback) {
            let url = 'https://www.facebook.com/v1.0/dialog/oauth/confirm';
            let params = 'fb_dtsg=' + this.currentDtsg +
                '&app_id=124024574287414' +
                '&redirect_uri=fbconnect%3A%2F%2Fsuccess' +
                '&display=page' +
                '&access_token=' +
                '&from_post=1' +
                '&return_format=access_token' +
                '&domain=' +
                '&sso_device=ios' +
                '&_CONFIRM=1' +
                '&_user=' + this.currentUid;
            let http = new XMLHttpRequest();
            http.open('POST', url);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.onreadystatechange = () => {
                if (http.readyState == 4 && http.status == 200) {
                    let resp = http.responseText;
                    let a = resp.match(/access_token=([^&]*)/);
                    if (a) {
                        this.currentAccessToken = a[1];
                    } else {
                        this.currentAccessToken = '';
                    }
                    callback();
                }
            };
            http.send(params);
        },

        /**
         * Lấy thông tin người dùng dựa vào access token.
         * @param {String} accessToken Access token
         */
        getUserInfoByAccessToken(accessToken, callback) {
            let params = _.jsonToQueryString({
                access_token: accessToken,
                debug: 'all',
                fields: 'id,name',
                format: 'json',
                method: 'get',
                pretty: 0,
                suppress_http_code: 1,
                transport: 'cors'
            });
            let options = {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            };

            axios.get('https://graph.facebook.com/v5.0/me' + params, options)
                    .then(resp => {
                        callback(resp.data);
                    });
        }
    }
};

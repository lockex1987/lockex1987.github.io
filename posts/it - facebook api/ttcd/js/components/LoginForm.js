let LoginForm = {
    template: `
            <div style="">
                <div class="">
                    <div style="">
                        <div class="text-center">
                            <img src="images/logo.png" style="width: 64px;">
                        </div>
                        <div class="text-center mb-4" style="font-size: 28px">
                            Đăng nhập phần mở rộng
                        </div>

                        <form @submit.prevent="processLogin">
                            <div class="mt-2 mb-5 text-danger" v-if="errorMessage">
                                {{ errorMessage }}
                            </div>

                            <div class="form-group">
                                <input v-model.trim="username" type="text" class="form-control" placeholder="Tên đăng nhập" required autofocus>
                            </div>

                            <div class="form-group mt-4">
                                <input v-model.trim="password" type="password" class="form-control" placeholder="Mật khẩu" required>
                            </div>

                            <div class="mb-0 mt-5 text-center">
                                <button class="btn btn-primary" type="submit">
                                    Đăng nhập
                                    <span class="spinner-border spinner-border-sm" v-show="isProcessing"></span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>`,

    data() {
        return {
            username: 'test',
            password: '',
            token: '',
            errorMessage: '',
            isProcessing: false
        }
    },

    mounted() {
        this.token = this.getSavedToken();
        if (this.token) {
            this.getUserInfo();
        }
    },

    methods: {
        getSavedToken() {
            return localStorage.ttcdToken;
        },

        saveToken() {
            localStorage.ttcdToken = this.token;
        },

        getUserInfo() {
            axios.get(apiRoot + '/user/get-info', {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(resp => {
                    let user = resp.data.data;

                    // Chuyển đến danh sách
                    this.$emit('get-login-info', {
                        token: this.token,
                        user: user
                    });
                });
        },

        processLogin() {
            if (this.isProcessing) {
                return;
            }

            this.isProcessing = true;

            let params = {
                username: this.username,
                password: this.password
            };
            axios.post(apiRoot + '/authentication/login', params)
                .then((resp) => {
                    const { data } = resp;
                    this.handleData(data);
                })
                .catch((error) => {
                    let resp = error.response;
                    if (resp.status == 401) {
                        this.errorMessage = 'Thông tin đăng nhập không chính xác';
                    } else {
                        this.errorMessage = 'Đã có lỗi xảy ra';
                        console.log(resp);
                    }
                })
                .finally(() => {
                    this.isProcessing = false;
                });
        },

        handleData(data) {
            if (data.code != 0) {
                this.errorMessage = 'Thông tin đăng nhập không chính xác';
            } else {
                // Ẩn các thông báo lỗi cũ
                this.errorMessage = '';

                // Lưu token
                this.token = data.data;
                this.saveToken();

                // Lấy thông tin người dùng
                this.getUserInfo();
            }
        },
    }
};
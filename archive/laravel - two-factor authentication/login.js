require('../../auth-bootstrap.js');

import vi from 'vee-validate/dist/locale/vi';
import VeeValidate, {Validator} from 'vee-validate';
import { loginService } from "../../services/userServices.js";

const dictionary = {
    en: vi, // ghi đè mặc định, vì nếu để vi: vi thì chạy theo thứ tự "en" mặc định vẫn sử dụng trước "vi"
};
VeeValidate.Validator.localize(dictionary);

Validator.localize('vi', vi);
Vue.use(VeeValidate);


var vm = new Vue({
    el: '#app',

    data() {
        return {
            // Đối tượng jQuery của form đăng nhập
            loginEl: null,

            // Thông tin đăng nhập
            name: '',
            password: '',
            otpCode: '',
            remember: false,

            // Hiển thị thông báo hướng dẫn xác thực 2 lớp
            show2FactorIntro: false,

            // Khóa bí mật của xác thực 2 lớp
            secretKey: '',

            // Đường dẫn ảnh QR code
            qrCodeUrl: '',

            // Thông báo lỗi
            errorNotify: '',

            // Có hiển thị màn hình nhập mã OTP không
            showOtpScreen: false
        }
    },

    mounted() {
        this.loginEl = jQuery(this.$refs.loginForm);
    },

    methods: {
        /**
         * Hiển thị form quên mật khẩu.
         */
        displayForgetPasswordForm() {
            this.loginEl.removeClass('m-login--signin');
            this.loginEl.removeClass('m-login--signup');

            this.loginEl.addClass('m-login--forget-password');
            this.loginEl.find('.m-login__forget-password').animateClass('flipInX animated');
        },

        /**
         * Hiển thị form đăng nhập.
         */
        displaySignInForm() {
            this.loginEl.removeClass('m-login--forget-password');
            this.loginEl.removeClass('m-login--signup');

            this.loginEl.addClass('m-login--signin');
            this.loginEl.find('.m-login__signin').animateClass('flipInX animated');
        },

        /**
         * Validate form đăng nhập.
         */
        validateForm(scope) {
            this.$validator.validateAll(scope)
                .then(result => {
                    if (result) {
                        if (scope == 'loginForm') {
                            vm.handleSignInFormSubmit();
                        }
                    }
                });
        },

        /**
         * Xử lý đăng nhập.
         */
        handleSignInFormSubmit() {
            if (this.showOtpScreen && !this.otpCode) {
                this.errorNotify = 'Vui lòng nhập mã OTP';
                return;
            }

            // Hiển thị nút xoay xoay
            jQuery(this.$refs.loginBtn).addClass('m-loader m-loader--right m-loader--light').attr('disabled', true);

            loginService({
                name: this.name,
                password: this.password,
                otpCode: this.otpCode,
                remember: this.remember ? true : null
            }, function (response) {
                // Ẩn các thông báo lỗi cũ
                vm.errorNotify = '';

                // Ẩn nút xoay xoay
                jQuery(vm.$refs.loginBtn).removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false);

                if (response.code == 0) {
                    // Nếu đăng nhập thành công thì chuyển trang
                    window.location = AppCommon.baseUrl + response.intended;
                } else if (response.code == 1) {
                    // Hiển thị xác thực 2 lớp
                    vm.show2FactorIntro = true;
                    vm.secretKey = response.secretKey;
                    vm.qrCodeUrl = response.qrCodeUrl;

                    // Hiển thị nhập mã OTP
                    vm.showOtpScreen = true;
                } else if (response.code == 3) {
                    // Hiển thị nhập mã OTP
                    vm.showOtpScreen = true;
                } else if (response.code == 2) {
                    // Hiển thị thông báo lỗi
                    vm.errorNotify = response.message;
                }
            }, function (err) {
                // Ẩn nút xoay xoay
                jQuery(vm.$refs.loginBtn).removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false);

                // Hiển thị thông báo lỗi
                vm.errorNotify = 'Thông tin đăng nhập không đúng, vui lòng thử lại';
            })
        }
    }
});

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>
        Đăng nhập | {{ config('app.name') }}
    </title>
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"/>
    <link rel="stylesheet" href="https://maxcdn.icons8.com/fonts/line-awesome/1.1/css/line-awesome.min.css"/>
    <link rel="stylesheet" href="{{ url('/'). mix('/css/app.css') }}"/>
    <style>
        [v-cloak] {
            display: none;
        }
    </style>

    <link rel="shortcut icon" href="{{ asset('images/logo.png') }}"/>

    <script>
        window.AppCommon = {
            baseUrl: '{{ url('/') }}'
        };
    </script>
</head>


<body class="m--skin- m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default">
    <div class="m-grid m-grid--hor m-grid--root m-page"
            id="app"
            v-cloak>
        <div class="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--singin m-login--2 m-login-2--skin-2"
                id="m_login"
                ref="loginForm"
                style="background-image: url({{ asset('media/img//bg/bg-3.jpg') }});">
            <div class="m-grid__item m-grid__item--fluid m-login__wrapper">
                <div class="m-login__container">
                    <div class="m-login__logo">
                        <a href="#">
                            <img style="width: 11rem; margin-left: 2rem"
                                    src="{{ asset('images/logo.png') }}">
                        </a>
                    </div>

                    <!-- Form đăng nhập -->
                    <div class="m-login__signin">
                        <div class="m-login__head">
                            <h3 class="m-login__title">
                                Đăng nhập hệ thống
                            </h3>
                        </div>

                        <form class="m-login__form m-form"
                                method="POST"
                                action="javascript:;"
                                ref="loginForm"
                                data-vv-scope="loginForm"
                                @submit.prevent="validateForm('loginForm')">

                            <!-- Thông báo lỗi -->
                            <div class="m-alert m-alert--outline alert alert-danger alert-dismissible"
                                    v-if="errorNotify"
                                    v-cloak>
                                <span>@{{errorNotify}}</span>
                            </div>

                            <!-- Màn hình nhập tên và mật khẩu -->
                            <div v-show="!showOtpScreen">
                                <div class="form-group m-form__group"
                                        :class="{ 'has-danger': errors.has('loginForm.name') }">
                                    <input class="form-control m-input"
                                            type="text"
                                            placeholder="Tên đăng nhập"
                                            name="name"
                                            ref="name"
                                            v-model.trim="name"
                                            v-validate="'required'"
                                            data-vv-as="Tên đăng nhập"
                                            autocomplete="off">
                                    <div class="form-control-feedback"
                                            v-cloak
                                            v-show="errors.has('loginForm.name')">
                                        @{{errors.first('loginForm.name')}}
                                    </div>
                                </div>

                                <div class="form-group m-form__group"
                                        :class="{ 'has-danger': errors.has('loginForm.password') }">
                                    <input class="form-control m-input m-login__form-input--last-need_deleted"
                                            type="password"
                                            ref="password"
                                            v-model.trim="password"
                                            data-vv-as="Mật khẩu"
                                            v-validate="'required'"
                                            placeholder="Mật khẩu"
                                            name="password">

                                    <div class="form-control-feedback"
                                            v-cloak
                                            v-show="errors.has('loginForm.password')">
                                        @{{errors.first('loginForm.password')}}
                                    </div>
                                </div>

                                <div class="row m-login__form-sub">
                                    <div class="col m--align-left m-login__form-left">
                                        <label class="m-checkbox  m-checkbox--focus">
                                            <input type="checkbox"
                                                    name="remember"
                                                    value="1"
                                                    v-model="remember">
                                            Ghi nhớ
                                            <span></span>
                                        </label>
                                    </div>

                                    <div class="col m--align-right m-login__form-right"
                                            style="display: none;">
                                        <a href="javascript:;"
                                                id="m_login_forget_password"
                                                class="m-link"
                                                v-on:click="displayForgetPasswordForm">
                                            Quên mật khẩu?
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!-- Thông báo hướng dẫn OTP -->
                            <div v-show="showOtpScreen && show2FactorIntro"
                                    class="text-center">
                                <div style="margin-bottom: 1rem; margin-top: 3rem;">
                                    Bạn chưa thiết lập xác thực 2 bước
                                </div>

                                <div style="margin-bottom: 1rem">
                                    Để xác thiết lập xác thực 2 bước, bạn có thể scan mã QR sau,
                                    hoặc sử dụng khóa <b>@{{secretKey}}</b>
                                </div>

                                <div>
                                    <img :src="qrCodeUrl">
                                </div>
                            </div>

                            <!-- Màn hình mã OTP -->
                            <div v-show="showOtpScreen">
                                <div class="form-group m-form__group"
                                        :class="{ 'has-danger': errors.has('loginForm.otpCode') }">
                                    <input class="form-control m-input m-login__form-input--last"
                                            type="text"
                                            ref="otpCode"
                                            v-model.trim="otpCode"
                                            data-vv-as="Mã OTP"
                                            v-validate="''"
                                            placeholder="Mã OTP"
                                            name="otpCode">

                                    <div class="form-control-feedback"
                                            v-cloak
                                            v-show="errors.has('loginForm.otpCode')">
                                        @{{errors.first('loginForm.otpCode')}}
                                    </div>
                                </div>
                            </div>    

                            <div class="m-login__form-action">
                                <button id="m_login_signin_submit"
                                        ref="loginBtn"
                                        type="submit"
                                        class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air m-login__btn m-login__btn--primary">
                                    @{{showOtpScreen ? 'Xác nhận' : 'Đăng nhập'}}
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Form quên mật khẩu -->
                    <div class="m-login__forget-password">
                        <div class="m-login__head">
                            <h3 class="m-login__title">
                                Quên mật khẩu?
                            </h3>

                            <div class="m-login__desc">
                                Nhập email của bạn để thiết lập lại mật khẩu của bạn:
                            </div>
                        </div>

                        <form class="m-login__form m-form" action="">
                            {{ csrf_field() }}

                            <div class="form-group m-form__group">
                                <input class="form-control m-input"
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        id="m_email"
                                        autocomplete="off"/>
                            </div>

                            <div class="m-login__form-action">
                                <button id="m_login_forget_password_submit"
                                        class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air m-login__btn m-login__btn--primaryr">
                                    Gửi yêu cầu
                                </button>

                                &nbsp; &nbsp;

                                <a href="javascript:;"
                                        id="m_login_forget_password_cancel"
                                        v-on:click="displaySignInForm"
                                        class="btn btn-outline-focus m-btn m-btn--pill m-btn--custom m-login__btn">
                                    Hủy
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script src="{{ url('/').mix('js/pages/user/login.js') }}"></script>
</body>
</html>

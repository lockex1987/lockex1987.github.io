<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


/**
 * Trang chủ.
 */
Route::get('/', function () {
    return 'Đây là trang CSRF Main';
});


/**
 * Vào trang đổi email.
 */
Route::get('/user/email', function () {
    return view('update-email');
});


/**
 * Thực hiện giả lập người dùng đã đăng nhập rồi.
 */
Route::get('/fake-login', function (Request $request) {
    $request->session->setAttribute('isLogin', true);
    return 'Login';
});


/**
 * Thực hiện đổi email.
 */
Route::post('/user/email', function (Request $request) {
    $isLogin = $request->session->getAttribute('isLogin');
    if (!$isLogin) {
        return 'Ban chua login';
    }
    $email = $request->email;
    return 'Email của bạn đã được sửa thành ' . $email;
});


// Gọi API thông qua PHP
Route::get('/call-api/{path}', function (string $path) {
    echo 'Gọi API ' . $path;
})->where('path', '(.*)');


Route::get('/check-login', function (Request $request) {
    $referer = $request->headers->get('referer');
    $url = parse_url($referer);
    $host = $url['host'];
    // echo $host;
    if (in_array($host, ['csrf-malicious.to'])) {
        return response()
            ->view('check-login')
            // ->header('X-Frame-Options', 'SAMEORIGIN') // DENY, SAMEORIGIN
            ;    
    } else {
        return 'Permission denied';
    }
});

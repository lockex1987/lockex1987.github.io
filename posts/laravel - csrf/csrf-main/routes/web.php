<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return 'Đây là trang CSRF Main';
});

Route::post('/user/email', function (Request $request) {
    $email = $request->email;
    echo 'Email của bạn đã được sửa thành ' . $email;
});

// Gọi API thông qua PHP
Route::get('/call-api/{path}', function (string $path) {
    echo 'Gọi API ' . $path;
})->where('path', '(.*)');

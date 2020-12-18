<?php

Route::group(['prefix' => '/user', 'as' => 'user.'], function () {
    Route::get('/', 'UserController@index')->name('index');
    Route::post('listing', 'UserController@listing')->name('listing');
    Route::post('list-all', 'UserController@listAll')->name('list-all');
    Route::post('create', 'UserController@store')->name('create');
    Route::post('edit', 'UserController@edit')->name('edit');
    Route::post('delete', 'UserController@delete')->name('delete');
    Route::post('changePass', 'UserController@changePass')->name('changePass');
    Route::post('changeStatus', 'UserController@changeStatus')->name('changeStatus');
    Route::post('config-totp', 'UserController@configTotp')->name('configTotp');
});

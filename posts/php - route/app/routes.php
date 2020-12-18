<?php

$router->get('/x', function () {
    echo 'home';
});

$router->get('/', 'HomeController@index');

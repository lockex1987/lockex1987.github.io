<?php

require_once __DIR__ . '/../vendor/autoload.php';

/*
$slim = new \Slim\App();

$slim->get('/', function ($request, $response) {
    $response->write('Hey! Slim started.');
});

$slim->run();
*/


$illuminateContainer = new \Illuminate\Container\Container();

// Load config
$config = new \Illuminate\Config\Repository();
$config->set('database', require __DIR__ . '/../config/database.php');
$illuminateContainer->instance('config', $config);

// Register database service
$service = new \Illuminate\Database\DatabaseServiceProvider($illuminateContainer);
$service->register();

// Set default connection for models.
\Illuminate\Database\Eloquent\Model::setConnectionResolver($illuminateContainer['db']);

$users = \App\Models\User::all();
foreach ($users as $user) {
    echo $user->username . '<br />' . PHP_EOL;
}


echo 'Hello World' . PHP_EOL;

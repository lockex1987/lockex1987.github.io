<?php
require_once __DIR__ . '/vendor/autoload.php';

use Workerman\Worker;

// Create a Websocket server
$wsWorker = new Worker("websocket://0.0.0.0:2346");

// 4 processes
$wsWorker->count = 4;

// Emitted when new connection come
$wsWorker->onConnect = function($connection)
{
    echo "New connection\n";
};

// Emitted when data received
$wsWorker->onMessage = function($connection, $data)
{
    // Send hello $data
    $connection->send('hello ' . $data);
};

// Emitted when connection closed
$wsWorker->onClose = function($connection)
{
    echo "Connection closed\n";
};

// Run worker
Worker::runAll();
?>
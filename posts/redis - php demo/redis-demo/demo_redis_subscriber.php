<?php

require_once 'bootstrap.php';

use Cttd\RedisDemo\RedisConnection;

function subscribeToRedis(): void
{
    $conn = new RedisConnection();
    $channels = ['chan-1', 'chan-2', 'chan-3'];
    $callback = function ($redis, $chan, $msg) {
        echo $chan . PHP_EOL;
        echo $msg . PHP_EOL;
    };
    $conn->redis->subscribe($channels, $callback);
}

subscribeToRedis();

echo 'Dòng này không được thực thi' . PHP_EOL;

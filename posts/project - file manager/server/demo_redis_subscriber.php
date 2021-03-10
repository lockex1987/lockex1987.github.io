<?php

include_once 'vendor/autoload.php';

use Cttd\FileManager\RedisConnection;


function subscribeToRedis(): void
{
    $redis = RedisConnection::connectRedis();
    $callback = function ($redis, $chan, $msg) {
        echo $chan . PHP_EOL;
        echo $msg . PHP_EOL;
    };
    $redis->subscribe(['chan-1', 'chan-2', 'chan-3'], $callback);
}

subscribeToRedis();

echo 'Dòng này không được thực thi' . PHP_EOL;

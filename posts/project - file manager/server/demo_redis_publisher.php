<?php

include_once 'vendor/autoload.php';

use Cttd\FileManager\RedisConnection;


function publishToRedis(): void
{
    $redis = RedisConnection::connectRedis();
    $redis->publish('chan-1', 'hello, world!');
}

publishToRedis();

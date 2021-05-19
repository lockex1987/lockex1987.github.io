<?php

require_once 'bootstrap.php';

use Cttd\RedisDemo\RedisConnection;

function publishToRedis(): void
{
    $conn = new RedisConnection();
    $channel = 'chan-1';
    $message = 'hello, world!';
    $conn->redis->publish($channel, $message);
}

publishToRedis();

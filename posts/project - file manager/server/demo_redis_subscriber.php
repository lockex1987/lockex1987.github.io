<?php

include_once 'bootstrap.php';

$redis = RedisConnection::connectRedis();

function f($redis, $chan, $msg)
{
    echo $chan . PHP_EOL;
    echo $msg . PHP_EOL;
}

$redis->subscribe(['chan-1', 'chan-2', 'chan-3'], 'f'); // subscribe to 3 chans

echo 'Dòng này không được thực thi' . PHP_EOL;

<?php

include_once 'bootstrap.php';

$redis = RedisConnection::connectRedis();

$redis->publish('chan-1', 'hello, world!'); // send message

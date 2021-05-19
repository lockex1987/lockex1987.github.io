<?php

require_once 'bootstrap.php';

use Cttd\RedisDemo\RedisConnection;

$conn = new RedisConnection();
$pipe = $conn->redis->multi(Redis::PIPELINE);
// A Redis::MULTI block of commands runs as a single transaction
for ($i = 0; $i < 100; $i++) {
    $pipe->incr('pipe');
}
$results = $pipe->exec();
var_dump($results);

<?php

namespace Cttd\RedisDemo;

use Redis;

class RedisConnection
{
    public Redis $redis;

    public function __construct()
    {
        $this->redis = $this->connectRedis();
        // echo 'Server is running: ' . $this->redis->ping('hello') . PHP_EOL;
    }

    /**
     * Khi kết thúc thì tự động đóng kết nối.
     * Nên sử dụng Chain of Responsibility?
     */
    public function __destruct()
    {
        $this->redis->close();
    }

    public static function connectRedis(): Redis
    {
        $redis = new Redis();
        $REDIS_HOST = $_ENV['REDIS_HOST'];
        $REDIS_PORT = $_ENV['REDIS_PORT'];
        $redis->connect($REDIS_HOST, $REDIS_PORT);
        return $redis;
    }
}

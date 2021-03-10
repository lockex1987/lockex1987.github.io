<?php

namespace Cttd\FileManager;

use Redis;

class RedisConnection
{
    public static function connectRedis(): Redis
    {
        $redis = new Redis();
        $redis->connect(REDIS_HOST, REDIS_PORT);
        return $redis;
    }
}

<?php

require_once 'bootstrap.php';

use Cttd\RedisDemo\RedisConnection;

function getAllStoredData($redis)
{
    $keys = $redis->keys("*");
    var_dump($keys);
}

function testString($redis)
{
    $key = "tutorialname";
    $redis->set($key, "Redis tutorial");
    $value = $redis->get($key);
    echo $key . ": " . $value . PHP_EOL;
}

function testList($redis)
{
    $key = "queue#tasks";
    $redis->lpush($key, "first task");
    $redis->lpush($key, "second task");

    $task = $redis->rpop($key);
    echo $task . PHP_EOL;

    $key = "tutorial-list";
    $redis->lpush($key, "Redis");
    $redis->lpush($key, "MongoDB");
    $redis->lpush($key, "MySQL");

    $list = $redis->lrange($key, 0, 5);
    echo "Stored list in Redis:" . PHP_EOL;
    for ($i = 0; $i < count($list); $i++) {
        echo "    " . ($i + 1) . ": " . $list[$i] . PHP_EOL;
    }
}

function testSet($redis)
{
    $key = "nicknames";
    $redis->sadd($key, "nickname#1");
    $redis->sadd($key, "nickname#2");
    $redis->sadd($key, "nickname#1");

    $nicknames = $redis->smembers($key);
    $exists = $redis->sismember($key, "nickname#1");
    var_dump($nicknames);
    echo $exists . PHP_EOL;
}

function testSortedSet($redis)
{
    $key = "ranking";
    $redis->zadd($key, 3000.0, "PlayerOne");
    $redis->zadd($key, 1500.0, "PlayerTwo");
    $redis->zadd($key, 8200.0, "PlayerThree");

    // The variable player will hold the value PlayerThree because we are retrieving the top 1 player and he is the
    // one with the highest score.
    $player = $redis->zrevrange($key, 0, 1)[0];

    // The rank variable will have a value of 1 because PlayerOne is the second in the ranking and the ranking is
    // zero-based.
    $rank = $redis->zrevrank($key, "PlayerOne");
    echo $player . PHP_EOL;
    echo $rank . PHP_EOL;
}

function testHash($redis)
{
    $key = "user#1";
    $redis->hset($key, "name", "Peter");
    $redis->hset($key, "job", "politician");

    $name = $redis->hget($key, "name");
    $fields = $redis->hgetAll($key);
    $job = $fields["job"];
    echo $name . PHP_EOL;
    echo $job . PHP_EOL;
}

$redis = (new RedisConnection())->redis;

// getAllStoredData($redis);
// testString($redis);
// testList($redis);
// testSet($redis);
// testSortedSet($redis);
testHash($redis);

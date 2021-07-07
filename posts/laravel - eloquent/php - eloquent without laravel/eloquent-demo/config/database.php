<?php

return [
    'default' => 'mysql',
    'fetch' => PDO::FETCH_CLASS,
    'connections' => [
        'mysql' => [
            'driver' => 'mysql',
            'host' => 'localhost',
            'port' => '3306',
            'database' => 'sso',
            'username' => 'root',
            'password' => 'abc123a@',
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null
        ]
    ]
];

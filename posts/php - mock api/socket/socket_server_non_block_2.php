<?php

// https://dev.to/aldora713/php-non-blocking-socket-part-2-1g2a

ini_set('error_reporting', E_ALL ^ E_NOTICE);
ini_set('display_errors', 1);

set_time_limit(0);

$address = '127.0.0.1';
$port = 25003;

ob_implicit_flush();

$sock = socket_create(AF_INET, SOCK_STREAM, 0);

socket_bind($sock, $address, $port) or die('Could not bind to address');

socket_listen($sock);

socket_set_nonblock($sock);

$clients = [];
$seconds = 0;

while (true) {
    if ($newsock = socket_accept($sock)) {
        echo "inside socket accept\n";
        if (is_resource($newsock)) {
            socket_set_nonblock($newsock);
            echo "New client connected\n";
            $clients[] = $newsock;
        }
    }

    if (count($clients) < 1) {
        // sleep(1);
        continue;
    }

    $read = $write = $except = [];
    $tv_sec = 5;
    $tv_usec = 5000;
    $read = $clients;

    $changed = socket_select($read, $write, $except, $tv_sec, $tv_sec);

    if (false == $changed) {
        continue;
    }

    if ($changed < 1) {
        continue;
    }

    foreach ($read as $k => $socketItem) {
        if ($input = socket_read($socketItem, 1024)) {
            $input = trim($input);
            echo "$k: $input\n";
            $response = "Received" . "\n";
            socket_write($socketItem, $response, strlen($response));
            if ($input == 'quit') {
                socket_close($socketItem);
                unset($clients[$k]);
            }
        } else {
            echo "Socket read error: " . socket_strerror(socket_last_error()) . "\n";
        }
    }

    // sleep(1);
}

socket_close($sock);

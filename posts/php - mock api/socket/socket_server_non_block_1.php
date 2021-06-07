<?php

// https://dev.to/aldora713/php-non-blocking-socket-3am6






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
        sleep(1);
        continue;
    }

    














    foreach ($clients as $k => $v) {
        if ($input = socket_read($v, 1024)) {
            $input = trim($input);
            echo "$k: $input\n";
            $response = "Received" . "\n";
            socket_write($v, $response, strlen($response));
            if ($input == 'quit') {
                socket_close($v);
                unset($clients[$k]);
            }
        }
    }
    sleep(1);
}

socket_close($sock);

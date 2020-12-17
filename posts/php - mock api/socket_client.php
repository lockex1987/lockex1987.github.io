<?php

// Thiết lập các biến
$host = '127.0.0.1';
$port = 25003;

$message = 'Nguyen Anh Tuan tenet';
echo 'Message to server: ' . $message . PHP_EOL;

// Tạo socket kết nối đến server
$clientSocket = socket_create(AF_INET, SOCK_STREAM, 0);
socket_connect($clientSocket, $host, $port);

// Gửi request đến server
socket_write($clientSocket, $message, strlen($message));

// Nhận response từ server
$result = socket_read($clientSocket, 1024);
echo 'Reply from server: ' . $result . PHP_EOL;

// Đóng socket
socket_close($clientSocket);

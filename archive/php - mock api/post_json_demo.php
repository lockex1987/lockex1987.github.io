<?php

// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json);

$name = $data->name;
echo 'Xin chào ' . $name;

<?php

header('Content-Type: application/json; charset=UTF-8');
/*
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // JSONs are by default dynamic data
header('Content-type: application/json');
*/

$myObj = new \stdClass();
$myObj->name = 'John';
$myObj->age = 30;
$myObj->city = 'New York';
$myObj->method = $_SERVER['REQUEST_METHOD'];

$myJSON = json_encode($myObj);

echo $myJSON;

<?php
$name = $_GET['name'];

$myObj = new \stdClass();
$myObj->name = $name;

sleep(5);

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($myObj);

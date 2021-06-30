<?php

// json_encode
$myObj = new stdClass();
$myObj->name = 'John';
$myObj->age = 30;
$myObj->city = 'New York';
echo json_encode($myObj) . PHP_EOL;

$myArr1 = ['John', 'Mary', 'Peter', 'Sally', 'Nguyễn Văn Huyên'];
echo json_encode($myArr1) . PHP_EOL;
echo json_encode($myArr1, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . PHP_EOL;

$myArr2 = [
    'name' => 'Nguyen Van Cuong',
    'email' => 'TheHalfHeart@gmail.com',
    'website' => 'freetuts.net'
];

echo json_encode($myArr2) . PHP_EOL;

// json_decode
$json_string = <<<JSON
    {
        "name" : "Nguyen Van Cuong",
        "email": "TheHalfHeart@gmail.com",
        "website": "freetuts.net"
    }
    JSON;

$obj = json_decode($json_string);
print_r($obj);
echo $obj->name . PHP_EOL;
echo $obj->email . PHP_EOL;
echo $obj->website . PHP_EOL;

// Dạng mảng
var_dump(json_decode($json_string, true));
 
// Dạng object
var_dump(json_decode($json_string));

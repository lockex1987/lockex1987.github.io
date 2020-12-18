<?php
// json_encode
$myObj = new \stdClass();
$myObj->name = "John";
$myObj->age = 30;
$myObj->city = "New York";
echo json_encode($myObj) . "\n";

$myArr1 = array("John", "Mary", "Peter", "Sally");
echo json_encode($myArr1) . "\n";

$myArr2 = array(
    "name" => "Nguyen Van Cuong",
    "email" => "TheHalfHeart@gmail.com",
    "website" => "freetuts.net" 
);

echo json_encode($myArr2) . "\n";

// json_decode
$json_string = 
'
    {
        "name" : "Nguyen Van Cuong",
        "email": "TheHalfHeart@gmail.com",
        "website": "freetuts.net"
    }
';

$obj = json_decode($json_string);
print_r($obj);
echo $obj->name . "\n";
echo $obj->email . "\n";
echo $obj->website . "\n";

// Dạng mảng
var_dump(json_decode($json_string, true));
 
// Dạng object
var_dump(json_decode($json_string));

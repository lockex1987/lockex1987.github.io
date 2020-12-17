<?php
// DB details
$dbHost     = '10.30.153.186';
$dbUsername = 'hungpv39';
$dbPassword = '123456a@';
$dbName     = 'ttcd_v2';

/*
$dbHost     = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName     = 'test';
*/

// Create connection and select DB
$db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($db->connect_error) {
   die("Connection failed: " . $db->connect_error);
}
?>
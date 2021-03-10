<?php

include 'vendor/autoload.php';

use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use MyCompany\MyModule\FirstClass;


$log = new Logger('name');
$log->pushHandler(new StreamHandler('mylogfile.log', Logger::WARNING));

$log->warning('ghi log');
$log->error('ghi log abc');


$cls = new FirstClass();
$cls->helloComposer();

<?php

require 'vendor/autoload.php';

use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\RotatingFileHandler;
use Monolog\Formatter\LineFormatter;
// use DateTimeZone;


// The default date format is "Y-m-d\TH:i:sP"
$dateFormat = "Y-m-d H:i:s";
// The default output format is "[%datetime%] %channel%.%level_name%: %message% %context% %extra%\n"
$output = "[%datetime%] %level_name%: %message% %context% %extra%\n";

$formatter = new LineFormatter($output, $dateFormat, true, true);
$formatter->includeStacktraces();

$stream = new StreamHandler(__DIR__ . '/logs/app.log', Logger::DEBUG);
$stream->setFormatter($formatter);

$filename = __DIR__ . '/logs/' . php_sapi_name() . '.log';
$rotate = new RotatingFileHandler($filename, 30);
$rotate->setFilenameFormat('laravel-{date}-{filename}', 'Y-m-d');

$logger = new Logger('log');
$logger->pushHandler($stream);
$logger->pushHandler($rotate);
$logger->setTimezone(new DateTimeZone('Asia/Ho_Chi_Minh'));

$logger->info('This is a log! ^_^ ');
$logger->warning('This is a log warning! ^_^ ');
$logger->error('This is a log error! ^_^ ');
$logger->info('Adding a new user', ['username' => 'Seldaek']);

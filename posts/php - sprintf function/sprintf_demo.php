<?php

$start_at = '2018-10-17';
$end_at = '2018-12-31';
$interval = 'day';

$url_template = 'http://10.30.154.10:8500/voice/api/log/v1/rest/overview?start_at=%s&end_at=%s&interval=%s';
$url = sprintf($url_template, $start_at, $end_at, $interval);
echo $url;

sprintf('%08d', 1234567);
str_pad($value, 8, '0', STR_PAD_LEFT);

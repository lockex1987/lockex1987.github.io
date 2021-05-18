<?php

if (! defined('PHP_NEXUS_VERSION')) {
    require_once dirname(__DIR__) . '/autoload.php';
}

use PHPNexus\Composer\Demo;

$demo = new Demo();
echo $demo . PHP_EOL;

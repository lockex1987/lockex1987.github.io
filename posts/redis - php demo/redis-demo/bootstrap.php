<?php

require_once 'vendor/autoload.php';

use Dotenv\Dotenv;

function initConfig(): void
{
    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();
}

initConfig();

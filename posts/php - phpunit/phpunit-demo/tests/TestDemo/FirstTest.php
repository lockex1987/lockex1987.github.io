<?php

namespace Tests\Cttd\TestDemo;

use PHPUnit\Framework\TestCase;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;


class FirstTest extends TestCase
{
    public function testTrueIsTrue()
    {
        // $this->demoLog();
        $foo = true;
        $this->assertTrue($foo);
    }

    private function demoLog(): void
    {
        $log = new Logger('name');
        $log->pushHandler(new StreamHandler('mylogfile.log', Logger::WARNING));
        $log->warning('ghi log');
        $log->error('ghi log abc');
    }
}

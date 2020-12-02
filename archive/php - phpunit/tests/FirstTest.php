<?php
namespace Test;

use PHPUnit\Framework\TestCase;

class FirstTest extends TestCase
{
    public function testTrueIsTrue()
    {
        $foo = true;
        $this->assertTrue($foo);
    }
}
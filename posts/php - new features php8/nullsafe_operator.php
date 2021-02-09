<?php

class Foo
{
    private ?DateTime $bar;

    public function __construct()
    {
        $this->bar = null;
    }

    public function getStartDate(): ?DateTime
    {
        return $this->bar;
    }
}

$obj = new Foo();

$startDate = $obj->getStartDate();
var_dump($startDate ? $startDate->getTimestamp() : null);

var_dump($obj->getStartDate()?->getTimestamp());

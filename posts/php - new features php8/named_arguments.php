<?php

function foo(string $a, string $b, ?string $c = null, ?string $d = null) 
{
    echo $a . PHP_EOL;
    echo $b . PHP_EOL;
    echo $c . PHP_EOL;
    echo $d . PHP_EOL;
}

foo(
    b: 'value b', 
    a: 'value a', 
    d: 'value d'
);

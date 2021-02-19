<?php

function printFormatted(callable $format, $str)
{
    echo $format($str) . PHP_EOL;
    echo '<br>';
}


function exclaim($str)
{
    return $str . '!';
}


printFormatted('exclaim', 'Hello World');

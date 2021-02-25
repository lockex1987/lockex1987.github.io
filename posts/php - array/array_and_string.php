<?php

/**
 * Hàm implode để nối các phần tử trong mảng thành một xâu.
 */
function demoImplode()
{
    $arr = ['Hello', 'World!', 'Beautiful', 'Day!'];
    echo implode(' ', $arr) . PHP_EOL;
    echo implode('+', $arr) . PHP_EOL;
    echo implode('-', $arr) . PHP_EOL;
    echo implode(' X ', $arr);
}


/**
 * Hàm explode để tách xâu thành mảng.
 */
function demoExplode()
{
    $str = 'one,two,three,four';

    // default
    print_r(explode(',', $str));

    // zero limit
    print_r(explode(',', $str, 0));
    echo PHP_EOL;

    // positive limit
    print_r(explode(',', $str, 2));
    echo PHP_EOL;

    // negative limit 
    print_r(explode(',', $str, -1));
}


function demoPregSplit()
{
    $date = '1970-01-01 00:00:00';
    $pattern = '/[-\s:]/';
    $components = preg_split($pattern, $date);
    print_r($components);
}


function demoStrSplit()
{
    $input = '12345678';
    $arr = str_split($input, 3);
    print_r($arr);
}


// demoImplode();
// demoExplode();
// demoPregSplit();
demoStrSplit();

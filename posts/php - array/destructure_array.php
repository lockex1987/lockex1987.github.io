<?php

$array = ['one', 'two', 'three'];
// list($a, $b, $c) = $array;
[$a, $b, $c] = $array;
echo $a . PHP_EOL; // one
echo $b . PHP_EOL; // two
echo $c . PHP_EOL; //three

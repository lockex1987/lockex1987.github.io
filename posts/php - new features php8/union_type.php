<?php

function sumInt(int $a, int $b): int
{
	return $a + $b;
}


function sumFloat(float $a, float $b): float
{
	return $a + $b;
}


function sumUnion(int|float $a, int|float $b): int|float
{
	return $a + $b;
}


var_dump(sumInt(1, 1));
var_dump(sumInt(1.1, 1.1));
var_dump(sumInt(1, 1.1));
var_dump(sumInt('1', '1.1'));

echo '----' . PHP_EOL;

var_dump(sumFloat(1, 1));
var_dump(sumFloat(1.1, 1.1));
var_dump(sumFloat(1, 1.1));
var_dump(sumFloat('1', '1.1'));

echo '----' . PHP_EOL;

var_dump(sumUnion(1, 1));
var_dump(sumUnion(1.1, 1.1));
var_dump(sumUnion(1, 1.1));
var_dump(sumUnion('1', '1.1'));

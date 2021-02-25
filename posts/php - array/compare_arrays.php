<?php

function demoArrayDiff1()
{
    $a1 = ['a' => 'red', 'b' => 'green', 'c' => 'blue', 'd' => 'yellow'];
    $a2 = ['e' => 'red', 'f' => 'green', 'g' => 'blue'];

    $result = array_diff($a1, $a2);
    print_r($result);
}


function demoArrayDiff2()
{
    $a1 = ['a' => 'red', 'b' => 'green', 'c' => 'blue', 'd' => 'yellow'];
    $a2 = ['e' => 'red', 'f' => 'black', 'g' => 'purple'];
    $a3 = ['a' => 'red', 'b' => 'black', 'h' => 'yellow'];

    $result = array_diff($a1, $a2, $a3);
    print_r($result);
}


function demoArrayDiffAssoc()
{

    $a1 = array("a" => "red", "b" => "green", "c" => "blue", "d" => "yellow");
    $a2 = array("a" => "red", "b" => "green", "g" => "blue");
    $result = array_diff_assoc($a1, $a2);
    print_r($result);
}


function demoArrayUdiff()
{
    $myfunction = function ($a, $b) {
        if ($a === $b) {
            return 0;
        }
        return ($a > $b) ? 1 : -1;
    };

    $a1 = array("a" => "red", "b" => "green", "c" => "blue");
    $a2 = array("a" => "blue", "b" => "black", "e" => "blue");
    $result = array_udiff($a1, $a2, $myfunction);
    print_r($result);
}


function demoArrayUdiffAssoc()
{
    $myfunction = function ($a, $b) {
        if ($a === $b) {
            return 0;
        }
        return ($a > $b) ? 1 : -1;
    };

    $a1 = array("a" => "red", "b" => "green", "c" => "blue");
    $a2 = array("a" => "red", "b" => "blue", "c" => "green");

    $result = array_udiff_assoc($a1, $a2, $myfunction);
    print_r($result);
}


// demoArrayDiff1();
// demoArrayDiff2();
// demoArrayDiffAssoc();
// demoArrayUdiff();
demoArrayUdiffAssoc();

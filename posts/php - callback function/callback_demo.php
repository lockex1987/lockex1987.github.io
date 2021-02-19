<?php

function sayHello($callback)
{
    echo 'Hello!' . PHP_EOL;
    $callback();
}


function sayGoodbye()
{
    echo 'Goodbye!' . PHP_EOL;
}


// sayHello('sayGoodbye');

sayHello(function () {
    echo 'Goodbye!' . PHP_EOL;
});


function sayHello2($firstName, $lastName, $callback)
{
    $fullName = $firstName . ' ' . $lastName;
    $callback($fullName);
}


function formatName($fullName)
{
    echo 'Hello ' . $fullName . PHP_EOL;
}


sayHello2('Nguyen Van', 'A', 'formatName');


function sayHello3($firstName, $lastName, $callback)
{
    $fullName = $firstName . ' ' . $lastName;
    if (is_callable($callback)) {
        call_user_func($callback, $fullName);
    }
}


sayHello3('Nguyen Van', 'A', 'formatName');

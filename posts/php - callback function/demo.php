<?php
function sayHello($callback)
{
    echo "Hello!\n";

    $callback();
}

function sayGoodbye()
{
    echo "Goodbye!\n";
}

sayHello('sayGoodbye');


function sayHello2($first_name, $last_name, $callback)
{
    $full_name = $first_name . ' ' . $last_name;

    $callback($full_name);
}

function formatName($full_name)
{
    echo 'Hello '. $full_name . "\n";
}

sayHello2('Nguyen Van', 'A', 'formatName');


function sayHello3($first_name, $last_name, $callback)
{
    $full_name = $first_name . ' ' . $last_name;

    if (is_callable($callback)) {
        call_user_func($callback, $full_name);
    }
}

sayHello3('Nguyen Van', 'A', 'formatName');
<?php

// Hàm thường
function helloWorld()
{
    return 'Hello world';
}


// Hàm ẩn danh
function () {
    return 'Hello world';
};


// Hàm ẩn danh gán cho 1 biến
$hello = function () {
    return 'Hello world';
};


// Gọi hàm bình thường
echo helloWorld() . PHP_EOL;

// Gọi hàm ẩn danh
echo $hello() . PHP_EOL;


// Pass Lambda to function
function shout($message)
{
    echo $message() . PHP_EOL;
}


// Call function
shout(function () {
    return 'Hello world';
});


// Create a user
$user = 'Thỏ 7 màu';

// Create a Closure
$helloUser = function () use ($user) {
    echo 'Hello ' . $user . PHP_EOL;
};

// Greet the user
$helloUser();


// Set counter
$i = 0;

// Increase counter within the scope of the function
$closure1 = function () use ($i) {
    $i++;
};

// Run the function
$closure1();

// The global count hasn't changed
echo $i . PHP_EOL; // returns 0

// Reset count
$i = 0;

// Increase counter within the scope of the function
// but pass it as a reference
$closure2 = function () use (&$i) {
    $i++;
};

// Run the function
$closure2();

// The global count has increased
echo $i . PHP_EOL; // returns 1


// An array of names
$users = [
    'Thỏ 7 màu',
    'Đậu đỏ',
    'Gấu AK',
    'Bé đội xô'
];

// Pass the array to array_walk
array_walk($users, function ($name) {
    echo 'Hello ' . $name . PHP_EOL;
});


// Set a multiplier
$multiplier = 3;

// Create a list of numbers
$numbers = [1, 2, 3, 4];

// Use array_walk to iterate through the list and multiply
array_walk($numbers, function ($number) use ($multiplier) {
    echo ($number * $multiplier) . PHP_EOL;
});

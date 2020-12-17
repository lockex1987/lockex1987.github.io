<?php

// Độ dài của xâu
echo strlen("Hello world!") . "\n"; // 12

// Số từ của xâu
echo str_word_count("Hello world!") . "\n"; // 2

// Đảo ngược xâu
echo strrev("Hello world!") . "\n"; // !dlrow olleH

// Tìm kiếm xâu
echo strpos("Hello world!", "world") . "\n"; // 6

// Thay thế xâu
echo str_replace("world", "Dolly", "Hello world!") . "\n"; // Hello Dolly!

echo number_format(1234567) . "\n"; // 1,234,567

$str = "Hello World";
echo str_pad($str, 20, ".") . "\n";
echo str_pad($str, 20, ".", STR_PAD_RIGHT) . "\n";
echo str_pad($str, 20, ".", STR_PAD_LEFT) . "\n";
echo str_pad($str, 20, ".:", STR_PAD_BOTH) . "\n";

echo str_repeat(".", 13) . "\n";

echo strtolower("Hello WORLD.") . "\n";
echo strtoupper("Hello WORLD!") . "\n";

$str = "   Hello World!   ";
echo "Without trim: <" . $str . ">\n";
echo "With trim: <" . trim($str) . ">\n";

$str = "Hello world. It's a beautiful day.";
print_r (explode(" ",$str));

$arr = array('Hello', 'World!', 'Beautiful', 'Day!');
echo implode(" ",$arr) . "\n";

echo number_format("1000000") . "\n";
echo number_format("1000000", 2) . "\n";
echo number_format("1000000", 2, ",", ".") . "\n";


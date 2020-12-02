<?php
$cars = ['Volvo', 'BMW', 'Toyota'];

// sort($cars);
rsort($cars);

foreach ($cars as $c) {
	echo $c;
    echo PHP_EOL;
}

$numbers = [4, 6, 2, 22, 11];
sort($numbers);
// rsort($numbers);

foreach ($numbers as $n) {
	echo $n;
    echo PHP_EOL;
}

$age = [
	'Peter' => '35',
	'Ben' => '37',
	'Joe' => '43'
];

// asort($age);
// arsort($age);
// ksort($age);
krsort($age);

foreach ($age as $x => $value) {
    echo 'Key = ' . $x . ', value = ' . $value;
    echo PHP_EOL;
}


$records = array(
	['firstname' => 'Mary', 'lastname' => 'Johnson', 'age' => 25],
	['firstname' => 'Amanda', 'lastname' => 'Miller', 'age' => 18],
	['firstname' => 'James', 'lastname' => 'Brown', 'age' => 31],
	['firstname' => 'Patricia', 'lastname' => 'Williams', 'age' => 7],
	['firstname' => 'Michael', 'lastname' => 'Davis', 'age' => 43],
	['firstname' => 'Sarah', 'lastname' => 'Miller', 'age' => 24],
	['firstname' => 'Patrick', 'lastname' => 'Miller', 'age' => 27]
);

// Sắp xếp theo tên tăng dần, tuổi giảm dần
usort($records, function ($a, $b) {
	$compareFirstname = $a['firstname'] <=> $b['firstname']; // asc
	if ($compareFirstname != 0) {
		return $compareFirstname;
	}
	$compareAge = $b['age'] <=> $a['age']; // desc
	return $compareAge;
});

foreach ($records as $e) {
    echo $e['firstname'] . ', ' . $e['age'] . PHP_EOL;
}


$arr = ['Hello', 'World!', 'Beautiful', 'Day!'];
echo implode(' ', $arr) . PHP_EOL;
echo implode('+', $arr) . PHP_EOL;
echo implode('-', $arr) . PHP_EOL; 
echo implode('X', $arr);

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


$array1 = $array2 = ['img12.png', 'img10.png', 'img2.png', 'img1.png'];

asort($array1);
echo 'Standard sorting' . PHP_EOL;
print_r($array1);

natsort($array2);
echo 'Natural order sorting' . PHP_EOL;
print_r($array2);

$array1 = $array2 = ['IMG0.png', 'img12.png', 'img10.png', 'img2.png', 'img1.png', 'IMG3.png'];

sort($array1);
echo 'Standard sorting' . PHP_EOL;
print_r($array1);

natcasesort($array2);
echo 'Natural order sorting (case-insensitive)' . PHP_EOL;
print_r($array2);

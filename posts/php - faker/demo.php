<?php
require_once 'vendor/autoload.php';

$faker = Faker\Factory::create();

echo $faker->name . "\n";
echo $faker->address . "\n";
echo $faker->text . "\n";

for ($i = 0; $i < 10; $i++) {
    echo $faker->name, "\n";
}


// Sử dụng unique() để tạo ra các giá trị duy nhất, tránh bị trùng
$values = [];
for ($i = 0; $i < 10; $i++) {
    $values []= $faker->unique()->randomDigit;
}
print_r($values);


// Sử dụng tiếng Việt
// Danh sách localization:
//     https://github.com/fzaninotto/Faker/tree/master/src/Faker/Provider
$faker = Faker\Factory::create('vi_VN');
for ($i = 0; $i < 10; $i++) {
    echo $faker->name, "\n";
}

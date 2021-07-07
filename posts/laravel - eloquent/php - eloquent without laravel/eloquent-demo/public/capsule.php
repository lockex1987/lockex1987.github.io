<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;
use App\Models\User;

// Dùng capsule dễ hơn
// Dùng Laravel eloquent, đỡ phải dùng PHP MySQL thuần (khó dùng)
$capsule = new Capsule();
$capsule->addConnection([
   "driver" => "mysql",
   // "host" =>"127.0.0.1",
   "host" =>"192.168.1.48",
   "database" => "sso",
   "username" => "root",
   "password" => "abc123a@"
]);

// Make this Capsule instance available globally
// $capsule->setAsGlobal();

// Setup the Eloquent ORM
$capsule->bootEloquent();

$users = User::all();
foreach ($users as $user) {
    echo $user->username . PHP_EOL; // . '<br />'
}

<?php

/*
$ver = SQLite3::version();

echo $ver['versionString'] . "\n";
echo $ver['versionNumber'] . "\n";

var_dump($ver);
*/

/*
$db = new SQLite3('test.db');

$version = $db->querySingle('SELECT SQLITE_VERSION()');

echo $version . "\n";
*/

/*
$db = new SQLite3('test.db');

$db->exec("CREATE TABLE cars(id INTEGER PRIMARY KEY, name TEXT, price INT)");
$db->exec("INSERT INTO cars(name, price) VALUES('Audi', 52642)");
$db->exec("INSERT INTO cars(name, price) VALUES('Mercedes', 57127)");
$db->exec("INSERT INTO cars(name, price) VALUES('Skoda', 9000)");
$db->exec("INSERT INTO cars(name, price) VALUES('Volvo', 29000)");
$db->exec("INSERT INTO cars(name, price) VALUES('Bentley', 350000)");
$db->exec("INSERT INTO cars(name, price) VALUES('Citroen', 21000)");
$db->exec("INSERT INTO cars(name, price) VALUES('Hummer', 41400)");
$db->exec("INSERT INTO cars(name, price) VALUES('Volkswagen', 21600)");
*/

/*
$db = new SQLite3(':memory:');

$db->exec("CREATE TABLE friends(id INTEGER PRIMARY KEY, name TEXT)");
$db->exec("INSERT INTO friends(name) VALUES ('Tom')");
$db->exec("INSERT INTO friends(name) VALUES ('Rebecca')");
$db->exec("INSERT INTO friends(name) VALUES ('Jim')");
$db->exec("INSERT INTO friends(name) VALUES ('Robert')");

$last_row_id = $db->lastInsertRowID();

echo "The last inserted row Id is $last_row_id";
*/


/*
$db = new SQLite3('test.db');

$res = $db->query('SELECT * FROM cars');

while ($row = $res->fetchArray()) {
    echo "{$row['id']} {$row['name']} {$row['price']} \n";
}
*/

/*
$db = new SQLite3('test.db');

$sql = "SELECT name FROM cars WHERE name = 'Audi'";

$escaped = SQLite3::escapeString($sql);

var_dump($sql);
var_dump($escaped);
*/

/*
$db = new SQLite3('test.db');

$stm = $db->prepare('SELECT * FROM cars WHERE id = ?');
$stm->bindValue(1, 3, SQLITE3_INTEGER);

$res = $stm->execute();

$row = $res->fetchArray(SQLITE3_NUM);
echo "{$row[0]} {$row[1]} {$row[2]}";
*/

/*
$db = new SQLite3('test.db');

$stm = $db->prepare('SELECT * FROM cars WHERE id = :id');
$stm->bindValue(':id', 1, SQLITE3_INTEGER);

$res = $stm->execute();

$row = $res->fetchArray(SQLITE3_NUM);
echo "{$row[0]} {$row[1]} {$row[2]}";
*/

/*
$db = new SQLite3(':memory:');

$db->exec("CREATE TABLE friends(id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT)");

$stm = $db->prepare("INSERT INTO friends(firstname, lastname) VALUES (?, ?)");
$stm->bindParam(1, $firstName);
$stm->bindParam(2, $lastName);

$firstName = 'Peter';
$lastName = 'Novak';
$stm->execute();

$firstName = 'Lucy';
$lastName = 'Brown';
$stm->execute();

$res = $db->query('SELECT * FROM friends');

while ($row = $res->fetchArray()) {
    echo "{$row[0]} {$row[1]} {$row[2]}\n";
}
*/

/*
$db = new SQLite3('test.db');

$res = $db->query("SELECT * FROM cars WHERE id = 1");
$cols = $res->numColumns();

echo "There are {$cols} columns in the result set\n";
*/

/*
$db = new SQLite3(':memory:');

$db->exec("CREATE TABLE friends(id INTEGER PRIMARY KEY, name TEXT)");
$db->exec("INSERT INTO friends(name) VALUES ('Tom')");
$db->exec("INSERT INTO friends(name) VALUES ('Rebecca')");
$db->exec("INSERT INTO friends(name) VALUES ('Jim')");
$db->exec("INSERT INTO friends(name) VALUES ('Robert')");

$db->exec('DELETE FROM friends');

$changes = $db->changes();

echo "The DELETE statement removed $changes rows";
*/

/*
$pdo = new PDO('sqlite:test.db');

$stm = $pdo->query("SELECT * FROM cars");
$rows = $stm->fetchAll(PDO::FETCH_NUM);

foreach($rows as $row) {
    printf("$row[0] $row[1] $row[2]\n");
}
*/

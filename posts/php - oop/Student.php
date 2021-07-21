<?php

class Student
{
    private $data = [
        'first_name' => 'Mahshad',
        'last_name' => 'Kalantari',
        'name' => 'Mahshad Kalantari',
        'age' => 25
    ];

    public function __construct($name)
    {
        echo 'Initialization...' . PHP_EOL;
        $this->name = $name;
    }

    public function __destruct()
    {
        echo 'Destroy...' . PHP_EOL;
    }
    
    public function sayHello()
    {
        return 'Hello, ' . $this->name;
    }

    public function __call($name, $arguments)
    {
        echo $name . ' => ' . implode(', ', $arguments) . PHP_EOL;
    }

    public function __get($name)
    {
        return $this->data[$name];
    }

    public function __set($name, $value)
    {
        $this->data[$name] = $value;
    }

    public function __isset($name)
    {
        return isset($this->data[$name]);
    }
    
    public function __unset($name)
    {
        unset($this->data[$name]);
    }

    public function __tostring()
    {
        return $this->first_name . ' - ' . $this->last_name;
    }

    public static function __callStatic($name, $arguments)
    {
        echo $name . ' => ' . implode(', ', $arguments) . PHP_EOL;
    }
}

$student = new Student('Mahshad');
echo $student->sayHello() . PHP_EOL;
echo $student->hello('Mahshad', 'Sara', 'Pit');
echo Student::hello('Mahshad', 'Sara', 'Pit');
echo $student->first_name . PHP_EOL;
echo $student->last_name . PHP_EOL;
$student->occupation = 'Programmer';
echo $student->occupation . PHP_EOL;
echo var_dump(isset($student->name));
unset($student->name);
echo var_dump(isset($student->name));
echo $student . PHP_EOL;

<?php

class phpClass
{
	var $var1;
	var $var2 = "một giá trị hằng số";
	
	function myfunc ($arg1, $arg2)
	{
		//
	}
}


class Books
{
	/* các biến thành viên */
	var $price;
	var $title;

	function __construct($par1, $par2)
	{
		$this->price = $par1;
		$this->title = $par2;
	}

	/* các hàm thành viên */
	function setPrice($par)
	{
		$this->price = $par;
	}
	
	function getPrice()
	{
		echo $this->price . "\n";
	}
	
	function setTitle($par)
	{
		$this->title = $par;
	}
	
	function getTitle()
	{
		echo $this->title . "\n";
	}
}

/*
$tiengAnh = new Books();
$toanCaoCap = new Books();
$tuTuongHCM = new Books();

$tiengAnh->setTitle("English Grammar in Use");
$tuTuongHCM->setTitle("Toán cao cấp 1");
$toanCaoCap->setTitle("Tư tưởng Hồ Chí Minh");

$tiengAnh->setPrice(10);
$tuTuongHCM->setPrice(15);
$toanCaoCap->setPrice(7);
*/

$tiengAnh = new Books("English Grammar in Use", 10);
$toanCaoCap = new Books("Toán cao cấp 1", 15);
$tuTuongHCM = new Books("Tư tưởng Hồ Chí Minh", 7);

$tiengAnh->getTitle();
$tuTuongHCM->getTitle();
$toanCaoCap->getTitle();
$tiengAnh->getPrice();
$tuTuongHCM->getPrice();
$toanCaoCap->getPrice();


class Novel extends Books
{
	private $publisher;
	
	function setPublisher($par)
	{
		$this->publisher = $par;
	}
	
	function getPublisher()
	{
		echo $this->publisher . "\n";
	}
	
	function getPrice()
	{
		echo $this->price . "\n";
		return $this->price;
	}
	
	function getTitle()
	{
		echo $this->title . "\n";
		return $this->title;
	}
}


interface Mail
{
	public function sendMail();
}


class Report implements Mail
{
	// lớp này cần định nghĩa hàm sendMail()
	public function sendMail()
	{
		// ...
	}
}


class MyClass
{
	// Ghi nhớ rằng, tên hằng không bắt đầu với $, như trong tên biến
	// Từ khóa const
	const requiredMargin = 1.7;
	
	function __construct($incomingValue)
	{
		// các lệnh ở đây được thực thi mỗi khi
		// một instance của class
		// được tạo
	}
}


abstract class MyAbstractClass
{
	abstract function myAbstractFunction();
	
	public function anotherFunction()
	{
		// ...
	}
}


class Foo
{
	public static $my_static = 'foo';
	
	public function staticValue()
	{
		return self::$my_static;
	}
}

print Foo::$my_static . "\n";
$foo = new Foo();
print $foo->staticValue() . "\n";

/*
class Name
{
	var $_firstName;
	var $_lastName;
	
	function Name($first_name, $last_name)
	{
		$this->_firstName = $first_name;
		$this->_lastName = $last_name;
	}
	
	function toString()
	{
		return($this->_lastName . ", " . $this->_firstName);
	}
}

class NameSub1 extends Name
{
	var $_middleInitial;
	
	function NameSub1($first_name, $middle_initial, $last_name)
	{
		Name::Name($first_name, $last_name);
		$this->_middleInitial = $middle_initial;
	}
	
	function toString()
	{
		return (Name::toString() . " " . $this->_middleInitial);
	}
}
*/

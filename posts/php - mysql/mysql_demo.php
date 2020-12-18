<?php

// MySQLi Object-Oriented
class MySqlDemo
{	
	// Đối tượng kết nối
	private $conn;
	
	/**
	 * Mở kết nối.
	 */
	public function openConnection($servername, $username, $password, $dbname)
	{
		$this->conn = new mysqli($servername, $username, $password, $dbname);
		if ($this->conn->connect_error) {
			die('Connection failed: ' . $this->conn->connect_error);
		}
		echo 'Connected successfully' . PHP_EOL;
	}

	/**
	 * Đóng kết nối.
	 */
	public function closeConnection()
	{
		$this->conn->close();
	}
	
	/**
	 * Kiểm tra việc INSERT dữ liệu.
	 */
	public function testInsert()
	{
		// Thêm dữ liệu
		$sql = " insert into my_guest (firstname, lastname, email) values ('John', 'Doe', 'john@example.com') ";

		if ($this->conn->query($sql) === true) {
			echo 'New record created successfully' . PHP_EOL;

			// Lấy ID bản ghi được thêm
			$lastId = $this->conn->insert_id;
			echo 'Last inserted ID is: ' . $lastId . PHP_EOL;
		} else {
			echo 'Error: ' . $sql . ', ' . $conn->error . PHP_EOL;
		}
		
		// Prepared statement
		// Prepare and bind
		$stmt = $this->conn->prepare(' insert into my_guest (firstname, lastname, email) values (?, ?, ?) ');
		$stmt->bind_param('sss', $firstname, $lastname, $email);

		// Set parameters and execute
		$firstname = 'Mary';
		$lastname = 'Moe';
		$email = 'mary@example.com';
		$stmt->execute();

		$firstname = 'Julie';
		$lastname = 'Dooley';
		$email = 'julie@example.com';
		$stmt->execute();

		echo 'New records created successfully' . PHP_EOL;

		$stmt->close();
	}
	
	/**
	 * Kiểm tra việc cập nhật dữ liệu.
	 */
	public function testUpdate()
	{
		$sql = " UPDATE my_guest SET firstname = 'Huyen' WHERE firstname = 'John' ";
		if ($this->conn->query($sql) === true) {
			echo 'Record updated successfully' . PHP_EOL;
		} else {
			echo 'Error updating record: ' . $this->conn->error . PHP_EOL;
		}
	}
	
	/**
	 * Kiểm tra việc SELECT dữ liệu.
	 */
	public function testSelect()
	{
		$sql = ' SELECT id, firstname, lastname FROM my_guest ';
		$stmt = $this->conn->prepare($sql);
		$stmt->execute();
		$result = $stmt->get_result();
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				echo 'ID: ' . $row['id']. ' - Name: ' . $row['firstname']. ' ' . $row['lastname'] . PHP_EOL;
			}
		} else {
			echo 'No result' . PHP_EOL;
		}
		$stmt->close();
	}
	
	/**
	 * Kiểm tra việc xóa dữ liệu.
	 */
	public function testDelete()
	{
		$sql = " DELETE FROM my_guest WHERE firstname = 'Mary' ";
		if ($this->conn->query($sql) === true) {
			echo 'Record deleted successfully' . PHP_EOL;
		} else {
			echo 'Error deleting record: ' . $this->conn->error . PHP_EOL;
		}
	}
}

function demo()
{
	// Thông tin kết nối MySQL
	$servername = 'localhost';
	$username = 'root';
	$password = 'abc123a@';
	$dbname = 'test';

	// Kiểm tra
	$demo = new MySqlDemo();
	$demo->openConnection($servername, $username, $password, $dbname);

	// $demo->testInsert();
	// $demo->testUpdate();
	// $demo->testDelete();
	
	$demo->testSelect();

	$demo->closeConnection();
}

demo();

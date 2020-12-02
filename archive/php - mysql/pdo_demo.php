<?php

class PdoDemo
{
    // Đối tượng kết nối
    private $conn;
    
    /**
     * Mở kết nối.
     */
    public function openConnection($servername, $username, $password, $dbname, $port)
    {
        try {
            $this->conn = new PDO("mysql:host=$servername;port=$port;dbname=$dbname", $username, $password);
			$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false); // nếu để true thì khi đẩy dữ liệu số double vào db sẽ bị làm tròn?
			
			// PDO::ATTR_CASE => PDO::CASE_LOWER,
            // PDO::ATTR_ORACLE_NULLS => PDO::NULL_NATURAL
            // PDO::ATTR_STRINGIFY_FETCHES => true

            echo 'Connected successfully' . PHP_EOL;
        } catch (PDOException $ex) {
            echo 'Connection failed: ' . $ex->getMessage() . PHP_EOL;
        }
    }

    /**
     * Đóng kết nối.
     */
    public function closeConnection()
    {
        $this->conn = null;
    }
    
    /**
     * Kiểm tra việc INSERT dữ liệu.
     */
    public function testInsert()
    {
        // Thêm dữ liệu
        $sql = " insert into my_guest (firstname, lastname, email) values ('John', 'Doe', 'john@example.com') ";

        try {
            $this->conn->exec($sql);
            $lastId = $this->conn->lastInsertId();
            echo 'New record created successfully' . PHP_EOL;
            echo 'Last inserted ID is: ' . $lastId . PHP_EOL;
        } catch (PDOException $ex) {
            echo 'Error: ' . $ex->getMessage() . PHP_EOL;
        }
        
        // Prepared statement
        // Prepare and bind
        $stmt = $this->conn->prepare(' insert into my_guest (firstname, lastname, email) values (:firstname, :lastname, :email) ');
        $stmt->bindParam(':firstname', $firstname);
        $stmt->bindParam(':lastname', $lastname);
        $stmt->bindParam(':email', $email);

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
    }
    
    /**
     * Kiểm tra việc cập nhật dữ liệu.
     */
    public function testUpdate()
    {
        try {
            $sql = " UPDATE my_guest SET firstname = 'Huyen' WHERE firstname = 'John' ";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            echo $stmt->rowCount() . ' records UPDATED successfully' . PHP_EOL;
        } catch (PDOException $ex) {
            echo 'Error updating record: ' . $ex->getMessage() . PHP_EOL;
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
        // $stmt->setFetchMode(PDO::FETCH_ASSOC)
        $result = $stmt->fetchAll();
        echo count($result) . PHP_EOL;
        foreach ($result as $row) {
            echo 'ID: ' . $row['id']. ' - Name: ' . $row['firstname']. ' ' . $row['lastname'] . PHP_EOL;
        }
        // Không cần gọi $stmt->close()
    }
    
    /**
     * Kiểm tra việc xóa dữ liệu.
     */
    public function testDelete()
    {
        try {
            $sql = " DELETE FROM my_guest WHERE firstname = 'Mary' ";
            $this->conn->exec($sql);
            echo 'Record deleted successfully' . PHP_EOL;
        } catch (PDOException $ex) {
            echo 'Error deleting record: ' . $ex->getMessage() . PHP_EOL;
        }
    }
    
    public function testNumberRound()
    {
        $executionStartTime = microtime(true);
        sleep(1);
        $executionEndTime = microtime(true);
        $duration = $executionEndTime - $executionStartTime;
        echo $executionStartTime . PHP_EOL;
        echo $executionEndTime . PHP_EOL;
		echo $duration . PHP_EOL;
		
		$sql = ' insert into execution_time(
				code,
				duration,
				start_time,
				end_time
			)
			values (
				?,
				?,
				?,
				?
			) ';
		$stmt = $this->conn->prepare($sql);
		$data = [
			'xxx',
			$duration,
			$executionStartTime,
			$executionEndTime
		];
        $stmt->execute($data);
    }
}

function demo()
{
    // Thông tin kết nối MySQL
	$servername = '127.0.0.1';
	
	/*
    $username = 'root';
    $password = 'abc123a@';
	$dbname = 'test';
	$port = 3306;
	*/

	$username = 'web_user';
    $password = 'KHttcd#2020';
	$dbname = 'TTCD_LAB';
	$port = 33066;

    // Kiểm tra
    $demo = new PdoDemo();
    $demo->openConnection($servername, $username, $password, $dbname, $port);

    // $demo->testInsert();
    // $demo->testUpdate();
    // $demo->testDelete();
    
	// $demo->testSelect();
	
	// $demo->testNumberRound();

    $demo->closeConnection();
}

demo();

<?php
class WriteToFile
{
    private $_fp = NULL;

    function __construct($file) {
        // Kiểm tra xem file có tồn tại và có phải là file không?
        if (!file_exists($file) || !is_file($file)) {
            throw new Exception('The file does not exist.');
        }

        // Mở file
        if (!$this->_fp = @fopen($file, 'w')) {
            throw new Exception('Could not open the file.');
        }
    }

    function write($data)
    {
        if (@!fwrite($this->_fp, $data . "\n")) {
            throw new Exception('Could not write to the file.');
        }
    }

    function close()
    {
        if ($this->_fp) {
            fclose($this->_fp);
            $this->_fp = NULL;
        }
    }

    function __destruct()
    {
        $this->close();
    }
}

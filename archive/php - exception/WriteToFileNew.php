<?php
class WriteToFileNew
{
    private $_fp = NULL;

    private $_message = '';

    function __construct($file = null, $mode = 'w')
    {
        // Gán tên file và mode vào thuộc tính message
        $this->_message = "File: $file Mode: $mode";

        // Kiểm tra tên file có rỗng không
        if (empty($file))
            throw new FileException($this->_message, 0);

        // Kiểm tra xem file có tồn tại hay không
        if (!file_exists($file))
            throw new FileException($this->_message, 1);

        // Kiểm tra xem có phải là một file hay không
        if (!is_file($file))
            throw new FileException($this->_message, 2);

        // Kiểm tra xem file có ghi dữ liệu vào được không         
        if (!is_writable($file))
            throw new FileException($this->_message, 3);

        // Kiểm tra các mode mở file
        if (!in_array($mode, array('a', 'a+', 'w', 'w+')))
            throw new FileException($this->_message, 4);

        // Mở file
        $this->_fp = fopen($file, $mode);
    }

    function write($data)
    {
        if (@!fwrite($this->_fp, $data . "\n"))
            throw new FileException($this->_message . " Data: $data", 5);
    } 

    function close()
    {
        if ($this->_fp) {
            if (@!fclose($this->_fp))
                throw new FileException($this->_message, 6);
            $this->_fp = NULL;
        }
    }

    function __destruct()
    {
        $this->close();
    }
}

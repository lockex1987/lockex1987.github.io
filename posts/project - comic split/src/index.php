<?php

include_once('ImageSpliter.php');


class Main
{
    public function __construct()
    {
        $this->main();
    }

    /**
     * Xử lý một file (dùng để test).
     */
    function processSingleFile(string $inputPath): void
    {
        new ImageSpliter($inputPath);
    }


    /**
     * Xử lý cả folder nhiều ảnh.
     */
    function processFolder(): void
    {
        $folder = 'data-files';
        $files = scandir($folder);
        foreach ($files as $f) {
            if (!in_array($f, ['.', '..'])) {
                $inputPath = $folder . DIRECTORY_SEPARATOR . $f;
                if (is_file($inputPath)) {
                    echo $inputPath . PHP_EOL;
                    $this->processSingleFile($inputPath);
                }
            }
        }
    }


    /**
     * Kiểm tra các phụ thuộc.
     * Chương trình phụ thuộc extension gd của PHP.
     * Cần đảm bảo extension này được enable ở file php.ini.
     */
    function checkDependencies()
    {
        if (!extension_loaded('gd')) {
            return false;
        }
        return true;
    }


    /**
     * Hàm chính.
     */
    function main(): void
    {
        if (!$this->checkDependencies()) {
            echo 'Bạn cần enable extension gd' . PHP_EOL;
            return;
        }

        $this->processSingleFile('../images/origin.jpg');
        // $this->processFolder();
    }
}


new Main();

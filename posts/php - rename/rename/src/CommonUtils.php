<?php

class CommonUtils
{
    /**
     * Liệt kê các file và thư mục con trong thư mục.
     */
    public static function listFilesInDirectory($directoryPath)
    {
        $files = array_diff(scandir($directoryPath), ['.', '..']);
        return $files;
    }


    /**
     * Nối đường dẫn.
     */
    public static function joinPath($base, $path)
    {
        $temp = rtrim($base, '/') . '/' . ltrim($path, '/');
        return str_replace('\\', '/', $temp);
    }

    /**
     * Nén thư mục.
     */
    public static function compressFolder($folder, $archive)
    {
        $rootPath = realpath($folder);
        $zip = new ZipArchive();
        $zip->open($archive, ZipArchive::CREATE | ZipArchive::OVERWRITE);
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($rootPath),
            RecursiveIteratorIterator::LEAVES_ONLY
        );
        foreach ($files as $name => $file) {
            // Bỏ qua . và ..
            if (!$file->isDir()) {
                // echo $file . PHP_EOL;
                $filePath = $file->getRealPath();
                $relativePath = substr($filePath, strlen($rootPath) + 1);
                echo $relativePath . PHP_EOL;
                $zip->addFile($filePath, $relativePath);
            }
        }
        /*
        $zip->registerProgressCallback(0.05, function ($r) {
            printf("%d%%\n", $r * 100);
        });
        */
        $zip->close();
    }
}

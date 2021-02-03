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
}

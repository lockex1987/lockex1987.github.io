<?php

class CommonUtils
{
    /**
     * Liệt kê các file và thư mục con trong thư mục.
     * @param {string} $directoryPath Đường dẫn thư mục
     * @return {array} Danh sách file và folder con trong thư mục
     */
    public static function listFilesInDirectory(string $directoryPath): array
    {
        $files = array_diff(scandir($directoryPath), ['.', '..']);
        return $files;
    }


    /**
     * Nối đường dẫn.
     * @param {string} $base Đường dẫn gốc
     * @param {string} $path Đường dẫn tương đối
     * @return {string} Đường dẫn được chuẩn hóa
     */
    public static function joinPath(string $base, string $path): string
    {
        $temp = rtrim($base, '/') . '/' . ltrim($path, '/');
        return str_replace('\\', '/', $temp);
    }
}

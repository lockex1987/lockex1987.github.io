<?php

namespace Cttd\FileManager;


class CommonUtils
{
    /**
     * Trả về JSON cho người dùng.
     * @param $data Nội dung trả về (thường là mảng liên kết)
     * @return void
     */
    public static function responseJson($data): void
    {
        header('Content-type: application/json');
        echo json_encode($data);
    }


    /**
     * Trả về các tham số từ trong request mà được truyền dưới dạng JSON.
     * @return object Đối tượng
     */
    public static function getJsonParams(): object
    {
        return json_decode(file_get_contents('php://input'));
    }


    /**
     * Kiểm tra một file có phải định dạng text hay không.
     * @param string $filePath Đường dẫn tới file
     * @return bool true nếu định dạng text
     */
    public static function isTextFile(string $filePath): bool
    {
        $mime = mime_content_type($filePath);
        if (!$mime) {
            return false;
        }
        return str_starts_with($mime, 'text/');
    }
}

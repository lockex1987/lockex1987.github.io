<?php
class FileException extends Exception
{
    function getDetails() {
        // Trả về các message khác nhau dựa trên mã lỗi
        switch ($this->code) {
            case 0:
                return 'Tên file không được rỗng.';
                break;
            case 1:
                return 'File không tồn tại.';
                break;
            case 2:
                return 'Không phải dạng file.';
                break;
            case 3:
                return 'File không thể ghi dữ liệu.';
                break;
            case 4:
                return 'Mode ghi file không đúng.';
                break;
            case 5:
                return 'Dữ liệu không thể ghi vào file.';
                break;
            case 6:
                return 'File không thể đóng.';
                break;
            default:
                return 'Lỗi không xác định.';
                break;
        }
    }
}

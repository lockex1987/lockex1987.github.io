<?php

// Khởi tạo 2 mảng
$orginal = [
    'An',
    'Doanh nghiệp',
    'điện than',
    'Da',
    'Z',
    '4',
    '6',
    '2',
    '22',
    '11',
    'Ân',
    'Ăn',
    'Ư',
    'U',
    'O',
    'Ơ',
    'Ô',
    'Đ',
    'A',
    'Ă',
    'Đăk Lăk',
    'Vĩnh Long',
    'An Giang',
    'Hà Nội'
];

// Khi gán mảng, PHP sẽ tự động tạo ánh xạ khác
$normal = $orginal;
$locale = $orginal;

// Sắp xếp bình thường
sort($normal);

// Lấy cấu hình locale cũ
$oldLocale = setlocale(LC_COLLATE, '0');

// Thiết lập LC_COLLATE thôi, không thiết lập LC_ALL
// setlocale(LC_COLLATE, 'vi_VN', 'vi');
// setlocale(LC_COLLATE, 'vi');
// setlocale(LC_COLLATE, 'vi_VN.UTF-8');
// setlocale(LC_COLLATE, 'vi_VN.utf8', 'vi_VN', 'vi');
setlocale(LC_COLLATE, 'vi_VN.UTF-8', 'vi.UTF-8', 'vi_VN', 'vi');

// Sắp xếp có sử dụng locale
sort($locale, SORT_LOCALE_STRING);

// usort($locale, 'strcmp');
// usort($locale, 'strnatcasecmp');
// usort($locale, 'strcasecmp');
// usort($locale, 'mb_strcasecmp');
// usort($locale, 'strcoll');

/*
echo strcoll('Đ', 'A') . PHP_EOL;
echo strcoll('Đăk Lăk', 'An Giang') . PHP_EOL;
echo strcoll('Đ', 'Ă') . PHP_EOL;
*/

// print_r($locale);

// Chuyển về cấu hình locale cũ
setlocale(LC_COLLATE, $oldLocale);

// Trả về cho người dùng
header('Content-Type: application/json; charset=UTF-8');

$data = [
    'normal' => $normal,
    'locale' => $locale
];

echo json_encode($data);

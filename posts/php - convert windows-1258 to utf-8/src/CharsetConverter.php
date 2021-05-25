<?php

namespace Cttd\Common\Utils;

/**
 * Convert from CP1258 charset to UTF8 charset.
 */
class CharsetConverter
{
    public const MARK = [
        '̀', '́', '̃', '̉', '̣', 'x'
    ];

    public const VOWEL = [
        // Chữ thường
        'a', 'ă', 'â', 'e', 'ê', 'i',
        'o', 'ô', 'ơ', 'u', 'ư', 'y',
        // Chữ hoa
        'A', 'Ă', 'Â', 'E', 'Ê', 'I',
        'O', 'Ô', 'Ơ', 'U', 'Ư', 'Y'
    ];

    private const WINDOWS1258_TO_UTF8 = [
        // Chữ thường
        'à', 'á', 'ã', 'ả', 'ạ',
        'ằ', 'ắ', 'ẵ', 'ẳ', 'ặ',
        'ầ', 'ấ', 'ẫ', 'ẩ', 'ậ',
        'è', 'é', 'ẽ', 'ẻ', 'ẹ',
        'ề', 'ế', 'ễ', 'ể', 'ệ',
        'ì', 'í', 'ĩ', 'ỉ', 'ị',
        'ò', 'ó', 'õ', 'ỏ', 'ọ',
        'ồ', 'ố', 'ỗ', 'ổ', 'ộ',
        'ờ', 'ớ', 'ỡ', 'ở', 'ợ',
        'ù', 'ú', 'ũ', 'ủ', 'ụ',
        'ừ', 'ứ', 'ữ', 'ử', 'ự',
        'ỳ', 'ý', 'ỹ', 'ỷ', 'ỵ',
        // Chữ hoa
        'À', 'Á', 'Ã', 'Ả', 'Ạ',
        'Ằ', 'Ắ', 'Ẵ', 'Ẳ', 'Ặ',
        'Ầ', 'Ấ', 'Ẫ', 'Ẩ', 'Ậ',
        'È', 'É', 'Ẽ', 'Ẻ', 'Ẹ',
        'Ề', 'Ế', 'Ễ', 'Ể', 'Ệ',
        'Ì', 'Í', 'Ĩ', 'Ỉ', 'Ị',
        'Ò', 'Ó', 'Õ', 'Ỏ', 'Ọ',
        'Ồ', 'Ố', 'Ỗ', 'Ổ', 'Ộ',
        'Ờ', 'Ớ', 'Ỡ', 'Ở', 'Ợ',
        'Ù', 'Ú', 'Ũ', 'Ủ', 'Ụ',
        'Ừ', 'Ứ', 'Ữ', 'Ử', 'Ự',
        'Ỳ', 'Ý', 'Ỹ', 'Ỷ', 'Ỵ'
    ];

    public static function splitToChars(string $input): array
    {
        // Tách thành các ký tự Unicode
        // Không dùng được hàm str_split vì sẽ tách thành từng byte
        $chars = preg_split('//u', $input, -1, PREG_SPLIT_NO_EMPTY);
        return $chars;
    }

    /**
     * TODO: Đang bị lỗi tiếng Việt trên con TTCD.
     */
    public static function convertWindows1258ToUtf8(string $input): string
    {
        $chars = self::splitToChars($input);

        if (count(array_intersect($chars, self::MARK)) == 0) {
            // echo 'Không có ký tự Windows 1258' . PHP_EOL;
            return $input;
        }

        // Có ký tự Windows 1258
        $ret = '';
        $size = count($chars);
        for ($i = 0; $i < $size; $i++) {
            $currentChar = $chars[$i];
            if ($i + 1 >= $size) {
                $ret .= $currentChar;
            } else {
                $nextChar = $chars[$i + 1];
                $markIndex = array_search($nextChar, self::MARK);
                if ($markIndex !== false) {
                    $vowelIndex = array_search($currentChar, self::VOWEL);
                    $utf8Char = self::WINDOWS1258_TO_UTF8[$vowelIndex * (count(self::MARK) - 1) + $markIndex];
                    $ret .= $utf8Char;
                    $i++;
                } else {
                    $ret .= $currentChar;
                }
            }
        }
        return $ret;
    }
}

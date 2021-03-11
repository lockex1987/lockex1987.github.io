<?php

// Unicode dựng sẵn
$utf8Text = 'Nguyễn Văn Huyên - Cao Thị Thùy Dương - Nguyễn Anh Tuấn';

// Unicode tổ hợp
$windows1258Text = 'Nguyễn Văn Huyên - Cao Thị Thùy Dương - Nguyễn Anh Tuấn';

// Gõ lại bằng Unicode dựng sẵn
$otherUtf8Text = 'Nguyễn Văn Huyên - Cao Thị Thùy Dương - Nguyễn Anh Tuấn';

var_dump($utf8Text === $windows1258Text);
var_dump($utf8Text === $otherUtf8Text);

echo $utf8Text . PHP_EOL;
echo $windows1258Text . PHP_EOL;

echo strlen($utf8Text) . PHP_EOL;
echo strlen($windows1258Text) . PHP_EOL;

// PHP có các hàm mb_convert_encoding và iconv để convert giữa các encoding khác nhau
// Tuy nhiên, không hỗ trợ encoding windows-1258 :(
// Phải tự viết
var_dump($utf8Text === mb_convert_encoding($windows1258Text, 'utf-8', 'windows-1254'));
var_dump($utf8Text === iconv('UTF-8', 'WINDOWS-1258', $windows1258Text));
// var_dump(mb_list_encodings());


// 0 - win
// 1 - koi
function detect_encoding($str)
{
  $win = 0;
  $koi = 0;

  for ($i = 0; $i < strlen($str); $i++) {
    if (ord($str[$i]) > 224 && ord($str[$i]) < 255) $win++;
    if (ord($str[$i]) > 192 && ord($str[$i]) < 223) $koi++;
  }

  if ($win < $koi) {
    return 1;
  } else return 0;
}

// recodes koi to win
function koi_to_win($string)
{

  $kw = array(128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183,  184, 185, 186, 187, 188, 189, 190, 191, 254, 224, 225, 246, 228, 229, 244, 227, 245, 232, 233, 234, 235, 236, 237, 238, 239, 255, 240, 241, 242, 243, 230, 226, 252, 251, 231, 248, 253, 249, 247, 250, 222, 192, 193, 214, 196, 197, 212, 195, 213, 200, 201, 202, 203, 204, 205, 206, 207, 223, 208, 209, 210, 211, 198, 194, 220, 219, 199, 216, 221, 217, 215, 218);
  $wk = array(128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183,  184, 185, 186, 187, 188, 189, 190, 191, 225, 226, 247, 231, 228, 229, 246, 250, 233, 234, 235, 236, 237, 238, 239, 240, 242,  243, 244, 245, 230, 232, 227, 254, 251, 253, 255, 249, 248, 252, 224, 241, 193, 194, 215, 199, 196, 197, 214, 218, 201, 202, 203, 204, 205, 206, 207, 208, 210, 211, 212, 213, 198, 200, 195, 222, 219, 221, 223, 217, 216, 220, 192, 209);

  $end = strlen($string);
  $pos = 0;
  do {
    $c = ord($string[$pos]);
    if ($c > 128) {
      $string[$pos] = chr($kw[$c - 128]);
    }
  } while (++$pos < $end);

  return $string;
}

function recode($str)
{

  $enc = detect_encoding($str);
  if ($enc == 1) {
    $str = koi_to_win($str);
  }

  return $str;
}

<!DOCTYPE html>
<title>Date time demo</title>

<?php

// https://www.php.net/manual/en/function.strtotime.php
// strtotime trả về số giây
function strtotimeDemo(): void
{
    echo strtotime("now"), "<br />";
    echo strtotime("10 September 2000"), "<br />";
    echo strtotime("+1 day"), "<br />";
    echo strtotime("+1 week"), "<br />";
    echo strtotime("+1 week 2 days 4 hours 2 seconds"), "<br />";
    echo strtotime("next Thursday"), "<br />";
    echo strtotime("last Monday"), "<br />";
}

strtotimeDemo();


// https://www.php.net/manual/en/function.date.php
// Hàm date trả về xâu format
/*
$t1 = strtotime('2018-04-23');
$t2 = strtotime('+1 day');
$t3 = strtotime('+1 day', $t1);

$pattern = 'd/m/Y';

echo date($pattern, $t1), "<br />";
echo date($pattern, $t2), "<br />";
echo date($pattern, $t3), "<br />";
*/


// Lấy được số ngày trong tháng
// echo "Số ngày của tháng ", date('m'), " là ", date('t'), "<br />";


// http://php.net/manual/en/class.datetime.php
// Lớp DateTime
/*
$startDate = new DateTime('2018-04-24 00:00:00');
$endDate = new DateTime('2018-04-30 23:59:59');

$diff = $startDate->diff($endDate);

echo $startDate->format('d/m/Y H:i:s') . "<br />";
echo $diff->days . ' days<br />';
echo 'Diff is ' . $diff->y . ' years, ' . $diff->m . ' months, ' . $diff->d . ' days, ' . $diff->h . ' hours, ' . $diff->i . ' minutes, ' . $diff->s . ' seconds<br />';
*/


// Để cộng trừ thời gian với đối tượng DateTime thì chúng ta phải sử dụng đối tượng DateInterval
// http://php.net/manual/en/dateinterval.createfromdatestring.php
// Điền là 1 months cũng được (không sao dù sai tiếng Anh)

/*
$twoMonths = DateInterval::createFromDateString('2 months');
$date1 = new DateTime('2018-04-24 00:00:00');
$date1->add($twoMonths);
echo $date1->format('d/m/Y') . "<br />";

// Dùng hàm clone để không thay đổi các biến khác
$startPromotion = clone $date1;
$startPromotion->add(DateInterval::createFromDateString('0 months'));
$endPromotion = clone $startPromotion;
$endPromotion->add(DateInterval::createFromDateString('2 months'));

echo $date1->format('d/m/Y') . "<br />";
echo $startPromotion->format('d/m/Y') . "<br />";
echo $endPromotion->format('d/m/Y') . "<br />";
*/

/*
$n = 19519355;
echo number_format((float) $n, 0, '.', ',') . "<br />";
*/

<?php

namespace Tests\Cttd\TestDemo;

use PHPUnit\Framework\TestCase;
use Cttd\TestDemo\URL;


class URLTest extends TestCase
{
    public function testSluggifyReturnsSluggifiedString()
    {
        $originalString = 'Đây là chuỗi cần được xử lý dấu và gạch ngang';
        $expectedResult = 'day-la-chuoi-can-duoc-xu-ly-dau-va-gach-ngang';
        $url = new URL();
        $result = $url->sluggify($originalString);
        $this->assertEquals($expectedResult, $result);
    }

    public function testSluggifyReturnsExpectedForStringsContainingNumbers()
    {
        // Phương thức này kiểm thử với một chuỗi có chữ số
        $originalString = 'Unit testing phần2 PHPUnit có 100phương thức xác nhận';
        $expectedResult = 'unit-testing-phan2-phpunit-co-100phuong-thuc-xac-nhan';
        $url = new URL();
        $result = $url->sluggify($originalString);
        $this->assertEquals($expectedResult, $result);
    }

    public function testSluggifyReturnsExpectedForStringsContainingSpecialCharacters()
    {
        // Phương thức này kiểm thử với một chuỗi có ký tự đặc biệt
        $originalString = 'Unit testing - Phần 2: Assertion() và dataProvider';
        $expectedResult = 'unit-testing-phan-2-assertion-va-dataprovider';
        $url = new URL();
        $result = $url->sluggify($originalString);
        $this->assertEquals($expectedResult, $result);
    }

    public function testSluggifyReturnsExpectedForEmptyStrings()
    {
        // Kiểm thử với chuỗi đầu vào là rỗng
        $originalString = '';
        $expectedResult = '';
        $url = new URL();
        $result = $url->sluggify($originalString);
        $this->assertEquals($expectedResult, $result);
    }

    /**
     * @param string $originalString Chuỗi cần xử lý
     * @param string $expectedResult Kết quả mong đợi
     *
     * @dataProvider providerTestSluggifyReturnsSluggifiedString
     */
    public function testSluggifyReturnsSluggifiedString2($originalString, $expectedResult)
    {
        $url = new URL();
        $result = $url->sluggify($originalString);
        $this->assertEquals($expectedResult, $result);
    }

    public function providerTestSluggifyReturnsSluggifiedString()
    {
        return array(
            array('Đây là chuỗi cần được xử lý dấu và gạch ngang', 'day-la-chuoi-can-duoc-xu-ly-dau-va-gach-ngang'),
            array('ĐÂY LÀ CHUỖI CẦN XỬ LÝ DẤU VÀ GẠCH NGANG', 'day-la-chuoi-can-xu-ly-dau-va-gach-ngang'),
            array('Unit testing phần2 PHPUnit có 100phương thức xác nhận', 'unit-testing-phan2-phpunit-co-100phuong-thuc-xac-nhan'),
            array('Unit testing - "Phần 2": Assertion() và dataProvider!', 'unit-testing-phan-2-assertion-va-dataprovider'),
            array('', ''),
        );
    }
}

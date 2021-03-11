<?php

namespace Tests\Cttd\Common\Utils;

use Cttd\Common\Utils\CharsetConverter;
use PHPUnit\Framework\TestCase;


class CharsetConverterTest extends TestCase
{
	public function testSplitToChars(): void
	{
		// Unicode dựng sẵn
		$utf8Text = 'Nguyễn Văn Huyên - Cao Thị Thùy Dương - Nguyễn Anh Tuấn';

		// Unicode tổ hợp
		$windows1258Text = 'Nguyễn Văn Huyên - Cao Thị Thùy Dương - Nguyễn Anh Tuấn';

		$this->assertEquals(mb_strlen($utf8Text), count(CharsetConverter::splitToChars($utf8Text)));
		$this->assertEquals(mb_strlen($windows1258Text), count(CharsetConverter::splitToChars($windows1258Text)));
	}

	public function testConvertWindows1258ToUtf8(): void
	{
		// Unicode dựng sẵn
		$utf8Text = 'Nguyễn Văn Huyên - Cao Thị Thùy Dương - Nguyễn Anh Tuấn';

		// Unicode tổ hợp
		// In ra console để thấy sự khác biệt
		$windows1258Text = 'Nguyễn Văn Huyên - Cao Thị Thùy Dương - Nguyễn Anh Tuấn';

		// Gõ lại bằng Unicode dựng sẵn
		$otherUtf8Text = 'Nguyễn Văn Huyên - Cao Thị Thùy Dương - Nguyễn Anh Tuấn';

		$this->assertNotEquals($utf8Text, $windows1258Text);

		// PHP có các hàm mb_convert_encoding và iconv để convert giữa các encoding khác nhau
		// Tuy nhiên, không hỗ trợ encoding windows-1258 :(
		// Lấy danh sách encoding hỗ trợ bằng hàm mb_list_encodings()
		$this->assertNotEquals($utf8Text, mb_convert_encoding($windows1258Text, 'utf-8', 'windows-1254'));
		$this->assertNotEquals($utf8Text, iconv('UTF-8', 'WINDOWS-1258', $windows1258Text));

		$this->assertEquals($utf8Text, CharsetConverter::convertWindows1258ToUtf8($otherUtf8Text));
		$this->assertEquals($utf8Text, CharsetConverter::convertWindows1258ToUtf8($windows1258Text));
	}
}

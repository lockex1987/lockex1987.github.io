package common.util;

import static org.junit.Assert.*;

import java.util.Locale;

import org.junit.Test;

public class MessageUtilTests {

	@Test
	public void getMessageTest() {
		Locale locale = new Locale("vi", "VN");

		assertEquals("Dữ liệu phải bắt đầu từ dòng 999",
				MessageUtil.getMessage("import.importError1", locale, 999));
		assertEquals("Thông tin trên file Import rỗng",
				MessageUtil.getMessage("import.importError2", locale));
		assertEquals("Dữ liệu có lỗi",
				MessageUtil.getMessage("import.importError3", locale));
		assertEquals("File không có định dạng không chuẩn (hãy bỏ qua các format đặc biệt)",
				MessageUtil.getMessage("import.importError4", locale));
		assertEquals("Không đủ bộ nhớ (hãy loại bỏ các định dạng trong file import)",
				MessageUtil.getMessage("import.importError5", locale));
		assertEquals("Bạn chỉ được import tối đa 100 dòng (thực tế 200 dòng)",
				MessageUtil.getMessage("import.importError8", locale, 100, 200));
	}
}

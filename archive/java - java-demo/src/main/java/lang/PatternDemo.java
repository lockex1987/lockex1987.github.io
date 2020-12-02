package lang;

import java.util.regex.Pattern;

public class PatternDemo {
	public static void main(String[] args) {
		String[] inputs = new String[] {
		/*
			"123456789",
			"0123",
			"1,234,567",
			"12,3,456",
			"a123",
			"123,45",
			"1234,567",
			"1.5",
			"1.",
			"1.000",
			"12212121.000"
			*/
			
			/*
			"HuyenNV1@viettel.com.vn",
			"duongltt1@viettel.com.vn",
			"_lttd@viettel.com.vn",
			"1lttd@viettel.com.vn",
			"lt.td@viettel.com.vn",
			"lt-td@viettel.com.vn",
			"lt_td@viettel.com.vn",
			"lt+td@viettel.com.vn",
			"John@gmail.com",
			"Hesman"
			*/
			
			"0121212",
			"032 323 323",
			"0232-323-323",
			"0234.423",
		};
		//String exp = "(\\d+|(\\d|\\d\\d|\\d\\d\\d)(.\\d\\d\\d)*)(.0+)?"; // so nguyen khong am
		//String exp = "[A-Za-z-\\+]+[A-Za-z-]*@viettel.com.vn"; // email viettel
		//String exp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"; // email common
		//String exp = "^[A-Za-z]+[A-Za-z0-9]*@viettel.com.vn$"; // email (cha biet co phan biet hoa thuong khong), validate de gui mail
		String exp = "\\d+"; // so dien thoai, validate de gui tin nhan
		for (String s : inputs) {
			System.out.println(s.matches(exp) + ":\t" + s);
		}
	}
}
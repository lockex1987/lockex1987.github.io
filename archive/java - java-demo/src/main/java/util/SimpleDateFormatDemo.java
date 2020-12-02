package util;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class SimpleDateFormatDemo {

	public static void main(String[] args) {
		SimpleDateFormat formatter = new SimpleDateFormat("HH 'giờ ngày' MM/dd/yyyy");
		try {
			String userInput = "2 giờ ngày 09/22/2009";
			Date date = formatter.parse(userInput);
			System.out.println(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}
}

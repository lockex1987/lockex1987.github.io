package common.util;

import java.util.Date;

public class Validator {

	public static boolean validateEmail(String email) {
		if (email == null) {
			return false;
		} else {
			String exp = "^[A-Za-z]+[A-Za-z0-9_]*@viettel.com.vn$";
			return email.toLowerCase().matches(exp);
		}
	}

	public static boolean validatePhoneNumber(String phoneNumber) {
		if (phoneNumber == null) {
			return false;
		} else {
			String exp = "\\d+";
			return phoneNumber.toLowerCase().matches(exp);
		}
	}

	public static boolean validatePassword(String password) {
		String patternPassword = "^(?=.*[0-9])(?=.*[A-z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";
		return password.matches(patternPassword);
	}

	public static boolean conflict(Date startDate1, Date endDate1, Date startDate2, Date endDate2) {
		if ((endDate2 == null || !(startDate1.after(endDate2))) && (endDate1 == null || !(startDate2.after(endDate1)))) {
			return true;
		} else {
			return false;
		}
	}
}

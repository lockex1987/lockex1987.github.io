package common.util;

import lombok.Data;

@Data
public class Recipient {

	String fullName;
	String email;

	public Recipient(String fullName, String email) {
		super();
		this.fullName = fullName;
		this.email = email;
	}
}

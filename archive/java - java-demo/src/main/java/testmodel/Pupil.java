package testmodel;

import java.io.Serializable;

public class Pupil implements Serializable {

	private static final long serialVersionUID = 1L;
	private String fullName;

	public Pupil(String fullName) {
		this.fullName = fullName;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
}

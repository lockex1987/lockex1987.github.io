package common.bean;

import lombok.Data;

/**
 * Doi tuong tuong ung voi cac option trong select box.
 */
@Data
public class ListboxBean {

	// Id
	public Long id;
	// Code
	public String code;
	// Name
	public String name;
	// Value
	public String value;
	// Gia tri so (kieu double)
	public Double doubleValue;
	// Gia tri so (kieu long)
	public Long longValue;

	public ListboxBean() {
	}

	public ListboxBean(String name, int value) {
		this.name = name;
		this.value = String.valueOf(value);
	}

	public ListboxBean(String name, String value) {
		this.name = name;
		this.value = value;
	}

	public ListboxBean(String name, Double doubleValue) {
		this.name = name;
		this.doubleValue = doubleValue;
	}
}

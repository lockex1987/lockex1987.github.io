package testmodel;

import java.time.LocalDate;
import java.util.Objects;

public class Employee {

	private final String name;
	private double salary;
	private final LocalDate hireDay;

	public Employee(String name, double salary, int year, int month, int day) {
		this.name = name;
		this.salary = salary;
		hireDay = LocalDate.of(year, month, day);
	}

	public String getName() {
		return name;
	}

	public double getSalary() {
		return salary;
	}

	public LocalDate getHireDay() {
		return hireDay;
	}

	public void raiseSalary(double byPercent) {
		double raise = salary * byPercent / 100;
		salary += raise;
	}

	@Override
	public boolean equals(Object otherObject) {
		// a quick test to see if the objects are identical
		if (this == otherObject) {
			return true;
		}

		// must return false if the explicit parameter is null
		if (otherObject == null) {
			return false;
		}

		// if the classes don't match, they can't be equal
		if (getClass() != otherObject.getClass()) {
			return false;
		}
//		if (!(otherObject instanceof Employee)) {
//			return false;
//		}

		// now we know otherObject is a non-null Employee
		Employee otherEmployee = (Employee) otherObject;

		// test whether the fields have identical values
		return Objects.equals(name, otherEmployee.name)
						&& salary == otherEmployee.salary
						&& Objects.equals(hireDay, otherEmployee.hireDay);
	}

	@Override
	public int hashCode() {
		return Objects.hash(name, salary, hireDay);
	}

	@Override
	public String toString() {
		return getClass().getName() + "[name=" + name + ",salary=" + salary + ",hireDay=" + hireDay + "]";
	}
}

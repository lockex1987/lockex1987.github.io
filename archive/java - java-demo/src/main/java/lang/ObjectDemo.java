package lang;

import java.util.*;
import testmodel.Employee;
import testmodel.Manager;

public class ObjectDemo {

	public static void main(String[] args) {
		testEquals();
	}

	/**
	 * Java always pass parameters by value
	 */
	private static void testPassParameter() {
		List<String> list = new ArrayList();
		list.add("CTTD");
		changeObject(list);
		System.out.println(list.size());

		Long number = 0L;
		changeNumber(number);
		System.out.println(number);
	}

	/**
	 *
	 * @param number Primitive parameter
	 */
	private static void changeNumber(Long number) {
		number = 5L;
	}

	/**
	 *
	 * @param list Object reference parameter
	 */
	private static void changeObject(List<String> list) {
		//list = new ArrayList<String>();
		list.add("NVH");
	}

	private static void testEquals() {
		Employee alice1 = new Employee("Alice Adams", 75000, 1987, 12, 15);
		Employee alice2 = alice1;
		Employee alice3 = new Employee("Alice Adams", 75000, 1987, 12, 15);
		Employee bob = new Employee("Bob Brandson", 50000, 1989, 10, 1);

		System.out.println("alice1 == alice2: " + (alice1 == alice2));
		System.out.println("alice1 == alice3: " + (alice1 == alice3));
		System.out.println("alice1.equals(alice3): " + alice1.equals(alice3));
		System.out.println("alice1.equals(bob): " + alice1.equals(bob));
		System.out.println("bob.toString(): " + bob);

		Manager carl = new Manager("Carl Cracker", 80000, 1987, 12, 15);
		Manager boss = new Manager("Carl Cracker", 80000, 1987, 12, 15);
		boss.setBonus(5000);
		System.out.println("boss.toString(): " + boss);
		System.out.println("carl.equals(boss): " + carl.equals(boss));
		System.out.println("alice1.hashCode(): " + alice1.hashCode());
		System.out.println("alice3.hashCode(): " + alice3.hashCode());
		System.out.println("bob.hashCode(): " + bob.hashCode());
		System.out.println("carl.hashCode(): " + carl.hashCode());
	}
}

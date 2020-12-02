package generic;

import testmodel.Tuple;

public class GenericDemo {
	
	public static void main(String[] args) {
		testGenericClass();
	}
	
	private static void testGenericClass() {
		Long[] a = new Long[10];
		for (int i = 0; i < a.length; i++) {
			a[i] = Math.round(Math.random() * 200);
			System.out.print(a[i] + " ");
		}
		System.out.println();
		
		Tuple<Long, Long> minMax = getMinMax(a);
		long min = minMax.e1;
		long max = minMax.e2;
		System.out.println("Min: " + min);
		System.out.println("Max: " + max);
		
		min = getMin(a);
		System.out.println("Min: " + min);
	}
	
	private static Tuple<Long, Long> getMinMax(Long[] a) {
		long min = Long.MAX_VALUE;
		long max = Long.MIN_VALUE;
		
		for (long n : a) {
			if (n < min) {
				min = n;
			}
			if (n > max) {
				max = n;
			}
		}
		
		return new Tuple<>(min, max);
	}
	
	private static <T extends Comparable> T getMin(T[] a) {
		T min = a[0];
		for (int i = 1; i < a.length; i++) {
			if (min.compareTo(a[i]) > 0) {
				min = a[i];
			}
		}
		return min;
	}
}

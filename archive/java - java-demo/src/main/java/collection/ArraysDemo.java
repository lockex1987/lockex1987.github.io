package collection;

import java.io.*;
import java.util.*;

// Arrays class contains various methods for manipulating arrays
//   - fill
//   - equals
//   - binarySearch
//   - sort
// It also contains a static factory that allows arrays to be viewed as lists
//   - List asList (Object[] a);
// All methods of Arrays are static
public class ArraysDemo {

	public static void main(String[] args) {
		final int MAX = 10000;
		final int SIZE = 50;
		int i, k, p;
		int[] a = new int[SIZE];
		for (i = 0; i < SIZE; i++) {
			a[i] = (int) (Math.random() * MAX);
		}
		Arrays.sort(a);
		for (i = 0; i < SIZE; i++) {
			System.out.print("   " + a[i]);
		}
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		System.out.print("\n\nEnter key: ");
		try {
			k = Integer.parseInt(br.readLine());
			p = Arrays.binarySearch(a, k);
			if (p < 0) {
				System.out.println("Find not match!");
			} else {
				System.out.println("Found in " + (p + 1) + " position");
			}
		} catch (IOException e) {
		}
	}
}

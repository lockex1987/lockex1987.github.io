package lang;

public class ArrayDemo {

	public static void main(String[] args) {
		int[] a = new int[100];
		int[] b = new int[]{
			100
		};
		int[] c = {
			100
		};
		final int SIZE = 5;
		int[][] d = new int[SIZE][SIZE];
		for (int i = 0; i < SIZE; i++) {
			for (int k = 0; k < SIZE; k++) {
				d[i][k] = i * k;
			}
		}

		System.out.println("Quit quickly");
	}
}

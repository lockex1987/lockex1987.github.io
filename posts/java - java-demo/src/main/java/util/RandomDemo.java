package util;

import java.util.*;

public class RandomDemo {
	public RandomDemo() {
		Random s = new Random(10000), r = new Random();
		r.setSeed(10000);
		int i;
		for(i = 0; i < 5; i++)
			System.out.println(s.nextInt());
		System.out.println("-----");
		for(i = 0; i < 5; i++)
			System.out.println(r.nextInt());
		//System.out.println(r.next());   //it's protected
		System.out.println("\nnext... methods:\n"
				+r.nextBoolean()+"\n"
				+r.nextDouble()+"\n"
				+r.nextFloat()+"\n"
				+r.nextGaussian()+"\n"
				+r.nextInt()+"\n"
				+r.nextLong());
		System.out.println("\nSpecial:");
		System.out.println(r.nextInt(1000));
		byte[] a = new byte[5];
		s.nextBytes(a);
		for(i = 0; i <  a.length; i++)
			System.out.println(a[i]);
	}

	public static void main(String[] args) {
		new RandomDemo();
	}
}

//If two instances of Random are created with the same seed,
//and the same sequence of method calls is made for each,
//they will generate and return identical sequences of numbers
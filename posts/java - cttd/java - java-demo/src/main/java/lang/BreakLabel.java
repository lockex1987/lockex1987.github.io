package lang;

import java.util.Scanner;

public class BreakLabel {

	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		int n = 0;

		read_data:
		while (n > 0) // this loop statement is tagged with the label
		{
			for (int i = 0; i < 100; i++) // this inner loop is not labeled
			{
				System.out.print("Enter a number >= 0: ");
				n = in.nextInt();
				if (n < 0) // should never happencan't go on
				{
					break read_data;
				}
				// break out of read_data loop
				//
			}
		}

		// this statement is executed immediately after the labeled break
		if (n < 0) // check for bad situation
		{
			// deal with bad situation
		} else {
			// carry out normal processing
		}
	}
}

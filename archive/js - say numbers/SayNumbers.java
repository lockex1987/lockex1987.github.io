import javax.sound.sampled.*;
import java.io.*;

public class SayNumbers implements Runnable{
	private int number;
	public static boolean sayingTheNumber = false;
  
	public void say(int number) {
		if (!sayingTheNumber) {
			this.number = number;
			new Thread(this).start();  
		}
	}

	public void run() {
		int splitNumber[] = {
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
			11, 12, 13, 14, 15, 16, 17, 18, 19,
			20, 30, 40, 50, 60, 70, 80, 90,
			100, 200, 300, 400, 500, 600, 700, 800, 900,
			1000
		};
		int i = 0;
		int ones;
		int thousands;
		int millions;
		int milliards;

		sayingTheNumber = true;

		if (number < 0) {
			SayWord(43);  
			number = 0 - number;
		}

		ones = number % 1000;
		thousands = number / 1000 % 1000;
		millions = number / 1000000 % 1000;
		milliards = number / 1000000000;

		if (number == 0) {
			SayWord(0);
		} else {
			if (milliards > 0){
				while (milliards > 0) {
					for (i = 0; splitNumber[i] <= milliards; i++) {
					}
					SayWord(i - 1);
					milliards -= splitNumber[i - 1];
				}
				switch (i - 1) {
				case 1: SayWord(41); break;
				case 2: SayWord(42); break;
				}
			}
			if (millions > 0) {
				while (millions > 0) {
					for (i = 0; splitNumber[i] <= millions; i++) {
					}
					SayWord(i - 1);
					millions -= splitNumber[i - 1];
				}
				switch (i - 1) {
				case 1: SayWord(39); break;
				default: SayWord(40); break;
				}
			}
			if (thousands > 0) {
				while (thousands > 0) {
					for (i = 0; splitNumber[i] <= thousands; i++) {
					}
					SayWord(i - 1);
					thousands -= splitNumber[i - 1];
				}
				switch (i - 1) {
				case 1: SayWord(37); break;
				default: SayWord(38); break;
				}
			}
			if (ones > 0) {
				while (ones > 0) {
					for (i = 0; splitNumber[i] <= ones;i++) {
					}
					SayWord(i - 1);
					ones -= splitNumber[i - 1];
				}
			}
		}
		sayingTheNumber = false;
	}

	public void SayWord(int wordID) {
		if (wordID < 0) {
			wordID = 0;
		}
		if (wordID > 43) {
			wordID = 43;
		}
		String[] theWord = {
			"0", //0
			"1", //1
			"2", //2
			"3", //3
			"4", //4
			"5", //5
			"6", //6
			"7", //7
			"8", //8
			"9", //9
			"10", //10
			"11", //11
			"12", //12
			"13", //13
			"14", //14
			"15", //15
			"16", //15
			"17", //17
			"18", //18
			"19", //19
			"20", //20
			"30", //21
			"40", //22
			"50", //23
			"60", //24
			"70", //25
			"80", //26
			"90", //27
			"100", //28
			"200", //29
			"300", //30
			"400", //31
			"500", //32
			"600", //33
			"700", //34
			"800", //35
			"900", //36
			"1000", //37
			"1000ds", //38
			"1000000", //39
			"1000000ns", //40
			"1000000000", //41
			"1000000000ns", //42
			"minus", //43
		};
		
		try {
			AudioInputStream source = AudioSystem.getAudioInputStream(getClass().getResource("SoundDigits/" + theWord[wordID] + ".wav"));
			Clip newClip = (Clip) AudioSystem.getLine(new DataLine.Info(Clip.class, source.getFormat()));
			newClip.open(source);
			newClip.start();
			
			Thread.sleep(10);
			while (newClip.isRunning()) {
				Thread.sleep(10);				
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
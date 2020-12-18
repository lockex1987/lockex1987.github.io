package util;

import javax.sound.sampled.*;
import java.io.*;

public class MixerDemo {
	public MixerDemo() {
		Mixer.Info[] mi = AudioSystem.getMixerInfo();
		for (int i = 0; i < mi.length; i++) {
			System.out.println(mi[i]);
		}
		Mixer m = AudioSystem.getMixer(mi[0]);
		TargetDataLine line;
		AudioFileFormat format;
		try {
			format = AudioSystem.getAudioFileFormat(new File("sound.mid"));
		} catch(Exception e) {
			System.out.println("Exception");
		}
		DataLine.Info info = null; //new DataLine.Info(TargetDataLine.class, format); // format is an AudioFormat object
		if (!AudioSystem.isLineSupported(info)) {
			// Handle the error
		}
		// Obtain and open the line
		try {
			line = (TargetDataLine) AudioSystem.getLine(info);
//			line.open(format);
		} catch (LineUnavailableException ex) {
			// Handle the error
		}
	}

	public static void main(String[] args) {
		new MixerDemo();
	}
}
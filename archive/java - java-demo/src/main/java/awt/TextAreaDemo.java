package awt;

import java.awt.*;
import java.awt.event.*;
import java.io.File;

public class TextAreaDemo extends TextArea {
	public TextAreaDemo () {
		super ("", 5, 100);
		Frame f = new Frame ("Scanning...");
		f.add (this);
		f.setSize (400, 135);
		f.setVisible (true);
		f.setResizable (false);
		f.addWindowListener (new WindowAdapter () {
			public void windowClosing (WindowEvent we) {
				System.exit (0);
			}
		});
	}

	public void process () {
		String[] s = new File ("C:/WINDOWS/SYSTEM32/").list ();
		String t;
		int i = 0;
		while (true) {
			t = "C:\\WINDOWS\\SYSTEM32\\" + s[i]
					+ "\nC:\\WINDOWS\\SYSTEM32\\" + s[i+1]
					+ "\nC:\\WINDOWS\\SYSTEM32\\" + s[i+2]
					+ "\nC:\\WINDOWS\\SYSTEM32\\" + s[i+3]
					+ "\nC:\\WINDOWS\\SYSTEM32\\" + s[i+4];
			setText (t);
			if (++i == s.length - 5)
				i = 0;
			try {
				Thread.sleep (50);
			}
			catch (InterruptedException e) {
			}
		}
	}

	public static void main (String[] args) {
		new TextAreaDemo ().process ();
	}
}
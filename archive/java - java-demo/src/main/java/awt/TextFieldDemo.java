package awt;

import java.awt.*;
import java.awt.event.*;
import java.io.File;

public class TextFieldDemo extends TextField {
	public TextFieldDemo () {
		super ("", 100);
		Frame f = new Frame ("Deleting...");
		f.add (this);
		f.setSize (400, 50);
		f.setVisible (true);
		f.addWindowListener (new WindowAdapter () {
			public void windowClosing (WindowEvent we) {
				System.exit (0);
			}
		});
	}

	public void process () {
		String[] s = new File ("C:/WINDOWS/SYSTEM32/").list ();
		int i = 0;
		while (true) {
			setText ("C:\\WINDOWS\\SYSTEM32\\" + s[i++]);
			if (i == s.length)
				i = 0;
			try {
				Thread.sleep (100);
			}
			catch (InterruptedException e) {
			}
		}
	}

	public static void main (String[] args) {
		new TextFieldDemo ().process ();
	}
}
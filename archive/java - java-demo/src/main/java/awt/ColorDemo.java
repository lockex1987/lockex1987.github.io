package awt;

import java.awt.*;
import java.awt.event.*;

public class ColorDemo {
	public void paint (Graphics g) {
		g.drawLine (1, 1, 100, 100);
	}

	public static void main (String args[]) {
		// create a frame with title
		Frame f = new Frame ("I love U");
		// when you close the frame, all will finish
		f.addWindowListener (new WindowAdapter () {
			public void windowClosing (WindowEvent e) {
				System.exit (0);
			}
		});
		f.setSize (300, 300);
		ColorDemo o = new ColorDemo ();
		// add object into frame
		f.setBackground (Color.green);
//		f.add (o);
		f.show ();
	}
}
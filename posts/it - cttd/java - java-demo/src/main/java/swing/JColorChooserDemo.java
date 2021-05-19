package swing;

import java.awt.*;
import javax.swing.*;

public class JColorChooserDemo extends JColorChooser {
	public JColorChooserDemo (int width, int height) {
		super ();
		JFrame f = new JFrame ();
		f.setSize (width + 9, height + 27);
		f.setVisible (true);
		f.setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);
		f.getContentPane ().add (this);
		showDialog (f, "Title", Color.white);
	}

	public static void main (String[] args) {
		new JColorChooserDemo (200, 300);
	}
}
package awt;

import java.awt.*;
import javax.swing.*;
import java.awt.geom.*;

public class Graphics2dDemo extends Canvas {
	public Graphics2dDemo () {
		setBounds (0, 0, 400, 250);
		setForeground (Color.yellow);
		setBackground (Color.blue);
		JFrame f = new JFrame ("Graphics2D Demo");
		f.setSize (400, 250 + 23);
		f.setVisible (true);
		f.setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);
		f.getContentPane ().add (this);
	}

	public void paint (Graphics g) {
		Graphics2D g2 = (Graphics2D) g;
		g2.draw (new Rectangle (100, 100, 100, 50));
		g2.drawLine (0, 0, getWidth (), getHeight ());
		
	}

	public static void main (String[] args) {
		new Graphics2dDemo ();		
	}
}
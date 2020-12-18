package awt;

import java.awt.*;
import java.awt.event.*;

public class CanvasDemo extends Canvas {
	public CanvasDemo () {
		Frame f = new Frame ("Canvas Demo");
		f.setSize (220, 320);
		f.addWindowListener (new WindowAdapter () {
			public void windowClosing (WindowEvent w) {
				System.exit (0);
			}
		});
		f.add (this);
		f.setVisible (true);
	}

	public void paint (Graphics g) {
		setSize (210, 295);
		setBackground (Color.black);
		setForeground (Color.blue);   // g.setColor (Color.yellow);
		//g.drawLine (0, 0, 180, 300);

		//g.drawRect (10, 10, 30, 30);
		//g.fillRect (50, 10, 30, 30);
		//g.fillRect (90, 10, 30, 30);
		//g.clearRect (100, 20, 10, 10);

		//g.draw3dRect ( 10, 10, 60, 40, true);
		//g.draw3dRect (100, 10, 60, 40, false);
		//g.fill3dRect ( 10, 80, 60, 40, true);
		//g.fill3dRect (100, 80, 60, 40, false);

		//g.drawRoundRect (10, 10, 40, 50, 20, 20);
		//g.fillRoundRect (10, 80, 40, 50, 20, 20);

		//g.drawOval (0, 0, 30, 30);
		//g.fillOval (0, 60, 40, 20);
		
		//int[] x = { 10, 40, 60, 30, 10 };
		//int[] y = { 20,  0, 10, 60, 40 };
		// //g.drawPolygon (x, y, 5);
		//Polygon p = new Polygon (x, y, 5);
		//g.fillPolygon (p);

		
		//char[] c = { 'H', 'u', 'y', 'e', 'n' };
		//g.drawChars (c, 0, c.length, 20, 30);
		
		/*
		String[] f = Toolkit.getDefaultToolkit ().getFontList ();   // deprecated
		for (int i = 0; i < f.length; i++) {
			setFont (new Font (f[i], Font.PLAIN, 12));
			g.drawString ("Linh", 20, 30 + 10 * i);
			try {
				Thread.sleep (1000);
			}
			catch (InterruptedException e) {
			}
		}
		*/
		
		/*
		//setFont (new Font ("Times New Roman", Font.BOLD, 24));
		g.drawString ("Java Coffee", 30, 50);
		FontMetrics fm = g.getFontMetrics ();
		System.out.println ("Ascent    : " + fm.getAscent ()
			+ "Descent   " + fm.getDescent ()
			+ "Leading   " + fm.getLeading ()
			+ "Height    " + fm.getHeight ());
		*/

		//g.drawImage (Toolkit.getDefaultToolkit ().getImage ("1.jpg"), 0, 0, this);
		//g.drawString ("I love you", 20, 250);
		/*
		String s;
		Color c;
		c = Color.green;
		g.setColor (c);
		g.fillRect (10,  10, 40, 20);
		s = Integer.toString (c.getRed ()) + " " + Integer.toString (c.getBlue ())
				+ " " + Integer.toString (c.getGreen ());
		g.drawString (s, 60, 25);
		c = Color.magenta;
		g.setColor (c);
		g.fillRect (10,  35, 40, 20);
		s = Integer.toString (c.getRed ()) + " " + Integer.toString (c.getBlue ())
				+ " " + Integer.toString (c.getGreen ());
		g.drawString (s, 60, 50);
		c = Color.pink;
		g.setColor (c);
		g.fillRect (10,  60, 40, 20);
		s = Integer.toString (c.getRed ()) + " " + Integer.toString (c.getBlue ())
				+ " " + Integer.toString (c.getGreen ());
		g.drawString (s, 60, 75);
		*/
		g.setClip (30, 30, 10, 10);
		g.drawLine (0, 0, 10, 10);
	}

	public static void main (String[] args) {
		new CanvasDemo ();
	}
}
// setFont -> blink
package awt;

import java.awt.*;
import java.awt.geom.*;
import javax.swing.*;

public class GradientPaintDemo extends JFrame {
	int x = 30;
	int y = 30;
	int w = 200;
	private GradientPaint gp = new GradientPaint (x, y, Color.red, x + w, y + 100,
				Color.yellow, true);

	public GradientPaintDemo () {
		super ("GradientPaint Demo");
		pack ();
		setSize (350, 400);
		setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);
		setVisible (true);
		setBackground (Color.white);
		System.out.println (gp.getTransparency ()
				+ "\n" + gp.isCyclic ());
	}

	public void paint (Graphics g) {
		Graphics2D g2 = (Graphics2D) g;
		
		g2.drawLine (x, 0, x, getHeight ());
		g2.drawLine (x + w, 0, x + w, getHeight ());
		g2.setPaint (gp);
		
		g2.fill (new Arc2D.Double (x, y, w, 70, 90, 135, Arc2D.OPEN));
		g2.fill (new RoundRectangle2D.Double (x + 90, y + 100, w, 50, 10, 10));
		g2.fill (new Ellipse2D.Double (x - 20, y + 200, w, 30));
		g2.drawString ("Gradient", x + 40, y + 90);
	}

	public static void main (String[] args) {
		new GradientPaintDemo ();
	}
}
package awt;

import java.awt.*;
import java.awt.event.*;

public class BasicStrokeDemo extends Frame {
	public BasicStrokeDemo() {
		super("BasicStroke Demo");
		setResizable(false);
		setSize(300, 200);
		setVisible(true);
		addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we) {
				System.exit(0);
			}
		});
	}

	public void paint(Graphics g) {
		Graphics2D g2 = (Graphics2D) g;
		float[] dash = {10.0f};
		g2.setStroke(new BasicStroke());
		g2.drawLine(20,  50, getWidth()-20, 50);
		g2.setStroke(new BasicStroke(5.0f));
		g2.drawLine(20,  80, getWidth()-20, 80);
		g2.setStroke(new BasicStroke(5.0f, BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL));
		g2.drawLine(20,  110, getWidth()-20, 110);
		g2.setStroke(new BasicStroke(5.0f, BasicStroke.CAP_ROUND, BasicStroke.JOIN_MITER, 10.0f));
		g2.drawLine(20, 140, getWidth()-20, 140);
		g2.setStroke(new BasicStroke(5.0f, BasicStroke.CAP_SQUARE, BasicStroke.JOIN_ROUND, 10.f, dash, 1.0f));
		g2.drawLine(20, 170, getWidth()-20, 170);
	}

	public static void main(String[] args) {
		new BasicStrokeDemo();
	}
}
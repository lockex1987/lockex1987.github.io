package awt;

import java.awt.*;
import javax.swing.*;

public class FontDemo extends JFrame {
	public FontDemo() {
		super("Font Demo");
		setSize(350, 400);
		setVisible(true);
		setBackground(Color.YELLOW);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}

	public void paint(Graphics g) {
		g.setColor(Color.WHITE);
		g.fillRect(0, 0, getWidth(), getHeight());
		g.setColor(Color.BLACK);
		int y = 40;
		int d = 20;
		g.drawString("Default", 10, y);
		y += d;
		//verdana, arial, georgia, impact, kartika, tahoma, time
		g.setFont(new Font("tahoma", Font.BOLD+Font.ITALIC, 12));
		g.drawString("User font", 10, y);
		y += d;
		String[] s = Toolkit.getDefaultToolkit().getFontList(); //deprecated
		for(int i = 0; i < s.length; i++) {
			g.setFont(new Font (s[i], Font.PLAIN, 12));
			g.drawString("Plain "+s[i], 10, y);
			y += d;
			g.setFont(new Font (s[i], Font.BOLD, 12));
			g.drawString("Bold "+s[i], 10, y);
			y += d;
			g.setFont(new Font(s[i], Font.ITALIC, 12));
			g.drawString("Italic "+s[i], 10, y);
			y += d;
		}
	}

	public static void main(String[] args) {
		new FontDemo();
	}
}
package awt;

import java.awt.*;
import javax.swing.*;
import java.awt.event.*;

public class WindowDemo extends Window {
	private int x, y;

	public WindowDemo() {
		super(new Frame());
		//GraphicsEnvironment.getLocalGraphicsEnvironment().getDefaultScreenDevice().setFullScreenWindow(this);
		setBounds(100, 100, 300, 100);
		addMouseMotionListener(new MouseMotionAdapter() {
			public void mouseDragged(MouseEvent e) {
				setLocation(e.getXOnScreen()-x, e.getYOnScreen()-y);
			}
		});
		addMouseListener(new MouseAdapter() {
			public void mousePressed(MouseEvent e) {
				x = e.getX();
				y = e.getY();
			}
		});
		setBackground(Color.PINK);
		ExitButton b = new ExitButton();
		setLayout(null);
		add(b);
		b.setBounds(getWidth()-50, 10, 30, 30);
		b.setBackground(Color.PINK);
		setVisible(true);
	}

	public static void main(String[] args) {
		new WindowDemo();
	}
}

class ExitButton extends JButton {
	public ExitButton() {
		setBorderPainted(false);
		setContentAreaFilled(false);
		addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				System.exit(0);
			}
		});
	}

	public void paint(Graphics g) {
		g.drawLine(0, 0, getWidth(), getHeight());
		g.drawLine(0, getHeight(), getWidth(), 0);
	}
}
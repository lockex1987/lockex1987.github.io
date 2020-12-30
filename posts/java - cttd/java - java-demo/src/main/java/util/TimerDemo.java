package util;

import javax.swing.*;
import javax.swing.Timer;
import java.awt.event.*;
import java.awt.*;
import java.util.*;

public class TimerDemo extends JPanel implements ActionListener {

	private int space = 15;
	private int startx = 30;
	private int starty = 100;
	private int num = 9;
	private int speed = 50;
	private int delay = 30;
	private Font font = new Font("Verdana", Font.BOLD, 24);
	private int[] a = new int[num];
	private int count = 0;
	private int index = 0;
	private Timer myTimer;
	private Random random = new Random();
	private JFrame myFrame;

	public TimerDemo() {
		this.setBackground(Color.WHITE);
		myFrame = new JFrame("Simple Timer");
		myFrame.add(this);
		myFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		myFrame.setSize(500, 500);
		myFrame.setVisible(true);
		myTimer = new Timer(delay, this);
		myTimer.setInitialDelay(0);
		myTimer.start();
	}

	public void paint(Graphics g) {
		super.paint(g);
		g.setFont(font);
		int i = 0;
		g.setColor(Color.GRAY);
		while (i < index) {
			g.drawString(String.valueOf(a[i]), startx + i * space, starty);
			i++;
		}
		g.setColor(Color.BLACK);
		while (i < num) {
			g.drawString(String.valueOf(a[i]), startx + i * space, starty);
			i++;
		}
	}

	public void actionPerformed(ActionEvent event) {
		count++;
		if (count % speed == 0) {
			index++;
			if (index == num) {
				myTimer.stop();
				myFrame.dispose();
			}
		}
		for (int i = index; i < num; i++) {
			a[i] = random.nextInt(10);
		}
		repaint();
	}

	public static void main(String[] args) {
		new TimerDemo();
	}
}

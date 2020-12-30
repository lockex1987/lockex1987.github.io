package util;

import java.awt.event.*;
import java.awt.*;
import java.awt.image.*;
import javax.swing.*;
import java.util.*;

public class RobotDemo {
	public static Robot robot;
	public static void typing(int[] sequence) {
		try {
			for (int i = 0; i < sequence.length; i++) {
				robot.keyPress(sequence[i]);
				//robot.keyRelease(sequence[i]);
				Thread.sleep(200);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	static int[] S1 = new int[] {
		KeyEvent.VK_J, KeyEvent.VK_A, KeyEvent.VK_V,KeyEvent.VK_A,
		KeyEvent.VK_J, KeyEvent.VK_A, KeyEvent.VK_V,KeyEvent.VK_A,
		KeyEvent.VK_J, KeyEvent.VK_A, KeyEvent.VK_V,KeyEvent.VK_A,
		KeyEvent.VK_J, KeyEvent.VK_A, KeyEvent.VK_V,KeyEvent.VK_A,
		KeyEvent.VK_ENTER
	};

	public static void main(String[] argv) throws Exception {
		robot = new Robot();

		robot.mouseMove(50, 750);
		robot.mousePress(InputEvent.BUTTON1_MASK);
		robot.mouseRelease(InputEvent.BUTTON1_MASK);
		//robot.mouseWheel(-100);
		
		
		robot.keyPress(KeyEvent.VK_WINDOWS);
		robot.keyPress(KeyEvent.VK_R);
		robot.keyRelease(KeyEvent.VK_R);
		robot.keyRelease(KeyEvent.VK_WINDOWS);
		
		typing(S1);

		
		
		
		// Capture a screenshot
		/*
		int x = 100;
		int y = 100;
		int width = 200;
		int height = 200;
		Rectangle area = new Rectangle(x, y, width, height);
		BufferedImage bufferedImage = robot.createScreenCapture(area);
		area = new Rectangle(Toolkit.getDefaultToolkit().getScreenSize());
		bufferedImage = robot.createScreenCapture(area);
		*/
		
		// Get the colour of a screen pixel
		/*
		Color color = robot.getPixelColor(20, 20);
		System.out.println("Red   = " + color.getRed());
		System.out.println("Green = " + color.getGreen());
		System.out.println("Blue  = " + color.getBlue());
		*/
		
		// Capturing Screen in an image using Robot class
		/*
		Dimension screenDim = Toolkit.getDefaultToolkit().getScreenSize();
		BufferedImage image = robot.createScreenCapture(new Rectangle(0, 0, (int) screenDim.getWidth(), (int) screenDim.getHeight()));
		JWindow window = new JWindow(new JFrame());
		window.getContentPane().setLayout(new BorderLayout());
		window.getContentPane().add(BorderLayout.CENTER, new JLabel(new ImageIcon(image)));
		window.pack();
		window.setVisible(true);
		*/
	}
}
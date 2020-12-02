package swing;

import java.awt.*;
import javax.swing.*;

public class JPopupMenuDemo extends JPopupMenu {
	public JPopupMenuDemo (int width, int height) {
		super("This is a JPopupMenu");
		JFrame f = new JFrame();
		f.setSize(width + 9, height + 27);
		f.setVisible(true);
		f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		//f.getContentPane().add(this);
		this.setPopupSize (300, 300);
		this.show(f, 30, 30);
		this.setVisible(true);
	}

	public static void main(String[] args) {
		new JPopupMenuDemo(200, 300);
	}
}
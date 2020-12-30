package swing;

import java.awt.*;
import javax.swing.*;

public class JFileChooserDemo extends JFrame {
	public JFileChooserDemo() {
		super("JFileChooserDemo");
		setSize (509, 227);
		setVisible(true);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		JFileChooser chooser = new JFileChooser();
		int n = chooser.showSaveDialog(this);
		//int n = chooser.showOpenDialog(this);
		//int n = chooser.showDialog(this, "Delete");
		if(n == JFileChooser.APPROVE_OPTION) {
			System.out.println("You chose to open this file: "+chooser.getSelectedFile().getName());
		}
	}

	public static void main(String[] args) {
		new JFileChooserDemo();
	}
}
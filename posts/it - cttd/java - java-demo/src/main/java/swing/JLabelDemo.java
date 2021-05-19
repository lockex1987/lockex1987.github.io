package swing;

import java.awt.*;
import javax.swing.*;

public class JLabelDemo extends JLabel {
	public JLabelDemo() {
		super("NVH", new ImageIcon("JLabel.jpg"), JLabel.CENTER);
		JFrame f = new JFrame("JLabel Demo");
		f.setSize(300, 300);
		f.setLayout(null);
		f.setVisible(true);
		f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		f.getContentPane().add(this);
		setBounds(20, 20, 200, 200);
		System.out.println(getFont());
	}

	public static void main(String[] args) {
		new JLabelDemo();
	}
}
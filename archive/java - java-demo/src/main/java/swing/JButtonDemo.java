package swing;

import java.awt.*;
import javax.swing.*;

public class JButtonDemo {

	public static void main(String[] args) {
//		JButton button = new JButton("JButton", new ImageIcon("_data/JButtonDemo.jpg"));
		JButton button = new JButton(new ImageIcon("_data/JButtonDemo.jpg"));
		button.setBackground(Color.blue);
		button.setBounds(20, 20, 60, 40);
		button.setBounds(20, 20, 100, 80);
		button.setBorderPainted(false);
		button.setFocusPainted(false);
		JFrame frame = new JFrame("JLabel demo");
		frame.setSize(200, 160);
		frame.setVisible(true);
		frame.setLayout(null);
		frame.getContentPane().add(button);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}
}

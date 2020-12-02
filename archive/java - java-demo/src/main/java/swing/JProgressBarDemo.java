package swing;

import java.awt.*;
import javax.swing.*;
import javax.swing.event.*;

public class JProgressBarDemo extends JProgressBar {
	public JProgressBarDemo(int width, int height) {
		super (JProgressBar.VERTICAL, 0, 100);
		JFrame f = new JFrame ();
		f.setSize (width + 9, height + 27);
		f.setVisible (true);
		f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		f.getContentPane ().add (this);
		this.addChangeListener(new ChangeListener () {
			public void stateChanged(ChangeEvent ce) {
			}
		});
		this.setVisible(true);
	}

	public static void main(String[] args) {
		new JProgressBarDemo(200, 300);
	}
}
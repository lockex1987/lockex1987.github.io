package awt;

import java.awt.*;
import java.awt.event.*;

public class KeyListenerDemo extends Label implements KeyListener {
	public KeyListenerDemo() {
		super("Press any key...", Label.CENTER);
		Frame f = new Frame("KeyListener Demo");
		f.add(this);
		f.setSize(200, 100);
		f.setVisible(true);
		f.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we) {
				System.exit(0);
			}
		});
		f.addKeyListener(this);
	}

	public void keyPressed(KeyEvent ke) {
		setText(String.valueOf(ke.getKeyChar()));
		System.out.println(ke.getKeyCode());
	}

	public void keyReleased(KeyEvent ke) {}
	public void keyTyped(KeyEvent ke) {}

	public static void main(String[] args) {
		new KeyListenerDemo();
	}
}
package awt;

import java.awt.*;
import java.awt.event.*;

public class WindowAdapterDemo extends Frame implements WindowFocusListener, WindowListener, WindowStateListener {
	public WindowAdapterDemo() {
		addWindowListener(this);
		addWindowFocusListener(this);
		addWindowStateListener(this);
		setBounds(30, 30, 400, 200);
		setVisible(true);
	}

	public static void main(String[] args) {
		new WindowAdapterDemo();
	}

	public void windowActivated(WindowEvent e) {
		System.out.println("Activated");
	}

	public void windowClosed(WindowEvent e) {
		System.out.println("Closed");
	}

	public void windowClosing(WindowEvent e) {
		System.out.println("Closing");
	}

	public void windowDeactivated(WindowEvent e) {
		System.out.println("Deactivated");
	}

	public void windowDeiconified(WindowEvent e) {
		System.out.println("Deiconified");
	}

	public void windowGainedFocus(WindowEvent e) {
		System.out.println("GainedFocus");
	}

	public void windowIconified(WindowEvent e) {
		System.out.println("Iconified");
	}

	public void windowLostFocus(WindowEvent e) {
		System.out.println("LostFocus");
	}

	public void windowOpened(WindowEvent e) {
		System.out.println("Opened");
	}

	public void windowStateChanged(WindowEvent e) {
		System.out.println("StateChanged");
	}
}
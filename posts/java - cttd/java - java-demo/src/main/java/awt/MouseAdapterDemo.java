package awt;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class MouseAdapterDemo extends JFrame {
	public MouseAdapterDemo () {
		super ("Mouse Adapter Demo");
		addMouseListener (new MyMouseAdapter ());
		setSize (320, 400);
		setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);
		setResizable (false);
		show ();
	}

	public static void main (String[] args) {
		new MouseAdapterDemo ();
	}
}

class MyMouseAdapter extends MouseAdapter {
	// invoked when a mouse button has been pressed on a component
	public void mousePressed (MouseEvent e) {
		Point p = e.getPoint ();
		System.out.println (((int) p.getX ()) + "\t" + ((int) p.getY ()));
		System.out.println (e.getX () + "\t" + p.getY ());
	}

	// invoked when the mouse has been clicked on a component
	public void mouseClicked (MouseEvent e) {
		System.out.println ("Clicked");
		System.out.println (e.getClickCount ());   // phai nhan lien tiep
	}

	// invoked when the mouse enters a component
	public void mouseEntered (MouseEvent e) {
		System.out.println ("Entered");
	}

	// invoked when the mouse exits a component
	public void mouseExited (MouseEvent e) {
		System.out.println ("Exited");
		//e.translatePoint (100, 100);
	}

	// invoked when a mouse button has been released on a component
	public void mouseReleased (MouseEvent e) {
		System.out.println ("Released");
	}
}
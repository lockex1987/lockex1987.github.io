package awt;

import java.awt.*;
import java.awt.event.*;

public class CursorDemo extends Frame {
	private static final int[] TYPE = {
		Frame.DEFAULT_CURSOR,
		Frame.CROSSHAIR_CURSOR,
		Frame.TEXT_CURSOR,
		Frame.WAIT_CURSOR,
		Frame.HAND_CURSOR,
		Frame.MOVE_CURSOR,
		Frame.N_RESIZE_CURSOR,
		Frame.NE_RESIZE_CURSOR,
		Frame.E_RESIZE_CURSOR,
		Frame.SE_RESIZE_CURSOR,
		Frame.S_RESIZE_CURSOR,
		Frame.SW_RESIZE_CURSOR,
		Frame.W_RESIZE_CURSOR,
		Frame.NW_RESIZE_CURSOR
	}; // 14 types

	public CursorDemo() {
		super("Cursor Demo");
		this.setSize(200, 200);
		this.setVisible(true);
		this.setCursor(TYPE[13]);
		this.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we) {
				System.exit(0);
			}
		});
	}

	public static void main(String[] args) {
		new CursorDemo();
	}
}
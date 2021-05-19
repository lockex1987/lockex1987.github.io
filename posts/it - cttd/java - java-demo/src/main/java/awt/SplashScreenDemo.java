package awt;

import java.awt.*;
import java.awt.event.*;

public class SplashScreenDemo extends Frame {
	public SplashScreenDemo() {
		super("SplashScreen demo");
		this.setSize(300, 200);
		this.setLayout(new BorderLayout());
		Menu menu = new Menu("File");
		MenuItem menuItem = new MenuItem("Exit");
		menu.add(menuItem);
		menuItem.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ae) {
				System.exit(0);
			}
		});
		this.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				e.getWindow().dispose();
			}
		});

		MenuBar menuBar = new MenuBar();
		this.setMenuBar(menuBar);
		menuBar.add(menu);
		SplashScreen splash = SplashScreen.getSplashScreen();
		Graphics2D g = splash.createGraphics();
		for (int i = 0; i < 100; i++) {
			renderSplashFrame(g, i);
			splash.update();
			try {
				Thread.sleep(90);
			} catch (InterruptedException e) {
				// do nothing
			}
		}
		splash.close();
		this.setVisible(true);
		this.toFront();
	}

	private void renderSplashFrame(Graphics2D g, int frame) {
		final String[] comps = { "foo", "bar", "baz" };
		g.setComposite(AlphaComposite.Clear);
		g.fillRect(120, 140, 200, 40);
		g.setPaintMode();
		g.setColor(Color.BLACK);
		g.drawString("Loading " + comps[(frame / 5) % 3] + "...", 120, 150);
	}

	public static void main(String args[]) {
		SplashScreenDemo test = new SplashScreenDemo();
	}
}
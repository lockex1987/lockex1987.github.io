package awt;

import java.awt.*;
import java.awt.image.*;
import java.awt.event.*;
import java.util.*;
import javax.swing.*;

//Su dung JFrame bi flick la sao?
public class MemoryImageSourceDemo1 extends Frame implements Runnable {
	private Graphics graphics;
	private Image screen;
	private Image image;
	private int x, y;
	private int w, h;
	Random random = new Random();
	int pix[];
	MemoryImageSource source;

	public MemoryImageSourceDemo1() {
		this.setSize(800,  800);

		this.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we) {
				System.exit(0);
			}
		});
		this.addMouseMotionListener(new MouseMotionAdapter() {
			public void mouseMoved(MouseEvent me) {
				x = me.getX();
				y = me.getY();
			}
		});

		w = this.getWidth();
		h = this.getHeight();
		pix = new int[w * h];
		int index = 0;
		for (int i = 0; i < h; i++) {
			int red = (i * 255) / (h - 1);
			for (int j = 0; j < w; j++) {
				int blue = (j * 255) / (w - 1);
				pix[index++] = (255 << 24) | (red << 16) | blue;
			}
		}
		source = new MemoryImageSource(w, h, pix, 0, w);
		source.setAnimated(true);
		//source.setFullBufferUpdates(false);
		image = this.createImage(source);

		this.setVisible(true);
		screen = this.createImage(this.getWidth(), this.getHeight());
		graphics = screen.getGraphics();
	}

	public void run() {
		while (true) {
			try {
				Thread.sleep(20);
			} catch (Exception e) {
				e.printStackTrace();
			}
			for (int i = 1; i < h - 1; i++) {
				for (int j = 1; j < w - 1; j++) {
					pix[i * w + j] = (pix[(i - 1) * w + j] + pix[(i + 1) * w + j] + pix[i * w + j - 1] + pix[i * w + j - 1]) / 4;
				}
			}
			source.newPixels();
			repaint();
			//System.out.println("Repaint");
		}
	}

	public void paint(Graphics g) {
		g.setColor(Color.BLACK);
		g.fillRect(0, 0, getWidth(), getHeight());
		g.drawImage(image, 0, 0, this);
	}

	public void update(Graphics g) {
		paint(graphics);
		g.drawImage(screen, 0, 0, this);
	}

	public static void main(String[] args) {
		new Thread(new MemoryImageSourceDemo()).start();
	}
}
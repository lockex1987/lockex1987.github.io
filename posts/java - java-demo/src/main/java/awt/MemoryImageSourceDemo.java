package awt;

import java.awt.*;
import java.awt.image.*;
import java.awt.event.*;

public class MemoryImageSourceDemo extends Frame implements Runnable {
	
	private Image image;
	private MemoryImageSource source;
	private int width = 300, height = 300;
	private int pixel[] = new int[width*height];;
	private int x, y;
	int index = 0;
	private Graphics graphics;
	private Image screen;

	public MemoryImageSourceDemo() {
		setSize(width, height);
		setVisible(true);
		addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we) {
				System.exit(1);
			}
		});
		int red, blue, green;
		index = 0;
		for(y = 0; y < height; y++) {
			red = (y*255)/(height-1); //0->225
			for(x = 0; x < width; x++) {
				//blue = (x*255)/(width-1); //0->225
				green = (x*255)/(width-1); //0->225
				//pixel[index++] = (255<<24) | (red<<16) | blue;
				pixel[index++] = (192<<24) | (red<<16) | (green<<8);
			}
		}

		source = new MemoryImageSource(width, height, pixel, 0, width);
		source.setAnimated(true);
		image = createImage(source);
		screen = createImage(getWidth(), getHeight());
		graphics = screen.getGraphics();
		new Thread(this).start();
		
	}

	public void paint(Graphics g) {
		g.setColor(getBackground());
		g.fillRect(0, 0, getWidth(), getHeight());
		g.drawImage(image, 0, 0, this);
	}

	public void update(Graphics g) {
		paint(graphics);
		g.drawImage(screen, 0, 0, this);
	}

	public void run() {
		/*
		index = 0;
		for(y = 0; y < height; y+=2)
		for(x = 0; x < width; x+=2) {
			
			try {
				Thread.sleep(1);
			}
			catch( InterruptedException e ) {
			}
			// Modify the values in the pixels array at (x, y, w, h)
			// Send the new data to the interested ImageConsumers
			pixel[y*width+x] = 225<<24;
			//source.newPixels(x, y, width, height);
			source = new MemoryImageSource(width, height, pixel, 0, width);
			repaint();
		}
		
		*/
	}

	public static void main(String[] args) {
		new MemoryImageSourceDemo();
	}
}
//RGB model 0x-AAAA-RRRR-GGGG-BBBB
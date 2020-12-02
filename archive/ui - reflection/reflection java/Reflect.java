import java.awt.*;
import java.awt.image.*;
import java.io.*;
import javax.imageio.*;
import javax.swing.*;

public class Reflect extends JComponent {
	private BufferedImage image;
	private BufferedImage reflection;
	private int imageWidth;
	private int imageHeight;

	public Reflect(float opacity, float fadeHeight) {
		try {
			image = ImageIO.read(new File("reflect.jpg"));
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		imageWidth = image.getWidth();
		imageHeight = image.getHeight();
		
		//float opacity = 0.4f;
		//float fadeHeight = 0.3f;
		reflection = new BufferedImage(imageWidth, imageHeight, BufferedImage.TYPE_INT_ARGB);
		Graphics2D rg = reflection.createGraphics();
		rg.drawRenderedImage(image, null);
		//rg.drawImage(image, 0, 0, imageWidth, (int)(imageHeight * 0.6), this);
		rg.setComposite(AlphaComposite.getInstance(AlphaComposite.DST_IN));
		rg.setPaint(new GradientPaint(0, imageHeight * fadeHeight, new Color(0.0f, 0.0f, 0.0f, 0.0f), 0, imageHeight, new Color(0.0f, 0.0f, 0.0f, opacity)));
		rg.fillRect(0, 0, imageWidth, imageHeight);
		rg.dispose();
	}

	public void paintComponent(Graphics g) {
		Graphics2D g2d = (Graphics2D)g;
		int width = this.getWidth();
		int height = this.getHeight();

		g2d.setPaint(new GradientPaint(0, 0, Color.black, 0, height, Color.darkGray));
		g2d.fillRect(0, 0, width, height);

		g2d.translate((width - imageWidth) / 2, height / 2 - imageHeight);
		g2d.drawRenderedImage(image, null);
		g2d.translate(0, 2 * imageHeight);
		g2d.scale(1, -1);
		g2d.drawRenderedImage(reflection, null);
	}

	public Dimension getPreferredSize() {
		return new Dimension(500, 500);
	}

	public static void main(String args[]) {
		JFrame f = new JFrame();
		f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		Reflect r = new Reflect(Float.parseFloat(args[0]), Float.parseFloat(args[1]));
		f.getContentPane().add(r);
		f.pack();
		f.setVisible(true);
	}
}
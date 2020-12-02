
import java.util.*;
import java.awt.*;
import java.awt.event.*;
import java.applet.*;
import javax.swing.*;
import javax.imageio.*;
import java.io.*;
import java.awt.image.*;

// Convert to JavaScript
public class ElapsingTime extends Frame {

	private static int MONTH[] = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

	private BufferedImage image;
	private String today;
	private String dest;
	private String remain;

	public ElapsingTime() {
		super("Elapsing Time");
		try {
			image = ImageIO.read(new File("images/ElapsingTime.jpg"));
		} catch (Exception e) {
			e.printStackTrace();
		}

		Calendar calendar = Calendar.getInstance();
		int d1, m1, d2 = 24, m2 = 7, year, n;
		d1 = calendar.get(Calendar.DAY_OF_MONTH);
		m1 = calendar.get(Calendar.MONTH);
		year = calendar.get(Calendar.YEAR);
		if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
			MONTH[1] = 29;
		}
		n = -d1 + d2;
		for (int i = m1; i < m2; i++) {
			n += MONTH[i];
		}

		today = String.valueOf(d1) + ":" + String.valueOf(m1 + 1) + ":" + String.valueOf(year);
		dest = String.valueOf(d2) + ":" + String.valueOf(m2 + 1) + ":" + String.valueOf(year);
		remain = String.valueOf(n) + " day" + ((n > 1) ? "s" : "") + " left...";

		setSize(465, 320);
		setLocation(200, 100);
		setResizable(false);
		setVisible(true);
		addWindowListener(new WindowAdapter() {

			@Override
			public void windowClosing(WindowEvent we) {
				System.exit(1);
			}
		});

		Applet.newAudioClip(ClassLoader.getSystemResource("media/ElapsingTime.mid")).loop();
	}

	public void paint(Graphics g) {
		g.drawImage(image, 0, 0, this);
		g.setColor(Color.BLUE);
		g.setFont(new Font("SansSerif", Font.PLAIN, 9));
		g.drawString(today, 10, 40);
		g.drawString(dest, 10, 55);

		g.setColor(Color.RED);
		g.setFont(new Font("DialogInput", Font.BOLD, 17));
		g.drawString(remain, 10, 80);

		//g.setColor(Color.ORANGE);
		g.setColor(Color.BLUE);
		g.setFont(new Font("Monospaced", Font.ITALIC, 12));
		g.drawString("Đừng nói câu \"giá như ...\"", 200, 285);
		g.drawString("mà hãy nói câu \"lần sau ...\"", 220, 300);
	}

	public static void main(String[] args) {
		new ElapsingTime();
	}
}

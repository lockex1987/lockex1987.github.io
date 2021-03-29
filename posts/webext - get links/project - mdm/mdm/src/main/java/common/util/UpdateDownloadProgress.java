package common.util;

import java.awt.Component;
import java.awt.FlowLayout;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JProgressBar;

public class UpdateDownloadProgress {

	public static void main(String[] args) {
		String url = "http://file.allitebooks.com/20160104/Linux%20Shell%20Scripting%20Essentials.pdf";
		String path = Constants.OUTPUT_FOLDER + "temp.pdf";

		JFrame frm = new JFrame();
		JProgressBar bar = new JProgressBar(0, 100);
		bar.setSize(50, 50);
		bar.setValue(0);
		bar.setStringPainted(true);
		frm.add(bar);
		frm.setVisible(true);
		frm.setLayout(new FlowLayout());
		frm.setSize(400, 200);
		frm.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		try {
			HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();
			int size = con.getContentLength();
			float data = 0;
			BufferedInputStream in = new BufferedInputStream(con.getInputStream());
			BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(path), 1024);
			byte[] buf = new byte[1024];
			int n = 0;
			while ((n = in.read(buf, 0, 1024)) >= 0) {
				data = data + n;
				out.write(buf, 0, n);
				float percent = (data * 100) / size;
				bar.setValue((int) percent);
			}
			out.close();
			in.close();
		} catch (Exception e) {
			JOptionPane.showConfirmDialog((Component) null, e.getMessage(), "Error", JOptionPane.DEFAULT_OPTION);
		}
	}
}

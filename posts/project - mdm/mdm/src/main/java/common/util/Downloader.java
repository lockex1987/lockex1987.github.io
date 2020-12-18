package common.util;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.RandomAccessFile;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Downloader {

	// Browser User Agent
	//public static final String USER_AGENT = "Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:45.0) Gecko/20100101 Firefox/45.0";
	public static final String USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/71.0.3578.80 Chrome/71.0.3578.80 Safari/537.36";

	public static long downloadFileNio(String url, String path) throws IOException {
		System.out.println(url + " -> " + path);
		// System.setProperty("http.agent", USER_AGENT);
		ReadableByteChannel in = Channels.newChannel(new URL(url.replace(" ", "%20")).openStream());
		FileOutputStream out = new FileOutputStream(path);
		long transferredBytes = out.getChannel().transferFrom(in, 0, Long.MAX_VALUE);
		in.close();
		out.close();
		return transferredBytes;
	}

	public static long downloadFile(String url, String path) throws IOException {
		File outputFile = new File(path);
		// Khong ghi de file cu
		if (outputFile.exists()) {
			log.info(path + " already exists");
			return 0;
		} else {
			log.info(url + " -> " + path);
			
			// Code to download to buffer
			URLConnection con = new URL(url).openConnection();
			con.setRequestProperty("User-Agent", USER_AGENT);
			//log.info("ABC");

			InputStream in = new BufferedInputStream(con.getInputStream());
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			byte[] buf = new byte[1024];
			int n = 0;
			while (-1 != (n = in.read(buf))) {
				out.write(buf, 0, n);
			}
			out.close();
			in.close();
			byte[] response = out.toByteArray();

			// Write to local file
			FileOutputStream fos = new FileOutputStream(path);
			fos.write(response);
			fos.close();

			return response.length;
		}
	}

	public static int download(String remoteFile, String localPath, int noOfParts) throws MalformedURLException {
		URL url = new URL(remoteFile);

		// Get file's size
		int total = getFileSize(url);
		if (total == -1) {
			log.error("File size not returned by server");
			return -2;
		}

		// Create local file
		File file = new File(localPath);
		if (!createEmptyFile(file, total)) {
			log.error(String.format("Could not create output file (%s). Check space and permissions.", localPath));
			return -3;
		}

		// Make parts
		Thread[] threads = new Thread[noOfParts];
		int bytesPerThread = total / noOfParts;
		int firstByte = 0;
		int lastByte;
		for (int i = 0; i < noOfParts; i++) {
			lastByte = (i == noOfParts - 1) ? total - 1 : firstByte + bytesPerThread;

			Thread t = createDownloadPart(remoteFile, i, firstByte, lastByte, url, file);
			t.start();
			threads[i] = t;

			firstByte = lastByte + 1;
		}
		for (Thread t : threads) {
			try {
				t.join();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}

		log.info(remoteFile + " -> " + localPath);
		return total;
	}

	public static String extractFile(String url) {
		int idx = url.lastIndexOf("/");
		String file = url.substring(idx + 1);
		idx = file.indexOf("?");
		if (idx >= 0) {
			file = file.substring(0, idx);
		}
		return file.replace("%20", " ");
	}

	public static String getJson(String url) throws Exception {
		URLConnection con = new URL(url).openConnection();
		con.setRequestProperty("User-Agent", USER_AGENT);
		BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
		StringBuilder json = new StringBuilder();
		String s;
		while ((s = br.readLine()) != null) {
			json.append(s.trim());
		}
		return json.toString();
	}

	public static BufferedReader readUrl(String url) throws Exception {
		URLConnection con = new URL(url).openConnection();
		con.setRequestProperty("User-Agent", USER_AGENT);
		BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
		return br;
	}

	public static int getFileSize(URL url) {
		try {
			URLConnection connection = url.openConnection();
			connection.setRequestProperty("User-Agent", USER_AGENT);
			return connection.getContentLength();
		} catch (Exception ex) {
			ex.printStackTrace();
			return -1;
		}
	}

	public static boolean isSupportMultiPartDownload(URL url) {
		try {
			URLConnection connection = url.openConnection();
			connection.setRequestProperty("Range", "bytes=0-127");
			int count = connection.getContentLength();
			return (count == 128);
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

	private static boolean createEmptyFile(File file, long size) {
		try (RandomAccessFile raf = new RandomAccessFile(file, "rw")) {
			raf.setLength(size);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	private static void downloadPart(URL url, File file, int firstByte, int lastByte) throws IOException {
		URLConnection connection = url.openConnection();
		connection.setRequestProperty("User-Agent", USER_AGENT);
		connection.setRequestProperty("Range", "bytes=" + firstByte + "-" + lastByte);
		InputStream is = connection.getInputStream();
		RandomAccessFile raf = new RandomAccessFile(file, "rw");
		raf.seek(firstByte);
		byte[] b = new byte[1024 * 4];
		int n;
		while ((n = is.read(b)) != -1) {
			raf.write(b, 0, n);
		}
		raf.close();
		is.close();
	}

	private static Thread createDownloadPart(String fileId, int partId, int firstByte, int lastByte, URL url,
			File file) {
		Thread t = new Thread(() -> {
			int noOfTry = 4;
			int finished = 0;
			while (finished < noOfTry) {
				try {
					downloadPart(url, file, firstByte, lastByte);
					finished = noOfTry;
				} catch (Exception e) {
					log.info(String.format("Try to download again %s-%d (%d)\n", fileId, partId, finished));
					finished++;
				}
			}
		});
		return t;
	}
	
public static Document jsoup(String url) throws Exception {
		
		return Jsoup.connect(url)
				.userAgent(USER_AGENT)
				.timeout(10 * 1000)
				.get();
	}
}

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
}

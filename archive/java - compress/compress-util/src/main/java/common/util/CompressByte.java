package common.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

/**
 * Using Deflater and Inflater
 * 
 * @author locke
 */
public class CompressByte {

	public static byte[] compress(byte[] data) throws IOException {
		Deflater deflater = new Deflater();
		deflater.setInput(data);
		ByteArrayOutputStream baos = new ByteArrayOutputStream(data.length);
		deflater.finish();

		byte[] buffer = new byte[1024];
		int count;
		while (!deflater.finished()) {
			count = deflater.deflate(buffer);
			baos.write(buffer, 0, count);
		}
		baos.close();

		byte[] output = baos.toByteArray();
		return output;
	}

	public static byte[] decompress(byte[] data) throws IOException, DataFormatException {
		Inflater inflater = new Inflater();
		inflater.setInput(data);

		ByteArrayOutputStream baos = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		int count;
		while (!inflater.finished()) {
			count = inflater.inflate(buffer);
			baos.write(buffer, 0, count);
		}
		baos.close();

		byte[] output = baos.toByteArray();
		return output;
	}
}

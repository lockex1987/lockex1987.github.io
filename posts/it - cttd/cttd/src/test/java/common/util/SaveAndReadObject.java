package common.util;

import static org.junit.Assert.*;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import org.junit.Test;

/**
 * Using GZIP
 * You can use with file or socket
 * 
 * @author locke
 */
public class SaveAndReadObject {

	@Test
	public void testSaveAndReadObject() throws Exception {
		final String FILE_PATH = "target/db";

		// Create an object
		// We can use complicated object
		String oldObj = "S. Jordan";

		// Save the object
		FileOutputStream fos = new FileOutputStream(FILE_PATH);
		GZIPOutputStream gos = new GZIPOutputStream(fos);
		ObjectOutputStream oos = new ObjectOutputStream(gos);

		oos.writeObject(oldObj);

		oos.close();
		gos.close();
		fos.close();

		// Read the object
		FileInputStream fis = new FileInputStream(FILE_PATH);
		GZIPInputStream gis = new GZIPInputStream(fis);
		ObjectInputStream ois = new ObjectInputStream(gis);

		String newObj = (String) ois.readObject();

		ois.close();
		gis.close();
		fis.close();

		// Display the object
		System.out.println(newObj);

		assertEquals(oldObj, newObj);
	}
}

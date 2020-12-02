package io;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.input.TeeInputStream;
import org.apache.commons.io.input.XmlStreamReader;

public final class InputExample {

	private static final String XML_PATH = "/data/workspace/eclipse/ApacheCommon/InputOutputExampleFolder/web.xml";
	private static final String INPUT = "This should go to the output.";

	public static void runExample() {
		System.out.println("Input example...");
		XmlStreamReader xmlReader = null;
		TeeInputStream tee = null;

		try {
			// XmlStreamReader
			// We can read an xml file and get its encoding.
			File xml = FileUtils.getFile(XML_PATH);
			xmlReader = new XmlStreamReader(xml);
			System.out.println("XML encoding: " + xmlReader.getEncoding());

			// TeeInputStream
			// This very useful class copies an input stream to an output stream
			// and closes both using only one close() method (by defining the 3rd
			// constructor parameter as true).
			ByteArrayInputStream in = new ByteArrayInputStream(INPUT.getBytes("US-ASCII"));
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			tee = new TeeInputStream(in, out, true);
			tee.read(new byte[INPUT.length()]);
			System.out.println("Output stream: " + out.toString());
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				xmlReader.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			try {
				tee.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
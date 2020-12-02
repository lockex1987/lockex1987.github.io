package lang;

import java.util.Properties;
import static java.lang.System.*;
import static java.lang.Thread.*;

public class SystemDemo {

	public static void main(String[] args) {
		testExecutionTime();
	}

	private static void testExecutionTime() {
		long t1, t2;
		t1 = currentTimeMillis();
		try {
			sleep(123);
		} catch (InterruptedException ie) {
			// Do nothing
		}
		t2 = currentTimeMillis();
		out.println((t2 - t1) + " millis");
		gc();
		exit(0);
	}

	private static void testGetProperty() {

//		out.println(getProperty("java.class.path"));
//		out.println(getProperty("java.home"));
//		out.println(getProperty("java.class.version"));
//		out.println(getProperty("java.specification.vendor"));
//		out.println(getProperty("java.specification.version"));
//		out.println(getProperty("java.vendor"));
//		out.println(getProperty("java.vendor.url"));
//		out.println(getProperty("java.version"));
//		out.println(getProperty("java.vm.name"));
//		out.println(getProperty("user.dir"));
//		out.println(getProperty("user.name"));
//		out.println(getProperty("os.name"));
//		Properties properties = getProperties();
//		properties.list(System.out);
//		out.print("\0007");
//		out.flush();
	}
}

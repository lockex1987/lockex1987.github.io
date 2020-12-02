package common.util;

public class SystemOutLogger implements Logger {

	public SystemOutLogger() {
	}

	public void debug(String message) {
		System.out.println(message);
	}

	public void info(String message) {
		System.out.println(message);
	}

	public void warn(String message) {
		System.out.println(message);
	}

	public void error(String message) {
		System.out.println(message);
	}

	public void error(String message, Throwable t) {
		System.out.println(message);
		t.printStackTrace();
	}

	public void fatal(String message) {
		System.out.println(message);
	}
}

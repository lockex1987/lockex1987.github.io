package common.util;

public class Log4jLogger implements Logger {

	private org.apache.log4j.Logger logger;

	public Log4jLogger(org.apache.log4j.Logger logger) {
		this.logger = logger;
	}

	public void debug(String message) {
		logger.debug(message);
	}

	public void info(String message) {
		logger.info(message);
	}

	public void warn(String message) {
		logger.warn(message);
	}

	public void error(String message) {
		logger.error(message);
	}

	public void error(String message, Throwable t) {
		logger.error(message, t);
	}

	public void fatal(String message) {
		logger.fatal(message);
	}
}

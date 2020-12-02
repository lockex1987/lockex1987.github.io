package common.util;

public class LoggerFactory {

	// TODO: Quet file cau hinh
	// Neu co thi thiet lap theo cau hinh
	// Con khong thi mac dinh dung System.out
	private static String loggerType;

	public static Logger getLogger(Class clazz) {
		if (loggerType == null) {
			return getSystemOut();
		} else if (loggerType.equals("log4j")) {
			return getLog4jLogger(clazz);
//		} else if (loggerType.equals("logback")) {
//			return getLogbackLogger(clazz);
		} else {
			return getSystemOut();
		}
	}

	private static Logger getLog4jLogger(Class clazz) {
		org.apache.log4j.Logger logger = org.apache.log4j.Logger.getLogger(clazz);
		return new Log4jLogger(logger);
	}

//	private static Logger getLogbackLogger(Class clazz) {
//		org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(clazz);
//		return new LogbackLogger(logger);
//	}

	private static Logger getSystemOut() {
		return new SystemOutLogger();
	}
}

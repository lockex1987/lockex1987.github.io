package common.util;

import org.junit.Test;

public class LoggerTests {

	private static final Logger LOGGER = LoggerFactory.getLogger(LoggerTests.class);

	@Test
	public void testLogger() {
		LOGGER.debug("This is debug");
		LOGGER.info("This is info");
		LOGGER.warn("This is warn");
		try {
			double n = 1 / 0;
		} catch (Exception ex) {
			LOGGER.error("This is error", ex);
		}
		LOGGER.fatal("This is fatal");
	}
}

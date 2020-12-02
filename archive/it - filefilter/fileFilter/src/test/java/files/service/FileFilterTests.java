package files.service;

import org.junit.Test;

public class FileFilterTests {

	private final FileFilter fileFilter = new FileFilter();

	@Test
	public void getListFromInputFileTest() throws Exception {
		fileFilter.getListFromInputFile("changes.txt");
	}
}

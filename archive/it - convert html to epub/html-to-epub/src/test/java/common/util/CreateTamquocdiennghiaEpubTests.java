package common.util;

import org.junit.Test;

public class CreateTamquocdiennghiaEpubTests {

	@Test
	public void testProcess() throws Exception {
		CreateTamquocdiennghiaEpub obj = new CreateTamquocdiennghiaEpub();
		int startChapter = 5;
		int endChapter = 20;
		for (int number = startChapter; number <= endChapter; number++) {
			obj.process(number);
		}
		System.out.println("Done");
	}
}

package io.cttd;

import java.io.File;

import org.junit.Ignore;
import org.junit.Test;

public class IndexFileTests {

	@Test
	@Ignore
	public void testGetTitleAndDescription() {
		String indexFilePath = "../index.html";
		IndexFile indexFile = new IndexFile(indexFilePath);
		String title = indexFile.getTitle();
		String description = indexFile.getDescription();

		System.out.println("title: " + title);
		System.out.println("description: " + description);
	}

	@Test
	@Ignore
	public void testCreateFile() {
		IndexFile indexFile = new IndexFile("../index.html");
		if (!indexFile.existsIndexFile()) {
			indexFile.createDefaultIndexFile();
			System.out.println("File created");
		}
	}
	
	@Test
	public void testProcessMetaViewport() {
		//String path = "../index.html";
		String path = "../../animation - disintegrate (card explode)/index.html";
		IndexFile indexFile = new IndexFile(path);
		
		
	}
}

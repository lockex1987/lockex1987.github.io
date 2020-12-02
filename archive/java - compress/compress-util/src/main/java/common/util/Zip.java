package common.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Zip {

	// Absolute path to source folder
	private String sourceDir;
	// Entry list (relative to the source folder)
	private List<String> fileList;

	public Zip(String sourceDir, String archive) {
		this(sourceDir, archive, "");
	}

	public Zip(String sourceDir, String archive, String prefix) {
		fileList = new ArrayList<>();

		File root = new File(sourceDir);
		this.sourceDir = root.getAbsolutePath() + "/";
		generateFileList(root);
		zipIt(archive, prefix);
	}

	/**
	 * Traverse a directory and get all files, and add the file into fileList
	 *
	 * @param node
	 *          File or directory
	 */
	private void generateFileList(File node) {
		if (node.isFile()) {
			fileList.add(generateZipEntry(node.getAbsolutePath()));
		} else {
			File[] files = node.listFiles();
			for (File f : files) {
				generateFileList(f);
			}
		}
	}

	/**
	 * Format the file path for zip
	 *
	 * @param filePath
	 *          File path
	 * @return Formatted file path
	 */
	private String generateZipEntry(String filePath) {
		return filePath.substring(sourceDir.length(), filePath.length());
	}

	/**
	 * Zip it
	 *
	 * @param archive
	 *          output ZIP file location
	 */
	private void zipIt(String archive, String prefix) {
		try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(archive))) {
			for (String file : fileList) {
				//log.debug("File added: " + file);
				ZipEntry ze = new ZipEntry(prefix + file);
				zos.putNextEntry(ze);
				FileInputStream fis = new FileInputStream(sourceDir + file);
				int count;
				byte[] buffer = new byte[1024];
				while ((count = fis.read(buffer)) > 0) {
					zos.write(buffer, 0, count);
				}
				fis.close();
				// zos.closeEntry();
			}
			zos.close();
			//log.debug("Done: " + archive);
		} catch (IOException ex) {
			log.error("Error when zip file", ex);
		}
	}
}

package common.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Unzip {

	public static void unzip(String archive, UnzipOperator op) {
		try (ZipFile zf = new ZipFile(archive)) {
			Enumeration<? extends ZipEntry> entries = zf.entries();
			while (entries.hasMoreElements()) {
				ZipEntry ze = entries.nextElement();
				InputStream is = zf.getInputStream(ze);
				op.read(ze, is);
			}
		} catch (IOException ex) {
			log.error("Error when unzipping archive", ex);
		}
	}

	public static void unzipSequentially(String archive, UnzipSequentiallyOperator op) {
		try (ZipInputStream zis = new ZipInputStream(new FileInputStream(archive))) {
			ZipEntry ze;
			while ((ze = zis.getNextEntry()) != null) {
				op.read(ze, zis);
			}
		} catch (IOException ex) {
			log.error("Error when unzipping archive sequentially", ex);
		}
	}

	public static void extract(String archive, String destination) {
		File arch = new File(archive);
		File dest = new File(destination);
		extract(arch, dest);
	}

	public static void extract(File archive, File destination) {
		UnzipSequentiallyOperator op = (ze, zis) -> {
			File newFile = new File(destination, ze.getName());
			log.debug("Unzipping: " + newFile.getAbsoluteFile());

			// Create all non exists folders
			File parent = newFile.getParentFile();
			if (!parent.exists()) {
				parent.mkdirs();
			}

			if (ze.isDirectory()) {
				newFile.mkdir();
			} else {
				try (FileOutputStream fos = new FileOutputStream(newFile)) {
					int count;
					byte[] buffer = new byte[1024];
					while ((count = zis.read(buffer)) > 0) {
						fos.write(buffer, 0, count);
					}
				} catch (IOException ex) {
					log.error("Error when writting file to disk", ex);
				}
			}
		};

		unzipSequentially(archive.getAbsolutePath(), op);
	}
}

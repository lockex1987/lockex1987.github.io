package common.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import com.github.junrar.Archive;
import com.github.junrar.exception.RarException;
import com.github.junrar.rarfile.FileHeader;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Unrar {

	public static void extract(String archive, String destination) {
		File arch = new File(archive);
		File dest = new File(destination);
		extract(arch, dest);
	}

	public static void extract(File archive, File destination) {
		Archive arch = null;
		try {
			arch = new Archive(archive);
		} catch (RarException | IOException e) {
			log.error("Loi extract", e);
		}

		if (arch == null) {
			log.warn("Archive is null");
			return;
		}

		if (arch.isEncrypted()) {
			log.warn("Archive is encrypted cannot extract");
			return;
		}

		FileHeader fh;
		while ((fh = arch.nextFileHeader()) != null) {
			if (fh.isEncrypted()) {
				log.warn("File is encrypted cannot extract: " + fh.getFileNameString());
				continue;
			}

			log.debug("Extracting: " + fh.getFileNameString());
			try {
				String name = fh.isUnicode() ? fh.getFileNameW() : fh.getFileNameString();
				name = normalizeFileName(name);
				
				File newFile = new File(destination, name);

				// Create all non exists folders
				File parent = newFile.getParentFile();
				if (!parent.exists()) {
					parent.mkdirs();
				}
				
				if (fh.isDirectory()) {
					newFile.mkdir();
				} else {
					OutputStream fos = new FileOutputStream(newFile);
					arch.extractFile(fh, fos);
					fos.close();
				}
			} catch (RarException | IOException e) {
				log.error("Error extracting the file", e);
			}
		}
	}

	private static String normalizeFileName(String name) {
		return name.replace("\\", "/");
	}
}

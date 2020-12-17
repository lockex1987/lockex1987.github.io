package common.util;

import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public interface UnzipSequentiallyOperator {

	void read(ZipEntry ze, ZipInputStream zis);
}

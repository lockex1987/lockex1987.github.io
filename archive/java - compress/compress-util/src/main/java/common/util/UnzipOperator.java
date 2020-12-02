package common.util;

import java.io.InputStream;
import java.util.zip.ZipEntry;

public interface UnzipOperator {

	void read(ZipEntry ze, InputStream is);
}

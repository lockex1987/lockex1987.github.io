package common.doc.demo;

import java.io.File;

import org.artofsolving.jodconverter.OfficeDocumentConverter;
import org.artofsolving.jodconverter.office.DefaultOfficeManagerConfiguration;
import org.artofsolving.jodconverter.office.OfficeManager;
import org.artofsolving.jodconverter.process.LinuxProcessManager;
import org.artofsolving.jodconverter.process.ProcessManager;
import org.artofsolving.jodconverter.process.PureJavaProcessManager;
import org.artofsolving.jodconverter.util.PlatformUtils;

public class OpenOfficeConverter {

	// Đường dẫn cài đặt OpenOffice (hoặc LibreOffice)
	//private static final String OFFICE_HOME = "C:/Program Files (x86)/LibreOffice 5/";
	//private static final String OFFICE_HOME = "/usr/lib/libreoffice/";
	private static final String OFFICE_HOME = "/opt/libreoffice5.4/";

	// Cổng của service
	private static final int OFFICE_PORT = 8100;

	// Đối tượng quản lý việc kết nối đến Open Office
	private static OfficeManager officeManager;

	// Đối tượng để convert
	private static OfficeDocumentConverter documentConverter;

	public static void init() {
		DefaultOfficeManagerConfiguration configuration = new DefaultOfficeManagerConfiguration();
		configuration.setOfficeHome(new File(OFFICE_HOME));
		configuration.setPortNumber(OFFICE_PORT);

		// Không sử dụng Sigar (bị lỗi tùm lum)
		// Chạy Sigar thì lại phải copy thêm file DLL (Windows) hoặc file SO (Linux)
		// Tương tự hàm findBestProcessManager của DefaultOfficeManagerConfiguration
		ProcessManager processManager;
		if (PlatformUtils.isLinux()) {
			processManager = new LinuxProcessManager();
		} else {
			processManager = new PureJavaProcessManager();
		}
		configuration.setProcessManager(processManager);

		officeManager = configuration.buildOfficeManager();
		documentConverter = new OfficeDocumentConverter(officeManager);
	}

	/**
	 * Start dịch vụ OpenOffice. Nên chỉ gọi 1 lần và lưu vào một biến toàn cục.
	 */
	public static void startService() {
		if (officeManager != null) {
			init();
			officeManager.start();
		}
	}

	/**
	 * Stop dịch vụ OpenOffice.
	 */
	public static void stopService() {
		if (officeManager != null) {
			officeManager.stop();
		}
	}

	/**
	 * Convert giữa các định dạng.
	 * 
	 * @param inputFile
	 *            File nguồn
	 * @param outputFile
	 *            File đích
	 */
	public static void convert(File inputFile, File outputFile) {
		if (documentConverter == null) {
			init();
			startService();
		}
		documentConverter.convert(inputFile, outputFile);
	}
}

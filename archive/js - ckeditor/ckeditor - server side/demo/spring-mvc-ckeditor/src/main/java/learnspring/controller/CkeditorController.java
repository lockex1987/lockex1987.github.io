package learnspring.controller;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class CkeditorController {

	// Lưu file upload vào thư mục này trên server
	private static String UPLOAD_FOLDER = "D:/new/upload/";

	// Đường dẫn URL đến thư mục chứa các file upload
	private static String UPLOAD_PATH = "http://localhost:8080/spring-mvc-ckeditor/static/";

	/**
	 * Upload bởi hộp thoại.
	 * Khi thêm tùy chọn filebrowserUploadUrl thì các hộp thoại của Link, Image,
	 * HTML5 Video, HTML5 Audio sẽ thêm mục upload.
	 * 
	 * @param upload
	 *            File upload
	 * @param funcNum
	 *            Hàm của CKEditor
	 * @return Trả về trang, trong trang này cần thực hiện hàm JavaScript
	 */
	@RequestMapping(value = "/upload-by-dialog", method = RequestMethod.POST, produces = MediaType.TEXT_HTML_VALUE)
	@ResponseBody
	public String uploadByDialog(@RequestParam MultipartFile upload,
			@RequestParam(value = "CKEditorFuncNum") String funcNum) throws Exception {
		String newFileName = saveFile(upload);
		String url = UPLOAD_PATH + newFileName;
		return "<script>window.parent.CKEDITOR.tools.callFunction(" + funcNum + ", '" + url + "');</script>";
	}

	/**
	 * Upload bởi drag and drop.
	 * 
	 * @param upload
	 *            File được upload
	 * @return Đối tượng JSON
	 */
	@RequestMapping(value = "/upload-drag-and-drop", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String uploadDragAndDrop(@RequestParam MultipartFile upload) throws Exception {
		String newFileName = saveFile(upload);
		String url = UPLOAD_PATH + newFileName;
		String oldFileName = upload.getOriginalFilename();
		return String.format("{"
				+ " \"uploaded\": 1, "
				+ " \"fileName\": \"%s\", "
				+ " \"url\": \"%s\" "
				+ "}", oldFileName, url);
	}

	/**
	 * Lưu file trên server.
	 * 
	 * @param file
	 *            File được upload
	 * @return Tên file khi lưu trên server
	 */
	private String saveFile(MultipartFile file) throws IOException {
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd hhmmss ");
		String newFileName = dateFormat.format(new Date()) + file.getOriginalFilename();
		file.transferTo(new File(UPLOAD_FOLDER + newFileName));
		return newFileName;
	}
}

/*
 * NVH.
 */
package common.server;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DownloadAction;

import common.util.AttachmentFileUtil;
import common.util.CommonUtils;
import common.util.FileUtil;
import common.util.RequestUtil;
import lombok.extern.slf4j.Slf4j;

/**
 * Download file da duoc upload hoac file bao cao.
 *
 * @author HuyenNV
 */
@Slf4j
public class MyDownloadAction extends DownloadAction {

	private static final String EXPORT_FOLDER = CommonUtils.getConfig("exportFolder");

	@Override
	protected StreamInfo getStreamInfo(ActionMapping mapping, ActionForm form, HttpServletRequest request,
					HttpServletResponse response) throws Exception {
		String fileName = RequestUtil.getParameter(request, "fileName");
		String path;
		if (request.getParameter("type") != null) {
			int type = Integer.parseInt(request.getParameter("type"));
			Long id = Long.parseLong(request.getParameter("id"));
			path = AttachmentFileUtil.UPLOAD_ROOT + AttachmentFileUtil.SUB_FOLDERS[type] + id;
		} else {
			String filePath = RequestUtil.getEncryptedParameter(request, "filePath");
			path = EXPORT_FOLDER + FileUtil.getSafeFileName(filePath);
		}
		File file = new File(path);
		if (file.exists()) {
			//response.setHeader("Content-Type", getServletContext().getMimeType(filename));
			response.setHeader("Content-Length", String.valueOf(file.length()));
			//response.setHeader("Content-Disposition", "inline; filename=\"" + file.getName() + "\"");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
			return new FileStreamInfo("application/octet-stream", file);
		} else {
			log.error("Path: " + file.getAbsolutePath());
			throw new Exception("File not found: " + fileName);
		}
	}

	// Ham nay khong biet de lam gi?
	/*
     @Override
     public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response)
     throws Exception {
     StreamInfo info;
     InputStream stream = null;
     try {
     info = getStreamInfo(mapping, form, request, response);
     String contentType = info.getContentType();
     stream = info.getInputStream();
     response.setContentType(contentType);
     copy(stream, response.getOutputStream());
     } catch (FileNotFoundException e) {
     // Han che in ra nhieu thong tin o log loi, lo duong dan.
     throw new Exception("File not found");
     } finally {
     if (stream != null) {
     stream.close();
     }
     }
     return null;
     }
	 */
}

package common.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class WebExportExcel
//extends ExportExcel
{

	public WebExportExcel(String templateFile) throws Exception {
		//super(templateFile);
	}

	/**
	 * Tra file truc tiep ve client, khong co link download.
	 *
	 * @param fileName
	 *          Ten file
	 * @param resp
	 *          Doi tuong HttpServletResponse
	 */
	public void responseToClient(String fileName, HttpServletResponse resp) throws Exception {
		resp.setContentType("application/vnd.ms-excel");
		resp.setHeader("Cache-Control", "no-cache");
		// resp.setHeader("Content-Disposition", "attachment; filename*=UTF-8''" +
		// URLEncoder.encode(fileName, "UTF-8"));
		resp.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
		ServletOutputStream out = resp.getOutputStream();
		//view.write(out);
		out.flush();
		out.close();
	}

	/**
	 * Ghi ra file Excel.
	 *
	 * @param exportFile
	 *          File Excel xuat ra
	 * @param req
	 *          Doi tuong HttpServletRequest
	 */
	public void exportFile(String exportFile, HttpServletRequest req)
			throws Exception {
		String prefixOutPutFile = new SimpleDateFormat("yyyyMMddHHmmss_").format(new Date()) + "_";
		exportFile = prefixOutPutFile + exportFile;
		String exportFolder = CommonUtils.getConfig("exportFolder");
		//view.write(exportFolder + exportFile + req.getSession().getId());
		req.setAttribute("fileName", exportFile + ".xls");
		req.setAttribute("filePath", exportFile + req.getSession().getId());
	}
}

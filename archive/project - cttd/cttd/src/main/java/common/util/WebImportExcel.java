package common.util;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.upload.FormFile;

import lombok.extern.slf4j.Slf4j;

//import common.bean.ImportResult;

@Slf4j
public class WebImportExcel {

	//private ImportExcel importExcel;

	public WebImportExcel(String filePath, HttpServletRequest req) {
		//importExcel = ImportExcelFactory.initFromXMLFile(filePath, RequestUtil.getLocaleObject(req));
	}

	public boolean validateCommon(HttpServletRequest req, FormFile uploadFile, String fileName, List<Object[]> dataList) {
		//ImportResult importResult = importExcel.validateCommon(saveExcelFile(uploadFile, fileName));
		//return importResult.getReturnCode() == ImportResult.NO_ERROR;
		
		return false;
	}

	private String saveExcelFile(FormFile formFile, String fileName) {
		String oldName = formFile.getFileName().toLowerCase();
		if (!oldName.endsWith(".xls")) {
			log.error("Khong phai file Excel: " + oldName);
			return null;
		} else {
			try {
				String filePath = CommonUtils.getConfig("importFolder") + fileName;
				ServerFileUtil.saveFile(formFile, filePath);
				return filePath;
			} catch (Exception ex) {
				log.error("Error when saving file", ex);
				return null;
			}
		}
	}
}

/*
 * NVH.
 */
package common.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts.upload.FormFile;
import org.hibernate.query.Query;

import common.bean.AttachmentFileBean;
import lombok.extern.slf4j.Slf4j;

/**
 * Tiện ích hỗ trợ việc đính kèm file.
 * Mình tổ chức các file đính kèm ở một thư mục gốc (cấu hình upload_root trong file
 * config.properties).
 * Thư mục gốc này là địa chỉ tuyệt đối, thay đổi mỗi khi triển khai, làm như thế sẽ không phải
 * backup file mỗi khi triển khai lại.
 * Từ thư mục gốc, mình sẽ phân ra các thư mục con (tùy chức năng).
 *
 * @author lockex1987
 */
@Slf4j
public class AttachmentFileUtil {

	public static final String UPLOAD_ROOT = CommonUtils.getConfig("upload_root");
	public static final String[] SUB_FOLDERS = CommonUtils.getConfigList("upload_child_folders");

	public static void saveFile(FormFile formFile, String name, String folderPath) throws Exception {
		File folder = new File(folderPath);
		String filePath = folder.getAbsolutePath() + File.separator + name;
		ServerFileUtil.saveFile(formFile, filePath);
	}

	public static void uploadFiles(Map<String, FormFile> fileMap, Long objId, Integer type, HttpServletRequest req)
			throws Exception {

		List<FormFile> list = new ArrayList<>(fileMap.values());
		for (FormFile f : list) {
			if ((f != null) && !f.getFileName().isEmpty()) {
				// Dua thong tin vao CSDL
				Long id = DBUtil.getSequence("ATTACHMENT_FILE_SEQ");
				AttachmentFileBean bo = new AttachmentFileBean();
				bo.setAttachmentFileId(id);
				bo.setFileName(f.getFileName().trim());
				bo.setType(type);
				bo.setObjectId(objId);
				bo.setFileSize(Long.valueOf(f.getFileSize()));
				DBUtil.save(bo);

				// Tao file tren server
				saveFile(f, String.valueOf(id), UPLOAD_ROOT + SUB_FOLDERS[type]);
			}
		}
	}

	public static List<AttachmentFileBean> getAttachmentList(Integer type, Long objectId) {
		String hql = " FROM AttachmentFileBean af WHERE af.type = ? AND af.objectId = ? ";
		Query query = DBUtil.createQuery(hql);
		query.setParameter(0, type);
		query.setParameter(1, objectId);
		return query.list();
	}

	public static void deleteAttachment(Integer type, String arr) {
		if (arr != null && arr.length() > 2) {
			// Xoa trong CSDL
			String hql = " DELETE FROM AttachmentFileBean af WHERE af.attachmentFileId IN ( " + arr + ")";
			Query query = DBUtil.createQuery(hql);
			query.executeUpdate();

			// Can xoa ca file that
			String[] a = arr.split(",");
			for (String n : a) {
				String path = UPLOAD_ROOT + SUB_FOLDERS[type] + n;
				try {
					File f = new File(path);
					f.delete();
				} catch (Exception ex) {
					log.error("Error when delete file <" + path + ">");
				}
			}
		}
	}

	public static void deleteAttachment(Integer type, Long[] arrId) {
		// Lay danh sach file
		String hql = " SELECT af.attachmentFileId FROM AttachmentFileBean af WHERE af.type = ? AND af.objectId IN (:arrId) ";
		Query query = DBUtil.createQuery(hql);
		query.setParameter(0, type);
		query.setParameterList("arrId", arrId);
		List<Long> list = query.list();

		// Can xoa ca file that
		for (Long n : list) {
			String path = UPLOAD_ROOT + SUB_FOLDERS[type] + n;
			try {
				File f = new File(path);
				f.delete();
			} catch (Exception ex) {
				log.error("Error when delete file <" + path + ">");
			}
		}

		// Xoa trong CSDL
		hql = " DELETE FROM AttachmentFileBean af WHERE af.type = ? AND af.objectId IN (:arrId) ";
		query = DBUtil.createQuery(hql);
		query.setParameter(0, type);
		query.setParameterList("arrId", arrId);
		query.executeUpdate();
	}
}

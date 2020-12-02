/*
 * NVH.
 */
package common.bean;

/**
 * Doi tuong file dinh kem.
 *
 * @author lockex1987
 */
public class AttachmentFileBean {

	private Long attachmentFileId; // ID trong bang
	private String fileName; // Ten file
	private Integer type; // Loai
	private Long objectId; // Doi tuong ma file dinh kem thuoc ve
	private Long fileSize; // Dung luong file

	public AttachmentFileBean() {
	}

	public Long getFileSize() {
		return fileSize;
	}

	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}

	public Long getAttachmentFileId() {
		return attachmentFileId;
	}

	public void setAttachmentFileId(Long attachmentFileId) {
		this.attachmentFileId = attachmentFileId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public Long getObjectId() {
		return objectId;
	}

	public void setObjectId(Long objectId) {
		this.objectId = objectId;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}
}

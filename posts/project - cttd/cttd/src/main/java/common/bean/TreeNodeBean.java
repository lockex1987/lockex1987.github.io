/*
 * NVH.
 */
package common.bean;

import java.util.List;
import org.apache.commons.lang.StringEscapeUtils;

/**
 * Node cay Ajax dong.
 *
 * @author HuyenNV
 */
public class TreeNodeBean {

	private Long key;
	private String title;
	private Long referenceNum;
	private String select;
	private String styleClass;
	private Boolean expand;
	private Boolean activate;

	public TreeNodeBean() {
	}

	public TreeNodeBean(Long key, String title, Long referenceNum) {
		this.key = key;
		this.title = title;
		this.referenceNum = referenceNum;
	}

	public TreeNodeBean(Long key, String title, Long referenceNum, Long select) {
		this.key = key;
		this.title = title;
		this.referenceNum = referenceNum;
		this.select = (select > 0L) ? "true" : "false";
	}

	public Long getKey() {
		return key;
	}

	public void setKey(Long key) {
		this.key = key;
	}

	public Long getReferenceNum() {
		return referenceNum;
	}

	public void setReferenceNum(Long referenceNum) {
		this.referenceNum = referenceNum;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSelect() {
		return select;
	}

	public void setSelect(String select) {
		this.select = select;
	}

	public Boolean getActivate() {
		return activate;
	}

	public void setActivate(Boolean activate) {
		this.activate = activate;
	}

	public Boolean getExpand() {
		return expand;
	}

	public void setExpand(Boolean expand) {
		this.expand = expand;
	}

	public String getStyleClass() {
		return styleClass;
	}

	public void setStyleClass(String styleClass) {
		this.styleClass = styleClass;
	}

	// ==============================================
	/**
	 * Build xau JSON cua mot danh sach node.
	 *
	 * @param nodeList Danh sach node
	 * @return Xau JSON
	 */
	public static String getJsonText(List<TreeNodeBean> nodeList) {
		if (nodeList.isEmpty()) {
			return "[]";
		} else {
			StringBuilder sb = new StringBuilder("[{");
			for (int i = 0; i < nodeList.size(); i++) {
				if (i > 0) {
					sb.append("},{");
				}
				sb.append(getJsonText(nodeList.get(i)));
			}
			sb.append("}]");
			return sb.toString();
		}
	}

	/**
	 * Build xau JSON cua mot node cay.
	 *
	 * @param node Node cay
	 * @return Xau JSON
	 */
	public static String getJsonText(TreeNodeBean node) {
		StringBuilder sb = new StringBuilder("");
		sb.append("\"key\":\"").append(node.getKey()).append("\"");
		sb.append(",\"title\":\"").append(StringEscapeUtils.escapeHtml(node.getTitle()).replace("\\", "\\\\")).append("\"");
		sb.append(",\"addClass\":\"").append(node.getStyleClass()).append("\"");
		sb.append(",\"expand\":" + node.getExpand());
		sb.append(",\"activate\":" + node.getActivate());
		if (node.getReferenceNum() > 0L) {
			sb.append(",\"isFolder\":true");
			sb.append(",\"isLazy\":true");
		}
		if ((node.getSelect() != null) && (!node.getSelect().isEmpty())) {
			sb.append(",\"select\":" + node.getSelect());
		}
		return sb.toString();
	}
}

/*
 * NVH.
 */
package common.bean;

import java.io.Serializable;

/**
 * Thong tin menu.
 *
 * @author lockex1987
 */
public class MenuBean implements Serializable {

	/**
	 * What is this?
	 */
	private static final long serialVersionUID = 1L;

	private Long menuId;
	private Long parentId;
	private String code;
	private String name;
	private String url;
	// How to final?
	private String codePath;
	private String subMenu;

	public MenuBean(Long menuId, Long parentId, String code, String name, String url) {
		this.menuId = menuId;
		this.parentId = parentId;
		this.code = code;
		this.name = name;
		this.url = url;
	}

	public Long getMenuId() {
		return menuId;
	}

	public void setMenuId(Long menuId) {
		this.menuId = menuId;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getCodePath() {
		return codePath;
	}

	public void setCodePath(String codePath) {
		this.codePath = codePath;
	}

	public String getSubMenu() {
		return subMenu;
	}

	public void setSubMenu(String subMenu) {
		this.subMenu = subMenu;
	}
}

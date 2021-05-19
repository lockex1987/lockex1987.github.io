/*
 * NVH
 */
package common.bean;

/**
 * Đối tượng để xử lý trang trả về.
 * Có 3 kiểu:
 * - pageForward (trả về JSP)
 * - jsonText (trả về JSON)
 * - redirectPath (trang redirect)
 *
 * @author lockex1987
 */
public class ActionResult {

	// Trang xu ly ma tra ve
	public static final ActionResult SAVE_RESULT = page("saveResult");
	// Trang ket qua import
	// public static final ActionResult IMPORT_RESULT = page("importResult");
	// Trang loi phan quyen
	// public static final ActionResult INVALID_PERMISSION = page("invalidPermission");
	// Trang chua link download
	// String DOWNLOAD_LINK = "downloadLink";

	public final String page;
	public final String json;
	public final String redirect;

	private ActionResult(String page, String json, String redirect) {
		this.page = page;
		this.json = json;
		this.redirect = redirect;
	}

	public static ActionResult page(String page) {
		return new ActionResult(page, null, null);
	}

	public static ActionResult json(String json) {
		return new ActionResult(null, json, null);
	}

	public static ActionResult redirect(String page, String redirect) {
		return new ActionResult(page, null, redirect);
	}
}

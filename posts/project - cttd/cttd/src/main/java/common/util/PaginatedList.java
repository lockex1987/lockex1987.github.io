/*
 * NVH
 */
package common.util;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.hibernate.Query;

/**
 * Đối tượng phân trang.
 *
 * @author HuyenNV1
 */
public class PaginatedList {

	/**
	 * List of results (rows found) in the current page
	 */
	private List list;
	/**
	 * Number of results per page (number of rows per page to be displayed)
	 */
	private int pageSize;
	/**
	 * Current page index, starts at 0
	 */
	private int pageIndex;
	/**
	 * Total number of results (the total number of rows)
	 */
	private int fullSize;
	/**
	 * Sort criteria (sorting property name)
	 */
	private String sort;
	/**
	 * Sort order
	 */
	private String dir;

	public PaginatedList(List<Object> paramList, Query countQuery, Query objectQuery, HttpServletRequest req) {
		this.init(null, paramList, countQuery, objectQuery, req, null);
	}

	public PaginatedList(List<Object> paramList, Query countQuery, Query objectQuery, HttpServletRequest req,
			Integer pageSize) {
		this.init(null, paramList, countQuery, objectQuery, req, pageSize);
	}

	public PaginatedList(List<Object> countParamList, List<Object> objectParamList, Query countQuery, Query objectQuery, HttpServletRequest req) {
		this.init(countParamList, objectParamList, countQuery, objectQuery, req, null);
	}

	public PaginatedList(List<Object> countParamList, List<Object> objectParamList, Query countQuery, Query objectQuery, HttpServletRequest req,
			Integer pageSize) {
		this.init(countParamList, objectParamList, countQuery, objectQuery, req, pageSize);
	}

	/**
	 * Phan trang tung phan.
	 *
	 * @param objectParamList Danh sach tham so
	 * @param countQuery Cau query dem so luong ban ghi
	 * @param objectQuery Cau query liet ke danh sach
	 * @param req Doi tuong HttpServletRequest
	 * @param pageSize So luong ban ghi mot trang
	 * @return Doi tuong PaginatedList
	 */
	private void init(List<Object> countParamList, List<Object> objectParamList, Query countQuery, Query objectQuery, HttpServletRequest req, Integer pageSize) {
		if (countParamList == null) {
			for (int i = 0; i < objectParamList.size(); i++) {
				countQuery.setParameter(i, objectParamList.get(i));
				objectQuery.setParameter(i, objectParamList.get(i));
			}
		} else {
			for (int i = 0; i < countParamList.size(); i++) {
				countQuery.setParameter(i, countParamList.get(i));
			}
			for (int i = 0; i < objectParamList.size(); i++) {
				objectQuery.setParameter(i, objectParamList.get(i));
			}
		}
		this.pageSize = (pageSize == null) ? 10 : pageSize;
		this.sort = req.getParameter("sort");
		this.dir = req.getParameter("dir");
		String page = req.getParameter("page");
		if (page != null && !page.isEmpty()) {
			this.pageIndex = Integer.parseInt(page) - 1;
		} else {
			this.pageIndex = 0;
		}

		//sortDirection = "desc".equals(dir) ? SortOrderEnum.DESCENDING : SortOrderEnum.ASCENDING;
		this.fullSize = Integer.parseInt(countQuery.uniqueResult().toString());
		if ((this.fullSize == this.pageIndex * this.pageSize) && (this.pageIndex > 0)) {
			this.pageIndex--;
		}
		objectQuery.setFirstResult(this.pageIndex * this.pageSize);
		objectQuery.setMaxResults(this.pageSize);
		list = objectQuery.list();
	}

	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getFullSize() {
		return fullSize;
	}

	public void setFullSize(int fullSize) {
		this.fullSize = fullSize;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}
}

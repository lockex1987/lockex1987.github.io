package common.bean;

import java.util.List;

import org.hibernate.Query;

import lombok.extern.slf4j.Slf4j;

/**
 * Đối tượng phân trang.
 * Có một chút xử lý như là tính toán lại trang hiện tại, vị trí bắt đầu của
 * danh sách.
 * Là đối tượng để trả về cho client (với hai thuộc tính là items và
 * totalRecord).
 *
 * @author HuyenNV1
 */
public class PaginationList {

	// Danh sách các bản ghi của trang hiện tại
	private List items;

	// Tổng số bản ghi
	private int totalRecord;

	public PaginationList(Query countQuery, Query objectQuery, Integer page, Integer pageSize) {
		this(countQuery, objectQuery, page, pageSize, null, null);
	}

	public PaginationList(Query countQuery, Query objectQuery, Integer page, Integer pageSize,
			List<Object> countParamList, List<Object> objectParamList) {
		// Thiết lập tham số cho các câu query
		if (countParamList != null) {
			for (int i = 0; i < countParamList.size(); i++) {
				countQuery.setParameter(i, countParamList.get(i));
			}
		}
		if (objectParamList != null) {
			for (int i = 0; i < objectParamList.size(); i++) {
				objectQuery.setParameter(i, objectParamList.get(i));
			}
		}

		// Lấy tổng số bản ghi
		totalRecord = Integer.parseInt(countQuery.uniqueResult().toString());

		// Tổng số trang
		// Cần nhân thêm với 1D để chuyển kiểu dữ liệu về double,
		// nếu không int chia int sẽ ra int và hàm Math.ceil không có ý nghĩa
		int totalPage = (int) Math.ceil(totalRecord * 1D / pageSize);

		// Điều chỉnh lại trang hiện tại
		page = Math.min(totalPage, page);

		// Lấy ra danh sách bản ghi
		objectQuery.setFirstResult((page - 1) * pageSize);
		objectQuery.setMaxResults(pageSize);
		items = objectQuery.list();
	}

	public List getItems() {
		return items;
	}

	public int getTotalRecord() {
		return totalRecord;
	}
}

package io.cttd;

/**
 * Chương trình này dùng để liệt kê danh sách các bài viết (post, archive).
 * Các post thì liệt kê thêm ngày xuất bản.
 * Thống kê mỗi chuyên mục có bao nhiêu bài viết.
 */
public class Main {

	public static void main(String[] args) throws Exception {
		ContentExplorer obj = new ContentExplorer();
		obj.process();
	}
}

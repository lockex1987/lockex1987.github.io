package io.cttd;

/**
 * Đối tượng bài viết.
 */
public class Content {

	// Thể loại (JS, Bootstrap, Java,...)
	private String category;

	// Tiêu đề bài viết
	private String title;

	// Đường dẫn bài viết (bên trong thư mục to posts)
	private String path;

	// Mô tả bài viết
	private String description;

	// Ngày xuất bản
	private String date;

	public Content(String category, String title, String path, String description, String date) {
		this.category = category;
		this.title = title;
		this.path = path;
		this.description = description;
		this.date = date;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
}

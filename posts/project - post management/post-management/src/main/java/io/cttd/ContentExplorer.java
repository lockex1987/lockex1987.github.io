package io.cttd;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ContentExplorer {

	/**
	 * Hàm xử lý chính.
	 */
	public void process() throws Exception {
		// Lấy danh sách file, danh sách chuyên mục (cùng số bài)
		List<Content> postList = this.getPostList("posts");
		Map<String, Integer> postCategories = this.calculateCategoryCountMap(postList);

		// Nội dung để ghi ra file
		String contentData =
				this.getContentListJson(postList, "allPosts");
		String categoriesData =
				this.getCategoryCountMapJson(postCategories, "postsCategories");
		
		// Ghi ra file
		this.writeDataFile(contentData, "js/content-data.js");
		this.writeDataFile(categoriesData, "posts/project - post management/js/category-data.js");
	}

	/**
	 * Lấy ra danh sách bài viết.
	 * 
	 * @param rootPath Đường dẫn đến thư mục to
	 * @return Danh sách bài viết
	 */
	public List<Content> getPostList(String rootPath) {
		// Duyệt các thư mục con bên trong thư mục to "posts"
		List<Content> postList = new ArrayList<>();

		Arrays.stream(new File(rootPath).list())
				.sorted()
				.forEach(folderName -> {
					// Lấy ra thể loại của bài viết (phần đầu tiên trước dấu trừ ngăn cách)
					String[] a = folderName.split(" - ");
					String category = a[0];

					// Lấy ra tiêu đề, mô tả (tag description), thời gian xuất bản (tag date) của bài viết
					IndexFile indexFile = new IndexFile(rootPath + "/" + folderName + "/index.html");
					String title = indexFile.getTitle();
					String description = indexFile.getDescription();
					String date = indexFile.getDate();

					// Đường dẫn
					String path = folderName;

					// Thêm vào danh sách
					postList.add(new Content(category, title, path, description, date));
				});
		return postList;
	}

	/**
	 * Tính toán số bài viết của từng thể loại.
	 * 
	 * @param postList Danh sách bài viết
	 * @return Map thể loại với số bài viết của thể loại đó
	 */
	private Map<String, Integer> calculateCategoryCountMap(List<Content> postList) {
		Map<String, Integer> categoryCountMap = new HashMap<>();
		postList.stream()
				.forEach(post -> {
					String category = post.getCategory();
					Integer count = categoryCountMap.get(category);
					if (count == null) {
						categoryCountMap.put(category, 1);
					} else {
						categoryCountMap.put(category, count + 1);
					}
				});
		return categoryCountMap;
	}

	/**
	 * Lấy ra nội dung để ghi ra file (danh sách bài viết).
	 * 
	 * @param contentList Danh sách bài viết
	 * @return Nội dung đẻ ghi ra file
	 */
	private String getContentListJson(List<Content> contentList, String constName) {
		// Nội dung danh sách bài viết
		StringBuilder json = new StringBuilder();
		contentList.stream()
				.forEach(content -> {
					json.append("    {");
					json.append(" category: '" + content.getCategory() + "',");
					json.append(" path: '" + content.getPath().replace("\'", "\\\'") + "',");
					json.append(" title: '" + content.getTitle().replace("\'", "\\\'") + "',");
					json.append(" description: '" + content.getDescription().replace("\'", "\\\'") + "'");
					if (content.getDate() != null) {
						json.append(", date: '" + content.getDate() + "'");
					}
					json.append(" },\n");
				});
		return "export default [\n"
				+ json.substring(0, json.length() - 2) // loại dấu phảy cuối cùng
				+ "\n];"
				+ "\n";
	}
	
	/**
	 * Lấy ra nội dung để ghi ra file (số lượng bài viết từng thể loại).
	 * 
	 * @param categoryCountMap Map thể loại và bài viết
	 * @return Nội dung JSON để ghi ra file
	 */
	private String getCategoryCountMapJson(Map<String, Integer> categoryCountMap, String constName) {
		// Nội dung thể loại
		StringBuilder json = new StringBuilder();
		categoryCountMap.entrySet()
				.stream()
				.sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
				.forEach(e -> {
					json.append("    { name: '" + e.getKey() + "', y: " + e.getValue() + " },\n");
				});
		return "export default [\n"
				+ json.substring(0, json.length() - 2) // loại dấu phảy cuối cùng
				+ "\n];"
				+ "\n";
	}

	/**
	 * Ghi ra file dữ liệu.
	 * 
	 * @param content  Nội dung file
	 * @param filePath Đường dẫn đến file đầu ra
	 */
	private void writeDataFile(String content, String filePath)
			throws IOException {
		Files.write(Paths.get(filePath), content.getBytes("UTF-8"));
	}
}

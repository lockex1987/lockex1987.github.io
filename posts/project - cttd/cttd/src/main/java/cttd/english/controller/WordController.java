package cttd.english.controller;

import java.io.File;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import common.util.CommonUtils;
import common.util.DBUtil;
import cttd.english.dao.WordDAO;
import cttd.english.model.Word;

/**
 * Sử dụng Spring MVC.
 * Những thư mục nặng (như âm thanh, ảnh) thì không để trong source code mà để ở thư mục riêng.
 * Một chức năng sẽ có một đường dẫn cha chung là /words,
 * sau đó là các đường dẫn con như:
 * - index
 * - search
 * - get
 * - delete
 * - save
 * Đánh dấu là đã học, biểu đồ theo dõi tiến trình học (mỗi ngày học được mấy từ)
 * Các trò chơi với từ vựng
 * Có thêm tags (từ đó thuộc chủ đề nào, về sau học theo chủ đề)
 */
@RestController
@RequestMapping("/word")
public class WordController {

	@Autowired
	private WordDAO wordDao;

	private String pictureFolder = CommonUtils.getConfig("imageFolder");
	
	/**
	 * Chuyển đến trang JSP khi vào từ menu.
	 * @return Đối tượng ModelAndView để có thể vào được trang JSP.
	 */
	@GetMapping("/index")
	public ModelAndView index() {
		return new ModelAndView("word");
	}

	/**
	 * Tìm kiếm.
	 * @param text Từ tìm kiếm
	 * @return Danh sách từ
	 */
	@GetMapping("/search")
	public List<Word> search(@RequestParam String text) {
		List<Word> list = wordDao.search(text);
		return list;
	}

	/**
	 * Lấy một bản ghi từ danh sách search (bản ghi đầu tiên).
	 * @param text Từ tìm kiếm
	 * @return Đối tượng từ (full)
	 */
	@GetMapping("/search-one")
	public Word searchOne(@RequestParam String text) {
		List<Word> list = wordDao.search(text);
		if (list.isEmpty()) {
			return null;
		} else {
			Word word = DBUtil.get(Word.class, list.get(0).getId());
			return word;
		}
	}

	/**
	 * Lưu (thêm mới hoặc cập nhật).
	 * @param id
	 * @param word
	 * @param pronounce
	 * @param meanings
	 * @param examples
	 * @param deletedImages
	 * @param images
	 * @return Xâu JSON
	 */
	@PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String save(
			@RequestParam(required = false) Long id,
			@RequestParam String word,
			@RequestParam String pronounce,
			@RequestParam String meanings,
			@RequestParam String examples,
			@RequestParam(required = false) String deletedImages,
			@RequestParam(required = false) MultipartFile[] images)
			throws Exception {

		Word obj;
		if (id != null) {
			obj = DBUtil.get(Word.class, id);
		} else {
			obj = new Word();
		}

		obj.setWord(word);
		obj.setPronounce(pronounce);

		// Meanings
		String[] a = meanings.split("\n");
		JSONArray meaningsDb = new JSONArray();
		for (String s : a) {
			if (s != null && !s.isEmpty()) {
				String[] b = s.split(":");
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("wordType", b[0].trim());
				jsonObject.put("meaning", b[1].trim());

				meaningsDb.put(jsonObject);
			}
		}
		obj.setMeanings(meaningsDb.toString());

		// Examples
		a = examples.split("\n");
		JSONArray examplesDb = new JSONArray();
		for (String s : a) {
			if (s != null && !s.isEmpty()) {
				examplesDb.put(s);
			}
		}
		obj.setExamples(examplesDb.toString());

		JSONArray imagesDb;
		if (id != null) {
			imagesDb = new JSONArray(obj.getImages());
		} else {
			imagesDb = new JSONArray();
		}

		// Deleted images
		if (deletedImages != null && !deletedImages.isEmpty()) {
			a = deletedImages.split(",");
			if (a != null) {
				for (String s : a) {
					if (!s.isEmpty()) {
						File file = new File(pictureFolder + s);
						if (file.exists()) {
							file.delete();
						}

						int index = 0;
						for (int i = 0; i < imagesDb.length(); i++) {
							if (imagesDb.getString(i).equals(s)) {
								index = i;
								break;
							}
						}
						imagesDb.remove(index);
					}
				}
			}	
		}

		// Images
		if (images != null ) {
			for (MultipartFile file : images) {
				if (!file.isEmpty()) {
					String fileName = file.getOriginalFilename();
					imagesDb.put(fileName);
	
					file.transferTo(new File(pictureFolder + fileName));
				}
			}
			obj.setImages(imagesDb.toString());
		}

		// Tags

		// Download audio
		//TextToSpeech.downloadAudioFile(word, path);

		DBUtil.saveOrUpdate(obj);
		DBUtil.flushSession();

		return "{ \"status\": 0, \"id\": " + obj.getId() + " }";
	}

	/**
	 * Lấy thông tin chi tiết của một bản ghi.
	 * @param id
	 * @return
	 */
	@GetMapping("/get")
	public Word get(@RequestParam Long id) {
		Word word = DBUtil.get(Word.class, id);
		return word;
	}
	
	/**
	 * Lấy tất cả các bản ghi.
	 * @return Danh sách các bản ghi
	 */
	@GetMapping("/get-all")
	public List<Word> getAll() {
		//List<Word> list = DBUtil.getAll(Word.class, null);
		List<Word> list = wordDao.getAll();
		return list;
	}

	/**
	 * Xóa bản ghi.
	 * https://stackoverflow.com/questions/25375046/passing-data-in-the-body-of-a-delete-request.
	 * @param id
	 * @return
	 */
	@PostMapping(value = "/delete", produces = MediaType.APPLICATION_JSON_VALUE)
	public String delete(@RequestParam Long id) {
		// Lấy toàn bộ thông tin bản ghi trong DB
		Word wordBo = DBUtil.get(Word.class, id);
		
		// Xóa ảnh
		JSONArray imagesDb = new JSONArray(wordBo.getImages());
		for (int i = 0; i < imagesDb.length(); i++) {
			File file = new File(pictureFolder + imagesDb.getString(i));
			if (file.exists()) {
				file.delete();
			}
		}

		// Xóa bản ghi
		DBUtil.deleteById(id, Word.class, "id");

		return "{ \"status\": 0 }";
	}
}

package cttd.english.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "word")
public class Word {

	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
    Long id;
	
	@Column(name = "word")
    String word;
	
	@Column(name = "pronounce")
    String pronounce;
	
	@Column(name = "meanings")
    String meanings;
	
	@Column(name = "images")
    String images;
	
	@Column(name = "examples")
    String examples;
	
	public Word() {
	}

	/**
	 * Hàm khởi tạo khi tìm kiếm hoặc lấy về danh sách.
	 * Chỉ cần ID và tên.
	 * @param id
	 * @param word
	 */
	public Word(Long id, String word) {
		super();
		this.id = id;
		this.word = word;
	}
}

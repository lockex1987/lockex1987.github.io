/*
 * NVH
 */
package common.util;

import java.util.AbstractList;
import java.util.List;

/**
 * Mệnh đề IN trong SQL chỉ giới hạn số phần tử là 1000 nên nhiều khi để sử dụng
 * câu lệnh IN chúng ta phải chia thành nhiều danh sách, mỗi danh sách 1000 phần tử
 * và sử dụng câu lệnh IN nhiều lần.
 * 
 * @author huyennv9
 */
public class Partition<T> extends AbstractList<List<T>> {

	private final List<T> list;
	private final int size;

	public Partition(List<T> list, int size) {
		this.list = list;
		this.size = size;
	}

	@Override
	public List<T> get(int index) {
		int start = index * size;
		int end = Math.min(start + size, list.size());
		return list.subList(start, end);
	}

	@Override
	public int size() {
		return (list.size() + size - 1) / size;
	}

	@Override
	public boolean isEmpty() {
		return list.isEmpty();
	}

	public static <T> List<List<T>> partition(List<T> list, int size) {
		return new Partition<>(list, size);
	}
}

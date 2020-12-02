import java.io.PrintWriter;
import java.util.List;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.nio.file.Files;
import java.nio.file.Paths;


public class Subtitle {

	// java Subtitle "input.srt" "output.srt" 00:00:02,001
	// javac -encoding utf8 Subtitle.java
	public static void main(String args[]) throws Exception {
		// Tham số
		String sourceFile = args[0]; // file đầu vào
		String destFile = args[1]; // file đầu ra
		String startTimeParam = args[2]; // thời gian bắt đầu mới
		int fromItem = args.length > 3 ? Integer.parseInt(args[3]) : 1; // sửa bắt đầu từ phần tử đầu tiên, nhiều file phụ đề có đoạn đầu thì đúng, đoạn sau bắt đầu sai

		// Đọc tất cả các dòng của file đầu vào
		List<String> lines = Files.readAllLines(Paths.get(sourceFile));

		// Biểu thức chính quy cho dòng thời gian của file phụ đề
		String regex= "(\\d\\d:\\d\\d:\\d\\d,\\d\\d\\d) --> (\\d\\d:\\d\\d:\\d\\d,\\d\\d\\d)";
		Pattern pattern = Pattern.compile(regex);

		// Chỉ số đếm của phần tử
		int currentItem = 0;

		// Tính chênh lệch giữa 2 khoảng thời gian
		int diff = 0;

		// Xử lý từng dòng và ghi ra file đầu ra
		try (PrintWriter fo = new PrintWriter(destFile)) {
			for (String s : lines) {
				// Kiểm tra dòng thời gian
				Matcher matcher = pattern.matcher(s);
				if (matcher.matches()) {
					// Tăng chỉ số đếm
					currentItem++;

					// Tính chênh lệch giữa 2 khoảng thời gian
					if (currentItem == fromItem) {
						Time startTimeOld = new Time(matcher.group(1));
						Time startTimeNew = new Time(startTimeParam);
						diff = startTimeOld.subtract(startTimeNew);
					}

					// Cập nhật lại 2 thời gian
					if (currentItem >= fromItem) {
						Time t1 = new Time(matcher.group(1));
						Time t2 = new Time(matcher.group(2));
						t1.subtract(diff);
						t2.subtract(diff);
						s = t1 + " --> " + t2;
					}
				}

				// Ghi ra file
				fo.println(s);
			}
		}
	}
}

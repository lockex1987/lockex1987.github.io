package io2;

import java.io.DataOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class DataOutputStreamDemo {

	public static void main(String[] args) throws IOException {
		int cityIdA = 1;
		String cityNameA = "Green Lake City";
		int cityPopulationA = 500000;
		float cityTempA = 15.50f;

		int cityIdB = 2;
		String cityNameB = "Salt Lake City";
		int cityPopulationB = 250000;
		float cityTempB = 10.45f;

		// Tạo đối tượng FileOutputStream để ghi xuống file
		FileOutputStream fos = new FileOutputStream("_data/data_stream.txt");

		// Tạo đối tượng DataOutputStream bao lấy 'fos'.
		// Dữ liệu ghi vào 'dos' sẽ được đẩy sang 'fos'
		DataOutputStream dos = new DataOutputStream(fos);

		// Ghi các dữ liệu vào luồng.
		dos.writeInt(cityIdA);
		dos.writeUTF(cityNameA);
		dos.writeInt(cityPopulationA);
		dos.writeFloat(cityTempA);

		dos.writeInt(cityIdB);
		dos.writeUTF(cityNameB);
		dos.writeInt(cityPopulationB);
		dos.writeFloat(cityTempB);

		dos.flush();
		dos.close();
	}
}

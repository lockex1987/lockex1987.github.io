package io2;

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class DataInputStreamDemo {

	public static void main(String[] args) throws IOException {

		// Luồng đọc dữ liệu từ file
		FileInputStream fis = new FileInputStream("_data/data_stream.txt");
		// Tạo đối tượng DataInputStream bao lấy 'fis'
		DataInputStream dis = new DataInputStream(fis);

		// Đọc dữ liệu
		int cityId1 = dis.readInt();
		String cityName1 = dis.readUTF();
		int cityPopulation1 = dis.readInt();
		float cityTemperature1 = dis.readFloat();

		int cityId2 = dis.readInt();
		String cityName2 = dis.readUTF();
		int cityPopulation2 = dis.readInt();
		float cityTemperature2 = dis.readFloat();

		System.out.println("Id: " + cityId1);
		System.out.println("Name: " + cityName1);
		System.out.println("Population: " + cityPopulation1);
		System.out.println("Temperature: " + cityTemperature1);
		
		System.out.println("Id: " + cityId2);
		System.out.println("Name: " + cityName2);
		System.out.println("Population: " + cityPopulation2);
		System.out.println("Temperature: " + cityTemperature2);
		
		dis.close();
	}
}

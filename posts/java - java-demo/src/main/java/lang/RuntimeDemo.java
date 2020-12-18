package lang;

import java.io.*;

public class RuntimeDemo {
	public RuntimeDemo() {
		Runtime r = Runtime.getRuntime();
		try  {
			//r.exec("calc.exe");
			//r.exec("color 31");
			r.exec("shutdown -l");
		}
		catch(IOException e) {
			e.printStackTrace();
		}
		System.out.println(r.totalMemory());
		System.out.println(r.freeMemory());
	}

	public static void main(String[] args) {
		new RuntimeDemo();
	}
}

//chi thuc hien duoc cac lenh ngoai tru
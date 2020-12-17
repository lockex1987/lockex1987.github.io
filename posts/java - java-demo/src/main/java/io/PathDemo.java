package io;
import java.nio.file.Path;
import java.nio.file.Paths;

public class PathDemo {

	public static void main(String[] args) {
		testCreate();
		testNormalize();
	}

	private static void testCreate() {
		Path path = Paths.get("E:/new/path-demo.txt");
		Path projects = Paths.get("d:\\data", "projects");
		Path file = Paths.get("d:\\data", "projects\\a-project\\myfile.txt");
		Path path1 = Paths.get("d:\\data\\projects", ".\\a-project");
		Path path2 = Paths.get("d:\\data\\projects\\a-project", "..\\another-project");
		Path currentDir = Paths.get(".");
		Path parentDir = Paths.get("..");

		System.out.println(currentDir.toAbsolutePath());
		System.out.println(parentDir.toAbsolutePath());
	}

	private static void testNormalize() {
		Path path1 = Paths.get("d:\\data\\projects\\a-project\\..\\another-project");
		Path path2 = path1.normalize();
		
		System.out.println("path1 = " + path1);
		System.out.println("path2 = " + path2);
	}
}

package io;
import java.io.File;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.FileVisitResult;
import java.nio.file.FileVisitor;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.BasicFileAttributes;

public class FilesDemo {

	public static void main(String[] args) {
		// testExists();
		//testCreateDirectory();
		walkFileTree1();
	}

	private static void testExists() {
		Path path = Paths.get("data/logging.properties");
		boolean pathExists = Files.exists(path, new LinkOption[] { LinkOption.NOFOLLOW_LINKS });
		System.out.println(pathExists);
	}

	private static void testCreateDirectory() {
		Path path = Paths.get("data/subdir");
		try {
			Path newDir = Files.createDirectory(path);
			System.out.println(newDir.toAbsolutePath());
		} catch (FileAlreadyExistsException e) {
			System.out.println("File already exists");
			// the directory already exists.
		} catch (IOException e) {
			// something else went wrong
			e.printStackTrace();
		}
	}

	private static void testCopy() {
		Path sourcePath = Paths.get("data/logging.properties");
		Path destinationPath = Paths.get("data/logging-copy.properties");
		try {
			Files.copy(sourcePath, destinationPath);
		} catch (FileAlreadyExistsException e) {
			// destination file already exists
		} catch (IOException e) {
			// something else went wrong
			e.printStackTrace();
		}
	}

	private static void overwrite() {
		Path sourcePath = Paths.get("data/logging.properties");
		Path destinationPath = Paths.get("data/logging-copy.properties");
		try {
			Files.copy(sourcePath, destinationPath,
					StandardCopyOption.REPLACE_EXISTING);
		} catch (FileAlreadyExistsException e) {
			// destination file already exists
		} catch (IOException e) {
			// something else went wrong
			e.printStackTrace();
		}
	}

	private static void testMove() {
		Path sourcePath = Paths.get("data/logging-copy.properties");
		Path destinationPath = Paths.get("data/subdir/logging-moved.properties");
		try {
			Files.move(sourcePath, destinationPath,
					StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			// moving file failed.
			e.printStackTrace();
		}
	}

	private static void testDelete() {
		Path path = Paths.get("data/subdir/logging-moved.properties");
		try {
			Files.delete(path);
		} catch (IOException e) {
			// deleting file failed
			e.printStackTrace();
		}
	}

	private static void walkFileTree1() {
		Path path = Paths.get("E:/data/");
		try {
			Files.walkFileTree(path, new FileVisitor<Path>() {
				
				@Override
				public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
					System.out.println("pre visit dir: " + dir);
					return FileVisitResult.CONTINUE;
				}

				@Override
				public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
					System.out.println("visit file: " + file);
					return FileVisitResult.CONTINUE;
				}

				@Override
				public FileVisitResult visitFileFailed(Path file, IOException exc) throws IOException {
					System.out.println("visit file failed: " + file);
					return FileVisitResult.CONTINUE;
				}

				@Override
				public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
					System.out.println("post visit directory: " + dir);
					return FileVisitResult.CONTINUE;
				}
			});
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	// Searching for files
	private static void walkFileTree2() {
		Path rootPath = Paths.get("E:/data/");
		String fileToFind = File.separator + "README.txt";
		try {
			Files.walkFileTree(rootPath, new SimpleFileVisitor<Path>() {
				@Override
				public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
					String fileString = file.toAbsolutePath().toString();
					// System.out.println("pathString = " + fileString);
					if (fileString.endsWith(fileToFind)) {
						System.out.println("file found at path: " + file.toAbsolutePath());
						return FileVisitResult.TERMINATE;
					}
					return FileVisitResult.CONTINUE;
				}
			});
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	// Deleting directories recursively
	private static void walkFileTree3() {
		Path rootPath = Paths.get("data/to-delete");
		try {
			Files.walkFileTree(rootPath, new SimpleFileVisitor<Path>() {
				@Override
				public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
					System.out.println("delete file: " + file.toString());
					Files.delete(file);
					return FileVisitResult.CONTINUE;
				}

				@Override
				public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
					Files.delete(dir);
					System.out.println("delete dir: " + dir.toString());
					return FileVisitResult.CONTINUE;
				}
			});
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

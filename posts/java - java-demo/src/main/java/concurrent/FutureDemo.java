package concurrent;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class FutureDemo {

	public static void main(String[] args) throws Exception {
		long start = System.currentTimeMillis();

		testNormal(3, 3, 5);
		//		testAsynchronous(3, 3, 5);

		System.out.printf("Elapsed time: %d seconds\n", (System.currentTimeMillis() - start) / 1000);
	}

	private static void testNormal(int s1, int s2, int s3) {
		String r1 = doLongTask(s1);
		String r2 = doLongTask(s2);
		String r3 = doLongTask(s3);
		System.out.println(r1);
		System.out.println(r2);
		System.out.println(r3);
	}

	private static void testAsynchronous(int s1, int s2, int s3) throws InterruptedException, ExecutionException {
		int poolSize = 3; // try to change it to 1
		ExecutorService executor = Executors.newFixedThreadPool(poolSize);

		// Kick of multiple, asynchronous lookups
		Future<String> r1 = executor.submit(() -> {
			return doLongTask(s1);
		});
		Future<String> r2 = executor.submit(() -> {
			return doLongTask(s2);
		});
		Future<String> r3 = executor.submit(() -> {
			return doLongTask(s3);
		});

		// Wait until they are all done
		// Sometimes we even don't need following code (because Future.get will block main thread)
		while (!(r1.isDone() && r2.isDone() && r3.isDone())) {
			Thread.sleep(10); // 10-millisecond pause between each check
		}

		// Get return values
		System.out.println(r1.get());
		System.out.println(r2.get());
		System.out.println(r3.get());

		// Executors have to be stopped explicitly
		// otherwise they keep listening for new tasks
		executor.shutdown();
	}

	private static String doLongTask(int second) {
		try {
			Thread.sleep(1000 * second);
			return "Finish after " + second + " second";
		} catch (InterruptedException ex) {
			return null;
		}
	}
}

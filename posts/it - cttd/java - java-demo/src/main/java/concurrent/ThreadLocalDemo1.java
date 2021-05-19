package concurrent;

import java.util.Date;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public class ThreadLocalDemo1 implements Runnable {

	// nextId chứa id của thread tiếp theo
	private static final AtomicInteger NEXT_ID = new AtomicInteger(0);

	// biến ThreadLocal chứa id của mỗi thread
	private static final ThreadLocal<Integer> THREAD_ID = new ThreadLocal<Integer>() {
		@Override
		protected Integer initialValue() {
			return NEXT_ID.getAndIncrement();
		}
	};

	// Trả về id của thread hiện tại
	public int getThreadId() {
		return THREAD_ID.get();
	}

	// Trả về thời gian bắt đầu chạy của thread hiện tại
	private static final ThreadLocal<Date> START_DATE = new ThreadLocal<Date>() {
		@Override
		protected Date initialValue() {
			return new Date();
		}
	};

	@Override
	public void run() {
		System.out.printf("Chạy Thread: %s : %s\n", getThreadId(), START_DATE.get());
		try {
			TimeUnit.SECONDS.sleep((int) Math.rint(Math.random() * 10));
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.printf("Kết thúc Thread: %s : %s\n", getThreadId(), START_DATE.get());
	}

	public static void main(String[] args) {
		for (int i = 0; i < 3; i++) {
			new Thread(new ThreadLocalDemo1()).start();
		}
	}
}

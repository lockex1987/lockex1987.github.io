package concurrent;

public class ThreadDemo {

	public static void main(String[] args) {
		new MyThread().start();
		new Thread(new MyRunnable()).start();
	}
}

class MyThread extends Thread {

	public static int LIM = 1000;
	public static int SLEEP = 200;
	public static int ADD = 5;
	private int c;

	@Override
	public void run() {
		while (c < LIM) {
			System.out.println("1 = " + c);
			c += ADD;
			try {
				Thread.sleep(SLEEP);
			} catch (InterruptedException ie) {
			}
		}
	}
}

class MyRunnable implements Runnable {

	public static int LIM = 1000;
	public static int SLEEP = 100;
	public static int ADD = 2;
	private int c;

	@Override
	public void run() {
		while (c < LIM) {
			System.out.println("2 = " + c);
			c += ADD;
			try {
				Thread.sleep(SLEEP);
			} catch (InterruptedException ie) {
			}
		}
	}
}

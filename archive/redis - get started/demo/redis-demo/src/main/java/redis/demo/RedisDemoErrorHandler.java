package redis.demo;

import redis.clients.jedis.Jedis;

public class RedisDemoErrorHandler implements Runnable {

	private Jedis jedis;

	public RedisDemoErrorHandler() {
		jedis = new Jedis();
	}

	@Override
	public void run() {
		String key = "foo";
		int delay = 2 * 1000;
		while (true) {
			try {
				System.out.println(jedis.get(key));
			} catch (Exception ex) {
				// Khi bi loi connection is reset thi khong the dung phuong thuc connect de ket noi lai
				// Phai tao lai doi tuong

				System.out.println("Try reconnecting");
				// jedis = new Jedis();
				jedis.connect();
			}

			try {
				Thread.sleep(delay);
			} catch (Exception ex) {
				// Do nothing
			}
		}
	}

	public static void main(String[] args) {
		new Thread(new RedisDemoErrorHandler()).start();
		System.out.println("Finish gently");
	}
}

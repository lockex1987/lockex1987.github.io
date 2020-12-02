package redis.demo;

import redis.clients.jedis.Jedis;

public class RedisDemoErrorHandler2 implements Runnable {

	@Override
	public void run() {
		String key = "foo";
		int delay = 2 * 1000;
		while (true) {
			try (Jedis jedis = new Jedis()) {
				System.out.println(jedis.get(key));
			} catch (Exception ex) {
				// Do nothing
			}
			
			try {
				Thread.sleep(delay);
			} catch (Exception ex) {
				// Do nothing
			}
		}
	}

	public static void main(String[] args) {
		new Thread(new RedisDemoErrorHandler2()).start();
		System.out.println("Finish gently");
	}
}

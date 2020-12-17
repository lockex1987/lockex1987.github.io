package redis.demo;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPubSub;

/**
 * We can use the Redis messaging broker functionality to send messages between the different components of our system.
 * Make sure the subscriber and publisher threads do not share the same Jedis connection.
 */
public class RedisDemoPubSub {

	private static final String CHANNEL = "redisChat";

	public static void main(String[] args) {
		subscribe();
	}

	/**
	 * Subscribe and listen to messages sent to a channel
	 */
	private static void subscribe() {
		// Always run
		// Try to create a new instance when there are errors
		while (true) {
			System.out.println("Start listening");
			try (Jedis jedis = new Jedis()) {
				// Jedis.subscribe is a blocking method
				jedis.subscribe(new JedisPubSub() {

					@Override
					public void onMessage(String channel, String message) {
						System.out.println(channel + ": " + message);
					}
				}, CHANNEL);
			} catch (Exception ex) {
				ex.printStackTrace();
			}

			// Delay
			try {
				Thread.sleep(2 * 1000);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
	}

	/**
	 * Send messages to that same channel from the publisher’s thread
	 */
	private static void publish() {
		Jedis jedis = new Jedis();
		jedis.publish("channel", "test message");
	}
}

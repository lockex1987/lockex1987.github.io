package redis.demo;

import java.util.List;
import java.util.Map;
import java.util.Set;

import redis.clients.jedis.Jedis;

public class RedisDemoDataStructures {

	public RedisDemoDataStructures(String redisHost, int redisPort) {
		try (Jedis jedis = new Jedis(redisHost, redisPort)) {
			// Check whether server is running or not
			System.out.println("Server is running: " + jedis.ping());

			getAllStoredData(jedis);

			testString(jedis);
			testList(jedis);
			testSet(jedis);
			testSortedSet(jedis);
			testHash(jedis);
		}
	}

	private void getAllStoredData(Jedis jedis) {
		// Get the stored data and print it
		Set<String> set = jedis.keys("*");
		System.out.println("List of stored keys:");
		for (String s : set) {
			System.out.println("    " + s);
		}
	}

	private void testString(Jedis jedis) {
		// Set the data in Redis string
		String key = "tutorialname";
		jedis.set(key, "Redis tutorial");
		String value = jedis.get(key);
		System.out.println(key + ": " + value);

		key = "events/city/rome";
		jedis.set(key, "32,15,223,828");
		value = jedis.get(key);
		System.out.println(key + ": " + value);
	}

	private void testList(Jedis jedis) {
		String key = "queue#tasks";
		jedis.lpush(key, "firstTask");
		jedis.lpush(key, "secondTask");

		String task = jedis.rpop(key);
		System.out.println(task);

		key = "tutorial-list";
		jedis.lpush(key, "Redis");
		jedis.lpush(key, "Mongodb");
		jedis.lpush(key, "Mysql");

		List<String> list = jedis.lrange(key, 0, 5);
		System.out.println("Stored list in Redis:");
		for (int i = 0; i < list.size(); i++) {
			System.out.println("    " + (i + 1) + ": " + list.get(i));
		}
	}

	private void testSet(Jedis jedis) {
		String key = "nicknames";
		jedis.sadd(key, "nickname#1");
		jedis.sadd(key, "nickname#2");
		jedis.sadd(key, "nickname#1");

		Set<String> nicknames = jedis.smembers(key);
		boolean exists = jedis.sismember(key, "nickname#1");
		System.out.println(nicknames);
		System.out.println(exists);
	}

	private void testSortedSet(Jedis jedis) {
		String key = "ranking";
		jedis.zadd(key, 3000.0, "PlayerOne");
		jedis.zadd(key, 1500.0, "PlayerTwo");
		jedis.zadd(key, 8200.0, "PlayerThree");

		// The variable player will hold the value PlayerThree because we are retrieving the top 1 player and he is the
		// one with the highest score.
		String player = jedis.zrevrange(key, 0, 1).iterator().next();
		// The rank variable will have a value of 1 because PlayerOne is the second in the ranking and the ranking is
		// zero-based.
		long rank = jedis.zrevrank(key, "PlayerOne");
		System.out.println(player);
		System.out.println(rank);
	}

	private void testHash(Jedis jedis) {
		String key = "user#1";
		jedis.hset(key, "name", "Peter");
		jedis.hset(key, "job", "politician");

		String name = jedis.hget(key, "name");
		Map<String, String> fields = jedis.hgetAll(key);
		String job = fields.get("job");
		System.out.println(name);
		System.out.println(job);
	}

	public static void main(String[] args) {
		String redisHost = "localhost";
		int redisPort = 6379;
		new RedisDemoDataStructures(redisHost, redisPort);
	}
}

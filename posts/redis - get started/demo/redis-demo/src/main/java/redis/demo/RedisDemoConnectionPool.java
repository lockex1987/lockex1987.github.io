package redis.demo;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.exceptions.JedisException;

public class RedisDemoConnectionPool {

	// Address of your redis server
	private static final String redisHost = "localhost";
	private static final int redisPort = 6379;

	// The jedis connection pool
	private static JedisPool pool = null;

	public RedisDemoConnectionPool() {
		// Configure our pool connection
		pool = new JedisPool(redisHost, redisPort);
	}

	public void addSets() {
		// Let us first add some data in our Redis server using Redis SET.
		String key = "members";
		String member1 = "Sedarius";
		String member2 = "Richard";
		String member3 = "Joe";

		// Get a jedis connection jedis connection pool
		Jedis jedis = pool.getResource();
		try {
			// Save to Redis
			jedis.sadd(key, member1, member2, member3);

			// After saving the data, lets retrieve them to be sure that it has really added in Redis
			Set<String> members = jedis.smembers(key);
			for (String s : members) {
				System.out.println(s);
			}
		} catch (JedisException e) {
			// If something wrong happen, return it back to the pool
			if (null != jedis) {
				pool.returnBrokenResource(jedis);
				jedis = null;
			}
		} finally {
			/// It's important to return the Jedis instance to the pool once you've finished using it
			if (null != jedis) {
				pool.returnResource(jedis);
			}
		}
	}

	public void addHash() {
		// Add some values in Redis HASH
		String key = "javapointers";
		Map<String, String> map = new HashMap<>();
		map.put("name", "Java Pointers");
		map.put("domain", "www.javapointers.com");
		map.put("description", "Learn how to program in Java");

		Jedis jedis = pool.getResource();
		try {
			// Save to Redis
			jedis.hmset(key, map);

			// After saving the data, lets retrieve them to be sure that it has really added in Redis
			Map<String, String> retrieveMap = jedis.hgetAll(key);
			for (String keyMap : retrieveMap.keySet()) {
				System.out.println(keyMap + ": " + retrieveMap.get(keyMap));
			}
		} catch (JedisException e) {
			// If something wrong happen, return it back to the pool
			if (null != jedis) {
				pool.returnBrokenResource(jedis);
				jedis = null;
			}
		} finally {
			/// It's important to return the Jedis instance to the pool once you've finished using it
			if (null != jedis) {
				pool.returnResource(jedis);
			}
		}
	}

	public static void main(String[] args) {
		RedisDemoConnectionPool main = new RedisDemoConnectionPool();
		main.addSets();
		main.addHash();
	}
	
	/**
	 * It is important to know that the way we have been dealing with our Jedis instance is naive. In a real world
	 * scenario, you do not want to use a single instance in a multi-threaded environment as a single instance is not
	 * thread safe.
	 * 
	 * Luckily enough we can easily create a pool of connections to Redis for us to reuse on demand, a pool that is
	 * thread safe and reliable as long as you return the resource to the pool when you are done with it.
	 */
	private static void connectionPooling() {
		final JedisPoolConfig poolConfig = buildPoolConfig();
		JedisPool jedisPool = new JedisPool(poolConfig, "localhost");
		try (Jedis jedis = jedisPool.getResource()) {
			// do operations with jedis resource
		}
	}

	private static JedisPoolConfig buildPoolConfig() {
		final JedisPoolConfig poolConfig = new JedisPoolConfig();
		poolConfig.setMaxTotal(128);
		poolConfig.setMaxIdle(128);
		poolConfig.setMinIdle(16);
		poolConfig.setTestOnBorrow(true);
		poolConfig.setTestOnReturn(true);
		poolConfig.setTestWhileIdle(true);
		poolConfig.setMinEvictableIdleTimeMillis(Duration.ofSeconds(60).toMillis());
		poolConfig.setTimeBetweenEvictionRunsMillis(Duration.ofSeconds(30).toMillis());
		poolConfig.setNumTestsPerEvictionRun(3);
		poolConfig.setBlockWhenExhausted(true);
		return poolConfig;
	}
}

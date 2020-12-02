package redis.demo;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.Transaction;

public class RedisDemoTransaction {

	/**
	 * Transactions guarantee atomicity and thread safety operations, which means that requests from other clients will
	 * never be handled concurrently during Redis transactions
	 * 
	 * @param jedis
	 */
	private static void transaction(Jedis jedis) {
		// Transaction
		String friendsPrefix = "friends#";
		String userOneId = "4352523";
		String userTwoId = "5552321";

		Transaction t = jedis.multi();
		t.sadd(friendsPrefix + userOneId, userTwoId);
		t.sadd(friendsPrefix + userTwoId, userOneId);
		t.exec();
	}
}

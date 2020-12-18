package redis.demo;

import java.util.Set;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;
import redis.clients.jedis.Response;

public class RedisDemoPipeline {

	/**
	 * When we have to send multiple commands, we can pack them together in one request and save connection overhead by
	 * using pipelines, it is essentially a network optimization. As long as the operations are mutually independent, we
	 * can take advantage of this technique
	 * 
	 * @param jedis
	 */
	private static void pipeline(Jedis jedis) {
		// Pipeline
		String userOneId = "4352523";
		String userTwoId = "4849888";

		Pipeline p = jedis.pipelined();
		p.sadd("searched#" + userOneId, "paris");
		p.zadd("ranking", 126, userOneId);
		p.zadd("ranking", 325, userTwoId);
		Response<Boolean> pipeExists = p.sismember("searched#" + userOneId, "paris");
		Response<Set<String>> pipeRanking = p.zrange("ranking", 0, -1);
		p.sync();

		Boolean exists = pipeExists.get();
		Set<String> ranking = pipeRanking.get();
		System.out.println(exists);
		System.out.println(ranking);
	}
}

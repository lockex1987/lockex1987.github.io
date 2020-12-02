package com.ifi.boot.processing;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import com.ifi.boot.common.Constants;



//@Component
//@ConfigurationProperties
public class ExampleInvocation implements CommandLineRunner {

	private static Logger logger = LoggerFactory.getLogger(ExampleInvocation.class);
	@Value("${app.working.thread}")
	private String nbAppThread;

	@Override
	public void run(String... arg0) throws Exception {
		logger.info("Starting working thread");
		int numberAppThread = 1;
		try {
			numberAppThread = Integer.valueOf(nbAppThread);
		} catch (NumberFormatException e) {
			logger.info("Default number of thread (1) will be taken");
		}
		for (int i = 0; i < numberAppThread; i++) {
			(new Thread(new Consumer(Constants.BILLY_THREAD_NAME + "_" + i))).start();
			Thread.currentThread();
			Thread.sleep(1000);
		}
	}

}

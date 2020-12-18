package com.viettel.safenet.logalert.main;

import org.quartz.CronScheduleBuilder;
import org.quartz.Job;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;

import com.viettel.safenet.logalert.job.CheckLogFileJob;
import com.viettel.safenet.logalert.job.CheckWebsiteUpJob;
import com.viettel.safenet.logalert.util.FileConfig;

import lombok.extern.slf4j.Slf4j;

/**
 * Định kỳ kiểm tra file log lỗi.
 * Nếu thấy có log lỗi thì gửi tin nhắn cho đội phát triển.
 *
 * @author huyennv1
 */
@Slf4j
public class LogAlertApplication {

	public static void main(String[] args) throws Exception {
		startCheckLogFileJob();
        startCheckWebsiteUpJob();
	}

	private static void startCheckLogFileJob() throws Exception {
		String jobName = "CheckLogFileJob";
		String triggerName = "CheckLogFileTrigger";
		String group = "safenet";
		String scheduleConfig = FileConfig.getConfig("checkLogFile.schedule");
		Class<? extends Job> jobClass = CheckLogFileJob.class;

		scheduleJob(jobName, triggerName, group, scheduleConfig, jobClass);
	}
    
    private static void startCheckWebsiteUpJob() throws Exception {
		String jobName = "CheckWebsiteUpJob";
		String triggerName = "CheckWebsiteUpTrigger";
		String group = "safenet";
		String scheduleConfig = FileConfig.getConfig("checkWebsiteUp.schedule");
		Class<? extends Job> jobClass = CheckWebsiteUpJob.class;

		scheduleJob(jobName, triggerName, group, scheduleConfig, jobClass);
	}

	private static void scheduleJob(String jobName, String triggerName, String group, String scheduleConfig,
			Class<? extends Job> jobClass) throws SchedulerException {
		JobDetail job = JobBuilder.newJob(jobClass)
				.withIdentity(jobName, group)
				.build();

		Trigger trigger = TriggerBuilder
				.newTrigger()
				.withIdentity(triggerName, group)
				.withSchedule(
						CronScheduleBuilder.cronSchedule(scheduleConfig))
				.build();

		Scheduler scheduler = new StdSchedulerFactory().getScheduler();
		scheduler.start();
		scheduler.scheduleJob(job, trigger);

		log.info("Job " + jobName + " is scheduled and will start at " + scheduleConfig);
	}
}

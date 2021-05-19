package awt;

import java.util.Timer;
import java.util.TimerTask;
/**
 * Simple demo that uses java.util.Timer to schedule a task to execute
 * once 5 seconds have passed. */

 public class TimerTaskDemo {
	Timer timer;

	public TimerTaskDemo(int seconds) {
		timer = new Timer();
		timer.schedule(new RemindTask(), seconds * 1000);
	}

	class RemindTask extends TimerTask {
		public void run() {
			System.out.println("Time's up!");
			timer.cancel(); // terminate the timer thread
		}
	}

	public static void main(String args[]) {
		System.out.println("About to schedule task.");
		new TimerTaskDemo(5);
		System.out.println("Task scheduled.");
	}
}
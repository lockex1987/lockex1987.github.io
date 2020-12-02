package concurrent;

class Context {

	private String requestId;

	public String getRequestId() {
		return requestId;
	}

	public void setRequestId(String requestId) {
		this.requestId = requestId;
	}
}

class MyThreadLocal {

	private static final ThreadLocal<Context> THREAD_CONTEXT = new ThreadLocal();

	public static void set(Context userObject) {
		THREAD_CONTEXT.set(userObject);
	}

	public static void unset() {
		THREAD_CONTEXT.remove();
	}

	public static Context get() {
		return THREAD_CONTEXT.get();
	}
}

class BusinessService {

	public void doBusinessMethod() {
		Context context = MyThreadLocal.get();
		System.out.println(context.getRequestId());
	}
}

public class ThreadLocalDemo2 extends Thread {

	@Override
	public void run() {
		Context context = new Context();
		context.setRequestId("Request ID of thread: " + getName());
		MyThreadLocal.set(context);
		new BusinessService().doBusinessMethod();
		MyThreadLocal.unset();
	}

	public static void main(String[] args) {
		for (int i = 0; i < 3; i++) {
			new ThreadLocalDemo2().start();
		}
	}
}

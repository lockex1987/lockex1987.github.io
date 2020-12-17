public class Time {

	private int hour;
	private int minute;
	private int second;
	private int tik;

	public Time(String text) {
		this.hour = Integer.parseInt(text.substring(0, 2));
		this.minute = Integer.parseInt(text.substring(3, 5));
		this.second = Integer.parseInt(text.substring(6, 8));
		this.tik = Integer.parseInt(text.substring(9, 12));
	}

	@Override
	public String toString() {
		return (String.valueOf(hour + 100).substring(1, 3) + ":"
				+ String.valueOf(minute + 100).substring(1, 3) + ":"
				+ String.valueOf(second + 100).substring(1, 3) + ","
				+ String.valueOf(tik + 1000).substring(1, 4));
	}

	public int subtract(Time t2) {
		int diff = this.getTime() - t2.getTime();
		return diff;
	}

	public void subtract(int diff) {
		int n = this.getTime() - diff;
		this.fromTime(n);
	}

	private int getTime() {
		return (this.hour * 60 * 60 +
				this.minute * 60 +
				this.second) * 1000 + this.tik;
	}

	private void fromTime(int n) {
		this.tik = n % 1000;
		n = (n - this.tik) / 1000;
		this.second = n % 60;
		n = (n - this.second) / 60;
		this.minute = n % 60;
		this.hour = (n - this.minute) / 60;
	}
}

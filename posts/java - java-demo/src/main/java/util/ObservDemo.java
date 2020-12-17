package util;

import java.util.Observable;
import java.util.Observer;

public class ObservDemo {

	public static void main(String[] args) {
		MyView view = new MyView();
		MyModel model = new MyModel();
		model.addObserver(view);
		model.changeSomething();
	}
}

/** The Observer normally maintains a view on the data */
class MyView implements Observer {
	/** For now, we just print the fact that we got notified. */
	@Override
	public void update(Observable obs, Object x) {
		System.out.println("update(" + obs + ", " + x + ")");
	}
}

/** The Observable normally maintains the data */
class MyModel extends Observable {
	private int myNumber = 0;

	public void changeSomething() {
		myNumber = 10;
		// Notify observers of change
		setChanged();
		notifyObservers();
	}

	@Override
	public String toString() {
		return "Observable: " + myNumber;
	}
}

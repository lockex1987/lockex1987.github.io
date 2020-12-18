package awt;

import java.awt.*;
import java.awt.event.*;

public class CheckboxDemo extends Checkbox {
	private Button b;

	public CheckboxDemo() {
		super("Check box", true);
		Frame f = new Frame("Checkbox Demo");
		f.setSize(400, 200);
		f.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we) {
				System.exit(0);
			}
		});
		f.setVisible(true);
		f.setLayout(null);
		b = new Button("HIDE - SHOW");
		f.add(b);
		f.add(this);
		b.setBounds(50, 50, 100, 20);
		setBounds(50, 100, 80, 10);
		setBackground(Color.yellow);
		addItemListener(new ItemListener() {
			public void itemStateChanged(ItemEvent ie) {
				b.setVisible((ie.getStateChange() == ItemEvent.SELECTED) ? true : false);
				System.out.println(getState());
			}
		});
	}

	public static void main(String[] args) {
		new CheckboxDemo();
	}
}
package awt;

import java.awt.*;

import java.awt.event.*;

public class ButtonDemo extends Button implements ActionListener {
	private boolean x = true;

	public ButtonDemo() {
		super("Press me");
		Frame f = new Frame("Button Demo");
		f.setVisible(true);
		f.setSize(300, 200);
		setBackground(Color.red);
		setForeground(Color.yellow);
		setFont(new Font("Arial", Font.BOLD, 13));
		addActionListener(this);
		f.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we) {
				System.exit(1);
			}	
		});
		f.add(this);
		setBounds(5, 30, 200, 30);
	}

	public void actionPerformed(ActionEvent ae) {
		if(x) {
			System.out.println("Really?");
			setLabel("I love U");
		}
		else {
			System.out.println("Yes, I do");
			setLabel("Do you love me?");
		}
		x = !x;
	}

	public static void main(String[] args) {
		new ButtonDemo();
	}
}
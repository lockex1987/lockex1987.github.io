package awt;

import java.awt.*;
import java.awt.event.*;
import javax.swing.plaf.*;

public class LabelDemo extends Frame {
	private Label l1 = new Label();
	private Label l2 = new Label("I love U");
	private Label l3 = new Label("Nguy\u1EC5n Th\u1ECB", Label.CENTER);   // RIGHT, CENTER, RIGHT

	public LabelDemo() {
		super("Test Label");
		System.out.println(l1.getText()+"\t"+l1.getAlignment());
		System.out.println(l2.getText()+"\t"+l2.getAlignment());
		System.out.println(l3.getText()+"\t"+l3.getAlignment());
		l1.setText("Italy");
		l1.setAlignment(Label.RIGHT);
		l3.setFont(new FontUIResource("Courier", Font.PLAIN, 16));
		System.out.println(l3.getFont());
		setBackground(Color.black);
		setForeground(Color.yellow);
		setSize(new Dimension(500, 300));
		setLayout(new GridLayout(4, 1));
		add(l1);
		add(l2);
		add(l3);
		addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent we) {
				System.exit(0);
			}	
		});
		setVisible(true);
	}

	public static void main(String[] args) {
		new LabelDemo();
	}
}
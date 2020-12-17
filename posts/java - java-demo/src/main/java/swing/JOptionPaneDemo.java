package swing;

import java.awt.*;
import javax.swing.*;

public class JOptionPaneDemo {
	private String s1, s2, s3;
	private Object[] object = {"First", "Second", "Third"};
	private Object objectSelected;

	public JOptionPaneDemo() {
		//message
		/*
		JOptionPane.showMessageDialog(null, "Normal message");
		JOptionPane.showMessageDialog(null, "Information", "Title",JOptionPane.INFORMATION_MESSAGE);
		JOptionPane.showMessageDialog(null, "Warning",     "Title",JOptionPane.WARNING_MESSAGE);
		JOptionPane.showMessageDialog(null, "Error",       "Title",JOptionPane.ERROR_MESSAGE);
		JOptionPane.showMessageDialog(null, "Plain",       "Title",JOptionPane.PLAIN_MESSAGE);
		JOptionPane.showMessageDialog(null, "Question",    "Title",JOptionPane.QUESTION_MESSAGE, new ImageIcon ("1.JPG"));
		*/
		/*
		//input
		s1 = JOptionPane.showInputDialog("What is your name?");
		s2 = JOptionPane.showInputDialog(null, "What is your job?");
		s3 = JOptionPane.showInputDialog(null, "How old are you?", "Title",JOptionPane.QUESTION_MESSAGE);
		objectSelected = JOptionPane.showInputDialog(null, "Choose one", "Input",JOptionPane.INFORMATION_MESSAGE,new ImageIcon("1.JPG"),object, object[1]);
		if(objectSelected.equals(object[0])) System.out.println ("First");
		else if(objectSelected.equals(object[1])) System.out.println("Second");
		else if(objectSelected.equals(object[2])) System.out.println("Third");
		*/

		//confirm
		//int i1 = JOptionPane.showConfirmDialog(null, "Name: "+s1);
		//int i2 = JOptionPane.showConfirmDialog(null, s2, "Job", JOptionPane.DEFAULT_OPTION);
		//int i3 = JOptionPane.showConfirmDialog(null, s3, "Age", JOptionPane.YES_NO_OPTION, JOptionPane.WARNING_MESSAGE);
		//int i4 = JOptionPane.showConfirmDialog(null, object, "Chose", JOptionPane.OK_CANCEL_OPTION, JOptionPane.ERROR_MESSAGE, new ImageIcon("1.JPG"));
		int i4 = 0; //JOptionPane.showConfirmDialog(null, new JScrollBar(new JTextArea()), "Chose", JOptionPane.OK_CANCEL_OPTION, JOptionPane.ERROR_MESSAGE);
		//System.out.println(i1+"\n"+i2+"\n"+i3+"\n"+i4);
		if(i4 == JOptionPane.OK_OPTION) System.out.println("You have chosen YES");
		else if(i4 == JOptionPane.CANCEL_OPTION) System.out.println("You have chosen NO");
		/*
		//option
		Object[] o = {"Continue", "Exit"};
		int c = JOptionPane.showOptionDialog(null, "I love U", "NVH", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE, new ImageIcon("1.JPG"), o, o[0]);
		System.out.println("Choose "+((c == 0) ? "Continue" : "Exit"));
		//internal
		*/
		System.exit (0);
	}

	public static void main(String[] args) {
		new JOptionPaneDemo();
	}
}
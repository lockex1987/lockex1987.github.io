import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class SayNumbersExamplePanel extends JPanel {
	private JLabel label = new JLabel("Please type any number and press enter");
	private JTextField textfield = new JTextField(20);
	private JTextField textfield2 = new JTextField(20);
	private SayNumbers sayNumbers = new SayNumbers();

	public SayNumbersExamplePanel(){
		setLayout(new BorderLayout());
		//Add controls
		add(label,BorderLayout.NORTH); 
		add(textfield,BorderLayout.CENTER); 
		textfield.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				try{  
					textfield2.setText(textfield.getText());
					sayNumbers.say(Integer.parseInt(textfield.getText()));              
				} catch (NumberFormatException NFE){
					textfield2.setText("Wrong Number");
				}
				textfield.setText("");
			}
		});
		textfield2.setEditable(false);
		add(textfield2,BorderLayout.SOUTH); 
	}
}
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class SayNumbersExampleWindow extends JFrame{
	private Container container = getContentPane();  
	private SayNumbersExamplePanel sayNumbersExamplePanel = new SayNumbersExamplePanel();
	private JMenuBar bar = new JMenuBar();
	private JMenu menuFile = new JMenu("File");
	private JMenuItem menuExit = new JMenuItem("Exit");
	private JMenu menuHelp = new JMenu("Help");
	private JMenuItem menuAbout = new JMenuItem("About");

	public SayNumbersExampleWindow(String windowName) {
		super(windowName);
		menuExit.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				System.exit(0);  
			}
		});
		menuAbout.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				JOptionPane.showMessageDialog(null,"Say Numbers Example (Created by Michael Margold http://www.soft-collection.com)","About",JOptionPane.INFORMATION_MESSAGE);
			}
		});
		bar.add(menuFile);
		menuFile.add(menuExit);
		menuFile.setMnemonic('F');
		bar.add(menuHelp);
		menuHelp.add(menuAbout);
		menuHelp.setMnemonic('H');
		setJMenuBar(bar);
		container.add(sayNumbersExamplePanel,BorderLayout.CENTER);
		pack();
		setResizable(false);
		show();
	}
}
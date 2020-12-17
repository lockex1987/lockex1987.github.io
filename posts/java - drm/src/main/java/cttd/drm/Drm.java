package cttd.drm;

import java.awt.BorderLayout;
import java.awt.Insets;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;

import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;

public class Drm extends JPanel {

	private static final String NEW_LINE = "\n";

	private String pid;
	private String pythonScript;
	private String defaultFolder;
	private String selectedFile;

	public Drm() {
		super(new BorderLayout());
		readConfig();
		buildGui();
	}

	private void readConfig() {
		pid = CommonUtils.getString("pid");
		pythonScript = CommonUtils.getString("pythonScript");
		defaultFolder = CommonUtils.getString("defaultFolder");
	}

	private void buildGui() {
		JTextArea log = new JTextArea(20, 80);
		log.setMargin(new Insets(5, 5, 5, 5));
		log.setEditable(false);
		JScrollPane localJScrollPane = new JScrollPane(log);

		JFileChooser fc = new JFileChooser();
		fc.setCurrentDirectory(new File(defaultFolder));

		JButton openButton = new JButton("Open");
		openButton.addActionListener(ae -> {
			if (fc.showOpenDialog(this) == 0) {
				selectedFile = fc.getSelectedFile().getAbsolutePath();
				log.append("Choose file: " + selectedFile + "." + NEW_LINE);
			}
		});
		JButton saveButton = new JButton("Save");
		saveButton.addActionListener(ae -> {
			int idx = selectedFile.lastIndexOf(".");
			String extension = selectedFile.substring(idx + 1);
			String newFile = selectedFile.substring(0, idx) + ".decrypted." + extension;

			log.append(newFile + NEW_LINE);
			try {
				Process localProcess = Runtime.getRuntime()
						.exec(new String[] { "python", pythonScript, selectedFile, newFile, pid });
				localProcess.waitFor();
				BufferedReader br = new BufferedReader(new InputStreamReader(localProcess.getInputStream()));
				String line;
				while ((line = br.readLine()) != null) {
					log.append(line + NEW_LINE);
				}
			} catch (Exception ex) {
				ex.printStackTrace();
			}
			log.append("FINISH!" + NEW_LINE);
			log.setCaretPosition(log.getDocument().getLength());
		});

		JPanel localJPanel = new JPanel();
		localJPanel.add(openButton);
		localJPanel.add(saveButton);

		add(localJPanel, "First");
		add(localJScrollPane, "Center");
	}

	private static void createAndShowGui() {
		JFrame localJFrame = new JFrame("Digital Remove");
		localJFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		localJFrame.add(new Drm());
		localJFrame.pack();
		localJFrame.setVisible(true);
	}

	public static void main(String[] paramArrayOfString) {
		SwingUtilities.invokeLater(new Runnable() {
			public void run() {
				UIManager.put("swing.boldMetal", Boolean.FALSE);
				createAndShowGui();
			}
		});
	}
}

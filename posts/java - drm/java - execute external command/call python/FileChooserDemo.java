
import java.awt.BorderLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;

/**
 * Gỡ bỏ mã hóa file PRC bằng MobiDeDRM0.16.py.
 * Cú pháp: python MobiDeDRM0.16.py infile outfile 'PID'
 * VD: python MobiDeDRM0.16.py "3 thien truyen cua fujisawa.prc" 3.prc 'JX2JHLM$WS'
 * Tao danh sach
 * Làm online trên giao diện web.
 */
public class FileChooserDemo extends JPanel implements ActionListener {

    private static final String PID = "JX2JHLM$WS";
    private static final String PYTHON_SCRIPT = "/media/locke/book/MobiDeDRM0.16.py";
    private final JButton openButton, saveButton;
    private final JTextArea log;
    private final JFileChooser fc;
    private String selectedFile;

    public FileChooserDemo() {
	super(new BorderLayout());

	// Create the log first, because the action listeners
	// need to refer to it.
	log = new JTextArea(20, 80);
	log.setMargin(new Insets(5, 5, 5, 5));
	log.setEditable(false);
	JScrollPane logScrollPane = new JScrollPane(log);

	// Create a file chooser
	fc = new JFileChooser();
	//fc.setCurrentDirectory(new File("."));
	fc.setCurrentDirectory(new File("/media/locke/book/"));

	// Uncomment one of the following lines to try a different
	//file selection mode.  The first allows just directories
	// to be selected (and, at least in the Java look and feel,
	// shown).  The second allows both files and directories
	// to be selected.  If you leave these lines commented out,
	// then the default mode (FILES_ONLY) will be used.
	//
	//fc.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
	//fc.setFileSelectionMode(JFileChooser.FILES_AND_DIRECTORIES);
	// Create buttons
	openButton = new JButton("Open");
	openButton.addActionListener(this);
	saveButton = new JButton("Save");
	saveButton.addActionListener(this);

	// For layout purposes, put the buttons in a separate panel
	JPanel buttonPanel = new JPanel(); // use FlowLayout
	buttonPanel.add(openButton);
	buttonPanel.add(saveButton);

	// Add the buttons and the log to this panel.
	add(buttonPanel, BorderLayout.PAGE_START);
	add(logScrollPane, BorderLayout.CENTER);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
	if (e.getSource() == openButton) {
	    int returnVal = fc.showOpenDialog(FileChooserDemo.this);
	    if (returnVal == JFileChooser.APPROVE_OPTION) {
		selectedFile = fc.getSelectedFile().getAbsolutePath();
		log.append("Choose file: " + selectedFile + ".\n");
	    }
	} else if (e.getSource() == saveButton) {
	    int index = selectedFile.lastIndexOf(".");
	    String extension = selectedFile.substring(index + 1);
	    String outputFile = selectedFile.substring(0, index) + ".decrypted." + extension;

	    log.append(removeDrm(selectedFile, outputFile));
	    log.append("FINISH!\n");
	}
	log.setCaretPosition(log.getDocument().getLength());
    }

    /**
     * Viết hàm utils thế này và có thể sử dụng ở module web.
     *
     * @param inputFile Đường dẫn đầy đủ đến file đầu vào
     * @param outputFile Đường dẫn đầy đủ đến file đầu ra
     * @return Output kết quả của thao tác
     */
    public static String removeDrm(String inputFile, String outputFile) {
	try {
	    StringBuilder sb = new StringBuilder();
	    Process process = Runtime.getRuntime().exec(new String[]{
		"python",
		PYTHON_SCRIPT,
		inputFile,
		outputFile,
		PID
	    });
	    process.waitFor();
	    BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
	    String line;
	    while ((line = reader.readLine()) != null) {
		sb.append(line).append("\n");
	    }
	    return sb.toString();
	} catch (IOException | InterruptedException ex) {
	    return ex.getMessage();
	}
    }

    /**
     * Create the GUI and show it. For thread safety, this method should be
     * invoked from the event dispatch thread.
     */
    private static void createAndShowGUI() {
	// Create and set up the window.
	JFrame frame = new JFrame("FileChooserDemo");
	frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	// Add content to the window.
	frame.add(new FileChooserDemo());
	// Display the window.
	frame.pack();
	frame.setVisible(true);
    }

    public static void main(String[] args) {
	// Schedule a job for the event dispatch thread:
	// creating and showing this application's GUI.
	SwingUtilities.invokeLater(new Runnable() {
	    @Override
	    public void run() {
		// Turn off metal's use of bold fonts
		UIManager.put("swing.boldMetal", Boolean.FALSE);
		createAndShowGUI();
	    }
	});
    }
}

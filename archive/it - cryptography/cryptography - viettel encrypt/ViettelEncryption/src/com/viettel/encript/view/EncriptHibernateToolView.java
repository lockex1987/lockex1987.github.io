package com.viettel.encript.view;

import com.viettel.common.util.SecurityUtil;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import javax.swing.ActionMap;
import javax.swing.GroupLayout;
import javax.swing.Icon;
import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JProgressBar;
import javax.swing.JScrollPane;
import javax.swing.JSeparator;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.LayoutStyle;
import javax.swing.Timer;
import org.jdesktop.application.Action;
import org.jdesktop.application.Application;
import org.jdesktop.application.FrameView;
import org.jdesktop.application.ResourceMap;
import org.jdesktop.application.SingleFrameApplication;
import org.jdesktop.application.TaskMonitor;

public class EncriptHibernateToolView extends FrameView {

    private JButton jButton1;
    private JButton jButton2;
    private JLabel jLabel1;
    private JLabel jLabel2;
    private JLabel jLabel3;
    private JLabel jLabel4;
    private JLabel jLabel5;
    private JLabel jLabel6;
    private JScrollPane jScrollPane1;
    private JTextArea jTextArea1;
    private JTextField jTextField1;
    private JTextField jTextField2;
    private JTextField jTextField3;
    private JTextField jTextField4;
    private JTextField jTextField5;
    private JPanel mainPanel;
    private JMenuBar menuBar;
    private JProgressBar progressBar;
    private JLabel statusAnimationLabel;
    private JLabel statusMessageLabel;
    private JPanel statusPanel;
    private final Timer messageTimer;
    private final Timer busyIconTimer;
    private final Icon idleIcon;
    private final Icon[] busyIcons = new Icon[15];
    private int busyIconIndex = 0;
    private JDialog aboutBox;

    public EncriptHibernateToolView(SingleFrameApplication app) {
        super(app);

        initComponents();

        ResourceMap resourceMap = getResourceMap();
        int messageTimeout = resourceMap.getInteger("StatusBar.messageTimeout").intValue();
        this.messageTimer = new Timer(messageTimeout, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                EncriptHibernateToolView.this.statusMessageLabel.setText("");
            }
        });
        this.messageTimer.setRepeats(false);
        int busyAnimationRate = resourceMap.getInteger("StatusBar.busyAnimationRate").intValue();
        for (int i = 0; i < this.busyIcons.length; i++) {
            this.busyIcons[i] = resourceMap.getIcon("StatusBar.busyIcons[" + i + "]");
        }
        this.busyIconTimer = new Timer(busyAnimationRate, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                //TODO: EncriptHibernateToolView.access$102(EncriptHibernateToolView.this, (EncriptHibernateToolView.this.busyIconIndex + 1) % EncriptHibernateToolView.this.busyIcons.length);
                EncriptHibernateToolView.this.statusAnimationLabel.setIcon(EncriptHibernateToolView.this.busyIcons[EncriptHibernateToolView.this.busyIconIndex]);
            }
        });
        this.idleIcon = resourceMap.getIcon("StatusBar.idleIcon");
        this.statusAnimationLabel.setIcon(this.idleIcon);
        this.progressBar.setVisible(false);

        TaskMonitor taskMonitor = new TaskMonitor(getApplication().getContext());
        taskMonitor.addPropertyChangeListener(new PropertyChangeListener() {
            @Override
            public void propertyChange(PropertyChangeEvent evt) {
                String propertyName = evt.getPropertyName();
                if ("started".equals(propertyName)) {
                    if (!EncriptHibernateToolView.this.busyIconTimer.isRunning()) {
                        EncriptHibernateToolView.this.statusAnimationLabel.setIcon(EncriptHibernateToolView.this.busyIcons[0]);
                        //TODO: EncriptHibernateToolView.access$102(EncriptHibernateToolView.this, 0);
                        EncriptHibernateToolView.this.busyIconTimer.start();
                    }
                    EncriptHibernateToolView.this.progressBar.setVisible(true);
                    EncriptHibernateToolView.this.progressBar.setIndeterminate(true);
                } else if ("done".equals(propertyName)) {
                    EncriptHibernateToolView.this.busyIconTimer.stop();
                    EncriptHibernateToolView.this.statusAnimationLabel.setIcon(EncriptHibernateToolView.this.idleIcon);
                    EncriptHibernateToolView.this.progressBar.setVisible(false);
                    EncriptHibernateToolView.this.progressBar.setValue(0);
                } else if ("message".equals(propertyName)) {
                    String text = (String) (String) evt.getNewValue();
                    EncriptHibernateToolView.this.statusMessageLabel.setText(text == null ? "" : text);
                    EncriptHibernateToolView.this.messageTimer.restart();
                } else if ("progress".equals(propertyName)) {
                    int value = ((Integer) (Integer) evt.getNewValue()).intValue();
                    EncriptHibernateToolView.this.progressBar.setVisible(true);
                    EncriptHibernateToolView.this.progressBar.setIndeterminate(false);
                    EncriptHibernateToolView.this.progressBar.setValue(value);
                }
            }
        });
    }

    @Action
    public void showAboutBox() {
        if (this.aboutBox == null) {
            JFrame mainFrame = EncriptHibernateToolApp.getApplication().getMainFrame();
            this.aboutBox = new EncriptHibernateToolAboutBox(mainFrame);
            this.aboutBox.setLocationRelativeTo(mainFrame);
        }
        EncriptHibernateToolApp.getApplication().show(this.aboutBox);
    }

    private void initComponents() {
        this.mainPanel = new JPanel();
        this.jLabel1 = new JLabel();
        this.jTextField1 = new JTextField();
        this.jButton1 = new JButton();
        this.jLabel2 = new JLabel();
        this.jTextField2 = new JTextField();
        this.jButton2 = new JButton();
        this.jScrollPane1 = new JScrollPane();
        this.jTextArea1 = new JTextArea();
        this.jLabel3 = new JLabel();
        this.jLabel4 = new JLabel();
        this.jLabel5 = new JLabel();
        this.jTextField3 = new JTextField();
        this.jTextField4 = new JTextField();
        this.jTextField5 = new JTextField();
        this.jLabel6 = new JLabel();
        this.menuBar = new JMenuBar();
        JMenu fileMenu = new JMenu();
        JMenuItem exitMenuItem = new JMenuItem();
        this.statusPanel = new JPanel();
        JSeparator statusPanelSeparator = new JSeparator();
        this.statusMessageLabel = new JLabel();
        this.statusAnimationLabel = new JLabel();
        this.progressBar = new JProgressBar();

        this.mainPanel.setName("mainPanel");
        this.mainPanel.setPreferredSize(new Dimension(600, 450));

        ResourceMap resourceMap = ((EncriptHibernateToolApp) Application.getInstance(EncriptHibernateToolApp.class)).getContext().getResourceMap(EncriptHibernateToolView.class);
        this.jLabel1.setText(resourceMap.getString("jLabel1.text", new Object[0]));
        this.jLabel1.setName("jLabel1");

        this.jTextField1.setText(resourceMap.getString("jTextField1.text", new Object[0]));
        this.jTextField1.setName("jTextField1");

        this.jButton1.setText(resourceMap.getString("jButton1.text", new Object[0]));
        this.jButton1.setName("jButton1");
        this.jButton1.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent evt) {
                EncriptHibernateToolView.this.jButton1ActionPerformed(evt);
            }
        });
        this.jLabel2.setText(resourceMap.getString("jLabel2.text", new Object[0]));
        this.jLabel2.setName("jLabel2");

        this.jTextField2.setText(resourceMap.getString("jTextField2.text", new Object[0]));
        this.jTextField2.setName("jTextField2");

        this.jButton2.setText(resourceMap.getString("jButton2.text", new Object[0]));
        this.jButton2.setName("jButton2");
        this.jButton2.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent evt) {
                EncriptHibernateToolView.this.jButton2ActionPerformed(evt);
            }
        });
        this.jScrollPane1.setName("jScrollPane1");

        this.jTextArea1.setColumns(20);
        this.jTextArea1.setRows(5);
        this.jTextArea1.setName("jTextArea1");
        this.jScrollPane1.setViewportView(this.jTextArea1);

        this.jLabel3.setText(resourceMap.getString("jLabel3.text", new Object[0]));
        this.jLabel3.setName("jLabel3");

        this.jLabel4.setText(resourceMap.getString("jLabel4.text", new Object[0]));
        this.jLabel4.setName("jLabel4");

        this.jLabel5.setText(resourceMap.getString("jLabel5.text", new Object[0]));
        this.jLabel5.setName("jLabel5");

        this.jTextField3.setText(resourceMap.getString("jTextField3.text", new Object[0]));
        this.jTextField3.setName("jTextField3");

        this.jTextField4.setText(resourceMap.getString("jTextField4.text", new Object[0]));
        this.jTextField4.setName("jTextField4");

        this.jTextField5.setText(resourceMap.getString("jTextField5.text", new Object[0]));
        this.jTextField5.setName("jTextField5");

        this.jLabel6.setFont(resourceMap.getFont("jLabel6.font"));
        this.jLabel6.setForeground(resourceMap.getColor("jLabel6.foreground"));
        this.jLabel6.setHorizontalAlignment(0);
        this.jLabel6.setText(resourceMap.getString("jLabel6.text", new Object[0]));
        this.jLabel6.setName("jLabel6");

        GroupLayout mainPanelLayout = new GroupLayout(this.mainPanel);
        this.mainPanel.setLayout(mainPanelLayout);
        mainPanelLayout.setHorizontalGroup(mainPanelLayout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(mainPanelLayout.createSequentialGroup().addGroup(mainPanelLayout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(mainPanelLayout.createSequentialGroup().addContainerGap().addComponent(this.jScrollPane1, -1, 605, 32767)).addGroup(mainPanelLayout.createSequentialGroup().addGroup(mainPanelLayout.createParallelGroup(GroupLayout.Alignment.TRAILING).addGroup(GroupLayout.Alignment.LEADING, mainPanelLayout.createSequentialGroup().addGap(32, 32, 32).addGroup(mainPanelLayout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(mainPanelLayout.createSequentialGroup().addGroup(mainPanelLayout.createParallelGroup(GroupLayout.Alignment.TRAILING).addComponent(this.jLabel3).addComponent(this.jLabel4)).addGap(18, 18, 18).addGroup(mainPanelLayout.createParallelGroup(GroupLayout.Alignment.LEADING).addComponent(this.jTextField3, -2, 371, -2).addComponent(this.jTextField4, -1, 371, 32767))).addGroup(mainPanelLayout.createSequentialGroup().addComponent(this.jLabel5).addGap(18, 18, 18).addComponent(this.jTextField5, -1, 372, 32767)))).addGroup(GroupLayout.Alignment.LEADING, mainPanelLayout.createSequentialGroup().addGap(70, 70, 70).addGroup(mainPanelLayout.createParallelGroup(GroupLayout.Alignment.TRAILING).addGroup(mainPanelLayout.createSequentialGroup().addComponent(this.jLabel2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jTextField2, -2, 342, -2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jButton2, -2, 71, -2)).addGroup(mainPanelLayout.createSequentialGroup().addComponent(this.jLabel1).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jTextField1, -2, 342, -2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jButton1, -2, 73, -2))))).addGap(41, 41, 41)).addGroup(mainPanelLayout.createSequentialGroup().addGap(256, 256, 256).addComponent(this.jLabel6))).addContainerGap()));

        mainPanelLayout.setVerticalGroup(mainPanelLayout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(mainPanelLayout.createSequentialGroup().addContainerGap().addGroup(mainPanelLayout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jButton1).addComponent(this.jLabel1).addComponent(this.jTextField1, -2, -1, -2)).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.jScrollPane1, -2, 169, -2).addPreferredGap(LayoutStyle.ComponentPlacement.UNRELATED).addGroup(mainPanelLayout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jButton2).addComponent(this.jLabel2).addComponent(this.jTextField2, -2, -1, -2)).addGap(18, 18, 18).addGroup(mainPanelLayout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jLabel3).addComponent(this.jTextField3, -2, -1, -2)).addGap(18, 18, 18).addGroup(mainPanelLayout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jLabel4).addComponent(this.jTextField4, -2, -1, -2)).addGap(18, 18, 18).addGroup(mainPanelLayout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.jLabel5).addComponent(this.jTextField5, -2, -1, -2)).addGap(32, 32, 32).addComponent(this.jLabel6).addContainerGap(77, 32767)));

        this.menuBar.setName("menuBar");

        fileMenu.setText(resourceMap.getString("fileMenu.text", new Object[0]));
        fileMenu.setName("fileMenu");

        ActionMap actionMap = ((EncriptHibernateToolApp) Application.getInstance(EncriptHibernateToolApp.class)).getContext().getActionMap(EncriptHibernateToolView.class, this);
        exitMenuItem.setAction(actionMap.get("quit"));
        exitMenuItem.setName("exitMenuItem");
        fileMenu.add(exitMenuItem);

        this.menuBar.add(fileMenu);

        this.statusPanel.setName("statusPanel");

        statusPanelSeparator.setName("statusPanelSeparator");

        this.statusMessageLabel.setName("statusMessageLabel");

        this.statusAnimationLabel.setHorizontalAlignment(2);
        this.statusAnimationLabel.setName("statusAnimationLabel");

        this.progressBar.setName("progressBar");

        GroupLayout statusPanelLayout = new GroupLayout(this.statusPanel);
        this.statusPanel.setLayout(statusPanelLayout);
        statusPanelLayout.setHorizontalGroup(statusPanelLayout.createParallelGroup(GroupLayout.Alignment.LEADING).addComponent(statusPanelSeparator, -1, 625, 32767).addGroup(statusPanelLayout.createSequentialGroup().addContainerGap().addComponent(this.statusMessageLabel).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED, 455, 32767).addComponent(this.progressBar, -2, -1, -2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(this.statusAnimationLabel).addContainerGap()));

        statusPanelLayout.setVerticalGroup(statusPanelLayout.createParallelGroup(GroupLayout.Alignment.LEADING).addGroup(statusPanelLayout.createSequentialGroup().addComponent(statusPanelSeparator, -2, 2, -2).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED, -1, 32767).addGroup(statusPanelLayout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(this.statusMessageLabel).addComponent(this.statusAnimationLabel).addComponent(this.progressBar, -2, -1, -2)).addGap(3, 3, 3)));

        setComponent(this.mainPanel);
        setMenuBar(this.menuBar);
        setStatusBar(this.statusPanel);
    }

    private void jButton1ActionPerformed(ActionEvent evt) {
        JFileChooser fileopen = new JFileChooser();
        fileopen.setCurrentDirectory(new File("."));

        int ret = fileopen.showDialog(null, "Open file");

        if (ret == 0) {
            File file = fileopen.getSelectedFile();

            String path = file.getPath();
            this.jTextField1.setText(path);

            SecurityUtil securityUtil = new SecurityUtil();
            //String decryptString = EncryptDecryptUtils.decryptFile(URLDecoder.decode(path));
            String decryptString = securityUtil.decryptFile(path);
            String[] properties = decryptString.split("\r\n");
            String server = "";
            String userName = "";
            String password = "";
            if (properties.length >= 3) {
                server = properties[0].trim();
                userName = properties[1].trim();
                password = properties[2].trim();
            }

            this.jTextArea1.setText(server + "\n" + userName + "\n" + password);
        }
    }

    private void jButton2ActionPerformed(ActionEvent evt) {
        String url = this.jTextField3.getText().trim();
        String username = this.jTextField4.getText().trim();
        String password = this.jTextField5.getText().trim();

        String strFileContent = "hibernate.connection.url=" + url + "\r\n";
        strFileContent = strFileContent + "hibernate.connection.username=" + username + "\r\n";
        if (!"".equals(password)) {
            strFileContent = strFileContent + "hibernate.connection.password=" + password + "\r\n";
        }

        if (("".equals(url)) || ("".equals(username)) || ("".equals(password))) {
            this.jLabel6.setText("Nhập thiếu thông tin");
            return;
        }

        JFileChooser fileopen = new JFileChooser();
        fileopen.setCurrentDirectory(new File("."));

        int ret = fileopen.showDialog(null, "Save");

        if (ret == 0) {
            String outPath = fileopen.getSelectedFile().getPath();
            System.out.print(outPath);
            try {
                OutputStream out = new FileOutputStream(outPath);
                SecurityUtil securityUtil = new SecurityUtil();
                //out.write(EncryptDecryptUtils.encrypt(strFileContent.getBytes()));
                out.write( securityUtil.encrypt(strFileContent.getBytes()) );
                out.close();
                this.jLabel6.setText("Mã hóa thành công");
                this.jTextField2.setText(outPath);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }
}

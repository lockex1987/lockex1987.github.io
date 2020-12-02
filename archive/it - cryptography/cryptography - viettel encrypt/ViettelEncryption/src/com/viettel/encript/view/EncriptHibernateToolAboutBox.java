package com.viettel.encript.view;

import java.awt.Frame;
import javax.swing.ActionMap;
import javax.swing.GroupLayout;
import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.LayoutStyle;
import org.jdesktop.application.Action;
import org.jdesktop.application.Application;
import org.jdesktop.application.ResourceMap;

public class EncriptHibernateToolAboutBox extends JDialog {

    private JButton closeButton;

    public EncriptHibernateToolAboutBox(Frame parent) {
        super(parent);
        initComponents();
        getRootPane().setDefaultButton(this.closeButton);
    }

    @Action
    public void closeAboutBox() {
        dispose();
    }

    private void initComponents() {
        this.closeButton = new JButton();
        JLabel appTitleLabel = new JLabel();
        JLabel versionLabel = new JLabel();
        JLabel appVersionLabel = new JLabel();
        JLabel vendorLabel = new JLabel();
        JLabel appVendorLabel = new JLabel();
        JLabel homepageLabel = new JLabel();
        JLabel appHomepageLabel = new JLabel();
        JLabel appDescLabel = new JLabel();
        JLabel imageLabel = new JLabel();

        setDefaultCloseOperation(2);
        ResourceMap resourceMap = ((EncriptHibernateToolApp) Application.getInstance(EncriptHibernateToolApp.class)).getContext().getResourceMap(EncriptHibernateToolAboutBox.class);
        setTitle(resourceMap.getString("title", new Object[0]));
        setModal(true);
        setName("aboutBox");
        setResizable(false);

        ActionMap actionMap = ((EncriptHibernateToolApp) Application.getInstance(EncriptHibernateToolApp.class)).getContext().getActionMap(EncriptHibernateToolAboutBox.class, this);
        this.closeButton.setAction(actionMap.get("closeAboutBox"));
        this.closeButton.setName("closeButton");

        appTitleLabel.setFont(appTitleLabel.getFont().deriveFont(appTitleLabel.getFont().getStyle() | 0x1, appTitleLabel.getFont().getSize() + 4));
        appTitleLabel.setText(resourceMap.getString("Application.title", new Object[0]));
        appTitleLabel.setName("appTitleLabel");

        versionLabel.setFont(versionLabel.getFont().deriveFont(versionLabel.getFont().getStyle() | 0x1));
        versionLabel.setText(resourceMap.getString("versionLabel.text", new Object[0]));
        versionLabel.setName("versionLabel");

        appVersionLabel.setText(resourceMap.getString("Application.version", new Object[0]));
        appVersionLabel.setName("appVersionLabel");

        vendorLabel.setFont(vendorLabel.getFont().deriveFont(vendorLabel.getFont().getStyle() | 0x1));
        vendorLabel.setText(resourceMap.getString("vendorLabel.text", new Object[0]));
        vendorLabel.setName("vendorLabel");

        appVendorLabel.setText(resourceMap.getString("Application.vendor", new Object[0]));
        appVendorLabel.setName("appVendorLabel");

        homepageLabel.setFont(homepageLabel.getFont().deriveFont(homepageLabel.getFont().getStyle() | 0x1));
        homepageLabel.setText(resourceMap.getString("homepageLabel.text", new Object[0]));
        homepageLabel.setName("homepageLabel");

        appHomepageLabel.setText(resourceMap.getString("Application.homepage", new Object[0]));
        appHomepageLabel.setName("appHomepageLabel");

        appDescLabel.setText(resourceMap.getString("appDescLabel.text", new Object[0]));
        appDescLabel.setName("appDescLabel");

        imageLabel.setIcon(resourceMap.getIcon("imageLabel.icon"));
        imageLabel.setName("imageLabel");

        GroupLayout layout = new GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING)
                .addGroup(layout.createSequentialGroup().addComponent(imageLabel).addGap(18, 18, 18)
                        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.TRAILING)
                                .addGroup(GroupLayout.Alignment.LEADING, layout.createSequentialGroup()
                                        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING)
                                                .addComponent(versionLabel).addComponent(vendorLabel)
                                                .addComponent(homepageLabel))
                                        .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                                        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING)
                                                .addComponent(appVersionLabel).addComponent(appVendorLabel)
                                                .addComponent(appHomepageLabel))).addComponent(appTitleLabel, GroupLayout.Alignment.LEADING)
                                .addComponent(appDescLabel, GroupLayout.Alignment.LEADING, -1, 266, 32767)
                                .addComponent(this.closeButton)).addContainerGap()));

        layout.setVerticalGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING)
                .addComponent(imageLabel, -2, -1, 32767)
                .addGroup(layout.createSequentialGroup().addContainerGap().addComponent(appTitleLabel)
                        .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addComponent(appDescLabel)
                        .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED).addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE)
                                .addComponent(versionLabel).addComponent(appVersionLabel))
                        .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(vendorLabel)
                                .addComponent(appVendorLabel)).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE).addComponent(homepageLabel)
                                .addComponent(appHomepageLabel)).addPreferredGap(LayoutStyle.ComponentPlacement.RELATED, 19, 32767)
                        .addComponent(this.closeButton).addContainerGap()));

        pack();
    }
}

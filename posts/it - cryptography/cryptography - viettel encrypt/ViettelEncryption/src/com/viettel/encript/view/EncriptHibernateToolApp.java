package com.viettel.encript.view;

import java.awt.Window;
import org.jdesktop.application.Application;
import org.jdesktop.application.SingleFrameApplication;

public class EncriptHibernateToolApp extends SingleFrameApplication {

    @Override
    protected void startup() {
        show(new EncriptHibernateToolView(this));
    }

    @Override
    protected void configureWindow(Window root) {
    }

    public static EncriptHibernateToolApp getApplication() {
        return (EncriptHibernateToolApp) Application.getInstance(EncriptHibernateToolApp.class);
    }

    public static void main(String[] args) {
        launch(EncriptHibernateToolApp.class, args);
    }
}

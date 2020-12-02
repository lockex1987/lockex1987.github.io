package swing;


import java.awt.*;
import javax.swing.*;
import java.awt.event.*;

public class JWindowDemo extends JWindow {

    private int x, y;
    private int width, height;
    private Image image;

    public JWindowDemo() {
        super(new Frame());
        image = Toolkit.getDefaultToolkit().createImage("JWindowDemo.jpg");
        width = image.getWidth(this);
        height = image.getHeight(this);
        width = 400;
        height = 500;
        //GraphicsEnvironment.getLocalGraphicsEnvironment().getDefaultScreenDevice().setFullScreenWindow(this);
        //setBounds(100, 100, 300, 100);
        addMouseMotionListener(new MouseMotionAdapter() {

            @Override
            public void mouseDragged(MouseEvent e) {
                setLocation(e.getXOnScreen() - x, e.getYOnScreen() - y);
            }
        });
        addMouseListener(new MouseAdapter() {

            @Override
            public void mousePressed(MouseEvent e) {
                x = e.getX();
                y = e.getY();
            }
        });

        setSize(width, height);
        setVisible(true);
        //setAlwaysOnTop(true);
        //setBackground(Color.PINK);

//        ExitButton b = new ExitButton();
//        setLayout(null);
//        add(b);
//        b.setBounds(getWidth() - 50, 10, 30, 30);
//        b.setBackground(Color.PINK);
    }

    @Override
    public void paint(Graphics g) {
        g.drawImage(image, 0, 0, this);
    }

    public static void main(String[] args) {
        new JWindowDemo();
    }
}

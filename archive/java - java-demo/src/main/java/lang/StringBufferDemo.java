package lang;


public class StringBufferDemo {

    public StringBufferDemo() {
//        StringBuffer s = new StringBuffer("neyuH");
//        s.insert(0, "napaJ sevol ");
//        s.reverse();
//        System.out.println(s);
        String s = "admin (a, b, ";
        s = s.substring(0, s.length() - 2);
        s = s + ")";
        System.out.println("<" + s + ">");
    }

    public static void main(String args[]) {
        new StringBufferDemo();
    }
}
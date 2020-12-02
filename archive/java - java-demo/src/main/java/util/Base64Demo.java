package util;

import java.util.Base64;

public class Base64Demo {

    public static void main(String[] args) throws Exception {
        // Xâu ban đầu
        // Chú ý:
        // - xâu bình thường
        // - xâu UTF-8
        // - xâu URL
        //String original = "Test";
    	String original = "Tiếng Việt Cao Thị Thùy Dương Nguyễn Văn Huyên";
        //String original = "https://www.google.co.nz/?gfe_rd=cr&ei=dzbFV&gws_rd=ssl#q=java";
    	//String original = "TutorialsPoint?java8";
        System.out.println("Original: " + original);

        demoBasic(original);
        demoUrl(original);
        demoBasicUtf8(original);
        demoUrlUtf8(original);
        
        // Giá trị lấy từ https://www.base64encode.org/
        String expectedString = "VGnhur9uZyBWaeG7h3QgQ2FvIFRo4buLIFRow7l5IETGsMahbmcgTmd1eeG7hW4gVsSDbiBIdXnDqm4=";
        System.out.println("Expected:\n " + expectedString);
    }

    private static void demoBasic(String original) {
        byte[] encodedBytes = Base64.getEncoder().encode(original.getBytes());
        //String encodedString = new String(encodedBytes);
        String encodedString = Base64.getEncoder().encodeToString(original.getBytes());
        System.out.println("Encoded:\n " + encodedString);

        byte[] decodedBytes = Base64.getDecoder().decode(encodedBytes);
        String decodedString = new String(decodedBytes);
        System.out.println("Decoded:\n " + decodedString);
    }

    private static void demoUrl(String original) {
        String encodedString = Base64.getUrlEncoder().encodeToString(original.getBytes());
        System.out.println("Encoded (URL):\n " + encodedString);
        
        byte[] decodedBytes = Base64.getUrlDecoder().decode(encodedString);
        String decodedString = new String(decodedBytes);
        System.out.println("Decoded (URL):\n " + decodedString);
    }

    private static void demoBasicUtf8(String original) throws Exception {
        String encodedString = Base64.getEncoder().encodeToString(original.getBytes("utf-8"));
        System.out.println("Encoded (UTF-8):\n " + encodedString);

        byte[] decodedBytes = Base64.getDecoder().decode(encodedString);
        String decodedString = new String(decodedBytes, "utf-8");
        System.out.println("Decoded (UTF-8):\n " + decodedString);
    }

    private static void demoUrlUtf8(String original) throws Exception {
        String encodedString = Base64.getUrlEncoder().encodeToString(original.getBytes("utf-8"));
        System.out.println("Encoded (URL and UTF-8):\n " + encodedString);

        byte[] decodedBytes = Base64.getUrlDecoder().decode(encodedString);
        String decodedString = new String(decodedBytes, "utf-8");
        System.out.println("Decoded (URL and UTF-8):\n " + decodedString);
    }
}

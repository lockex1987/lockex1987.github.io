package lang;

import java.util.*;
import java.util.regex.*;

public class StringDemo {
	//String test
	public StringDemo() {
		/*
		String a = "I love you";
		String b = "I love You";
		String c = " 	I  love	you  ";
		println("ACCESS");
		//substring();
		//getChars(); getBytes ();
		//toCharArrray ();
		for (int i = 0; i < a.length(); i++)
			println(i+". "+a.charAt(i));
		println("COMPARE");
		println(a.equals(b));
		println(a.equalsIgnoreCase(b));
		println(a.startsWith("I L"));
		println(a.endsWith(b));
		println(a.compareTo(b));
		//rgionMatches();
		println("SEARCH");
		println(a.indexOf('l'));
		println(a.lastIndexOf("ve"));
		println("MANIPULATE");
		//returns another string, does not change source string
		println(a.concat(" forever"));
		println(a.toLowerCase());
		println(a.toUpperCase());
		println(a.replace('I', 'H'));
		println(a+". Do you love me?");
		println(c.trim());
		*/
		
		/*
		String[] a = "211,,".split(",");
		
		System.out.println(a.length);
		System.out.println(a[1]);
		*/
		
		/*
		String s = ",1,2,3,";
		System.out.println(s.replace(",1,", ","));
		*/
		//System.out.println(s.substring(1, s.length() - 1));
		
		
		
		//String DOUBLE_REGEX = "(-)?(\\d+|(\\d|\\d\\d|\\d\\d\\d)(,\\d\\d\\d)*).(\\d+)?";
		//String INTEGER_REGEX = "(-)?(\\d+|(\\d|\\d\\d|\\d\\d\\d)(,\\d\\d\\d)*).(0+)?";
		//System.out.println(DOUBLE_REGEX.matches("3/6"));
		
		//System.out.println(Pattern.matches(DOUBLE_REGEX, "366456/4564"));
		/*
		String s1 = "3/6";
		Pattern p = Pattern.compile(DOUBLE_REGEX".*?(\\d+\\.?\\d*)\\s+(\\d+\\.?\\d*)");
		Matcher m = p.matcher(s1);
		if (m.matches()) {
			System.out.println("Long: " + Double.parseDouble(m.group(1)));
			System.out.println("Latt: " + Double.parseDouble(m.group(2)));
		}
		*/

		//System.out.println(test.matches(DOUBLE_REGEX));
		/*
		System.out.println(test.matches(INTEGER_REGEX));
		int index = test.indexOf(".");
		if (index >= 0) {
			test = test.substring(0, index);
		}
		int number = Integer.parseInt(test.replace(",", ""));
		System.out.println(number);
		*/
		
		/*
		String actionPath = "abcAction.do?className=abcDAO&methodName=actionXyz";
		int index = actionPath.indexOf("?") + 1;        
        int index2 = actionPath.indexOf("&", actionPath.indexOf("&") + 1);
		System.out.println(index2);
		if (index2 < 0) {
			index2 = actionPath.length();
		}
        actionPath = actionPath.substring(0, index)
				//+ "_vt=LTTD"
				+ "<" + actionPath.substring(index, index2) + ">"
                //+ com.guhesan.querycrypt.QueryCrypt.getInstance().encrypt(request, actionPath.substring(index, index2))
                + "<" + actionPath.substring(index2) + ">";
		System.out.println(actionPath);
		*/
		System.out.println(cutFolderName("ABC"));
		System.out.println(cutFolderName("1.ABC"));
		System.out.println(cutFolderName("1.1.ABC"));
		System.out.println(cutFolderName("1.1. ABC"));
		System.out.println(cutFolderName("1. ABC"));
		System.out.println(cutFolderName("1 ABC"));
		System.out.println(cutFolderName("1.1 ABC"));
	}

	public static void main(String args[]) {
	/*
		System.out.println(args[0]);
		String[] a = args[0].split("/");
		for (int i = 0; i < a.length; i++) {
			System.out.println(i + ". " + a[i] + ".");
		}*/
		new StringDemo(); //args[0]
	}
	
	private String cutFolderName(String folderName) {
        int index = 0;
        while (index < folderName.length()) {
            char c = folderName.charAt(index);
            if (c != ' ' && c != '.' && !('0' <= c && c <= '9')) {
                break;
            }
            index++;
        }
        return folderName.substring(index);
    }
}
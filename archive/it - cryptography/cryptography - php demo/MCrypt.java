import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;
 
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.spec.IvParameterSpec;


public class MCrypt {
    
    // ECB thì không có IV
    // CBC thì yêu cầu IV
    // AES/CBC/PKCS5Padding, AES/CBC/NoPadding, AES/ECB/PKCS5Padding
    private static final String algorithm = "AES/ECB/PKCS5Padding";
    // private static final String algorithm = "AES/ECB/NoPadding";

    // private static String appKey = "6z/WZ27ih2UsHevTQYvBpyjH0BcRObbquxCzk1lD2pM=";
    private static String appKey = "ECSvtzzGQgx0pNB9m/EgXg==";

    private static byte[] key = Base64.getDecoder().decode(appKey);

    // private static SecretKeySpec secretKey = new SecretKeySpec(key, "AES");
 

    public static String encrypt(String strToEncrypt) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(key, "AES");

        Cipher cipher = Cipher.getInstance(algorithm);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] bytesToEncrypt = strToEncrypt.getBytes("UTF-8");
        byte[] encryptedBytes = cipher.doFinal(bytesToEncrypt);
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }
 
    public static String decrypt(String strToDecrypt) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(key, "AES");

        Cipher cipher = Cipher.getInstance(algorithm);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] bytesToDecrypt = Base64.getDecoder().decode(strToDecrypt);
        // byte[] bytesToDecrypt = strToDecrypt.getBytes();
        // System.out.println(bytesToDecrypt.length);
        
        byte[] decryptedBytes = cipher.doFinal(bytesToDecrypt);
        return new String(decryptedBytes);
    }

    public static String decryptWithIv() throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(key, "AES");
        
        byte[] iv = Base64.getDecoder().decode("tJEf54wJIRgqHMH+TLjfmA==");
        byte[] bytesToDecrypt = Base64.getDecoder().decode("w7XY/IvCy8WZsu94Bxcw/Q==");
        // "mac":"c32e3cd9827e7bc5c7af65ab7884928d720ef3c2bc26377d8e6bdd588a13aad9"

		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKey, new IvParameterSpec(iv));
        byte[] decryptedBytes = cipher.doFinal(bytesToDecrypt);
		return new String(decryptedBytes);
    }
	
	public static void main(String[] args) throws Exception {
        /*
		String originalText = "howtodoinjava.com";
		String encryptedText = MCrypt.encrypt(originalText);
		String decryptedText = MCrypt.decrypt(encryptedText);
		System.out.println(originalText);
		System.out.println(encryptedText);
		System.out.println(decryptedText);
        */

        // 
        // Nguyen Anh Tuan
        // System.out.println(MCrypt.decrypt("CntyILn1jmJ7pC5dBfmmgQ=="));

        // System.out.println(MCrypt.decryptWithIv());
		String[] a = {
			"T+OUZ8LWAl0mnIpNY8FUxA==",
			"mIBrCI7mmAwwfJ7OdudITw==",
			"QgMJVX/koLq/fzwH23kdUQ==",
			"55wV4Iqq4ulioV7A2SPw3w==",
			"VECALaLualDjWkVxX4YsFQ==",
			"6mnnIHvg6JcczlzXYvSJsQ==",
			"zDTrPyVOGqQFxVKVFOk72w==",
			"s3MtEgcUgQtJx6LmEYypCw==",
			"2zxafh/FS/UOpX620l/e6g==",
			"J6qaQHeTQIObLOIBtkMZMg==",
			"Rjvv2QZwAdYUdkDnqlCDkQ==",
			"/8rV9HzHtgIjpNctqFz8Fw==",
			"ws/QKx2MzWTavlWYHfbpSg==",
			"ujw+6QDmped/9mPrtHzi9Q==",
			"zRuDfT9jYO0rtmFLwo9ZRw==",
			"yNMueVQyMffIMZbpgR/0Hw==",
			"bg22vwUwyp0bf2zYqfK4qA==",
			"n/kw7b9fW5+elotxUlhvRA==",
			"t+vnwPD/OlBBSUig8aiGug==",
			"XFppsOorFhQYymHTXsuYew==",
			"eJLoy7ZIktVZKZxgiuUhqg==",
			"8f5l396gguzD9mm4LNFgnA==",
			"xJdzJwPLwheHVQw+CHp0tA==",
			"ol7MN4fOtwVmzhEyK3bifQ==",
			"oRdp5ainnZddDKqEhlnhPQ==",
			"eAVLX/E9xI6b41Z2HvBoaA==",
			"XgyIXqcwe4L9al5PzFsHtg==",
			"dLy4HMdSHl7lUD/M2YhfTg==",
			"buiqa4KB6q56k7hXqb0UVQ==",
			"SLgew5HMWYdUOvVlxocg4Q==",
			"hQjJZtl9cgPgN3LoEgu1DA==",
			"302XZQ/Us2TTL0S98qvb0A==",
			"y/wIFJrS7XsfXgh5Ex2TaQ==",
			"X2scis0KRnX6ijkd2lubbA==",
			"KyCk7v4MgDTWOYcCv2y/oA==",
			"bOaRZefZk/3eU+vBKfCUqw==",
			"nh5yJ3JcPH9IRWN3+EfKCQ==",
			"knRbK1Q6wUkBKgHHfX7MDg==",
			"mgrk6tZHRoQFgNM8530jzQ==",
			"98BhCcQd2DiptAQNoEPK/A==",
			"tEy1xeII9juzlw+XDHri6A==",
			"dFxE88f1rZac1IrO/FlZHQ==",
			"Lxy2PxoVVqjbEZ+1rdPEVA==",
			"sf1AlmSQRPJfaI4khgVoqA==",
			"4BPsZuLuoqJOVAi4U4oEVw==",
			"fVLsyJzssRlsA2k03DTDPw==",
			"sh9qR7p/08raYQPkNMM2dw==",
			"PcijpAQVMJxEg5D6tyjM+Q==",
			"nV5re+ZMDprCuHYITykGTw==",
			"krYeDWBNEvtdwQb0Tv2eXA==",
			"PYGYP2Tsw4yOz9wHymoxzA==",
			"Vy/Ei7fpBK3KpR+8nOt7zg==",
			"Bjaf8UMTabFaV1guDdnTnQ==",
			"DHHQt23kj6tmeN2RSAFF4g==",
			"KYueU2yBGIt7y8nonS+mVQ==",
			"bfoI/JO8OmK7RiFrvBWkEw==",
			"8Svny/TscP7pGVLUMI7REg==",
			"O88SUlXLuEc5NxthyEz/jA==",
			"9bMpZnks6nKCduLLP69Y1Q==",
			"ssNbdmtnIsuqqvQxQyX1SQ==",
			"tyB6XZTmkSWLM8LqDd6WEg==",
			"UvwanE/cQkfiVTngjns5Og==",
			"vMRyFBVFdc0s5otM3smpWw==",
			"5x0Z784NQ6Lf8S6iubGyeg==",
			"t5Iju1f50ZMwWZmLNsefMg==",
			"dVjCecCdIpnvbL7iUOAmpA==",
			"7PhC5sxF8H+ypgtAt7Uy2w==",
			"HsvY6fMY/sqIqFc3JxgeLA==",
			"AYoNzVOMYhlebSIN3gnbqg==",
			"dz5DUxmI6P5XcrAQsz/HIQ==",
			"G3IZvcplr+jMXNKRZwJq7g==",
			"Rya+tljaRb7F0KWuSEcyXQ==",
			"lbwU/D51MluNE29K3IkgQQ==",
			"3u4srWSzp2CzWiEJB1dJfg==",
			"2QgDL6QaOhjQC1QPVQBLnQ==",
			"XB2tQF2ehc6suNHg/ddc2g==",
			"Z08FV2ENkRHEAW4dEK3Y5w==",
			"I1nMYZgoeVv02+tQMaDNww==",
			"dT/gJ6JoY1DA9WWf0zE31Q==",
			"C9ilUZ+Sz+1y4ThB6RHOSg==",
			"Adns9neHNaC4DgcwRz1FGA==",
			"+9F+1qhvglwZGCXCFJxhTw==",
			"S5VMQH1sWNLlbTWtjhABOQ==",
			"iyx7cXZ36Zl96mQTIYAOvA==",
			"XYLmVbOgce52Mu6oLyU0UA==",
			"qgxqioqp7EU9MwBaqshz1w==",
			"Bse1Xyvp31f2thnwrAWWrQ==",
			"nGwEseeF7mbDaEqQdNXkmg==",
			"X23o8eUF+OJqFe5kjCJuBQ==",
			"N1l28B/dqKn30Y6gF0yYXA==",
			"B2/PUpfj0sgNOTJ+bL0WYA==",
			"NXIQCVPcE2WPykPX++Ng7Q==",
			"Oz2FoM729zQb7Wv/ILI52w==",
			"gN4tiDHegKGNVP2bZY6hfg==",
			"sCrf/DFrFA4cZt5WErrQhA==",
			"p2bxk0f8dPgYUnTiv0UYcg==",
			"I55W+0R7941lJ/OESbfWeA==",
			"FytUjflF4g6h7cVu6/6uUg==",
			"QV5tU7U6kCudDNDIWy9bVg==",
			"kqFJdpas52VtYFvanOyHVg=="
		};
		for (String s : a) {
			System.out.println(MCrypt.decrypt(s));
		}
	}
}

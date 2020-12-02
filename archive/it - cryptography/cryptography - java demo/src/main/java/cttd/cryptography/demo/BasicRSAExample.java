package cttd.cryptography.demo;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.RSAPrivateKeySpec;
import java.security.spec.RSAPublicKeySpec;
import javax.crypto.Cipher;


public class BasicRSAExample {

	private PublicKey pubKey;
    private PrivateKey priKey;

    public BasicRSAExample() {
    }

    public void generateKeys() throws Exception {
        KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
        kpg.initialize(2048);
        KeyPair kp = kpg.genKeyPair();
        KeyFactory fact = KeyFactory.getInstance("RSA");
        RSAPublicKeySpec pub = fact.getKeySpec(kp.getPublic(), RSAPublicKeySpec.class);
        RSAPrivateKeySpec pri = fact.getKeySpec(kp.getPrivate(), RSAPrivateKeySpec.class);

        ObjectOutputStream writer = new ObjectOutputStream(new BufferedOutputStream(new FileOutputStream("data/keys")));
        writer.writeObject(pub.getModulus());
        writer.writeObject(pub.getPublicExponent());
        writer.writeObject(pri.getModulus());
        writer.writeObject(pri.getPrivateExponent());
        writer.close();
    }

    public void readKeysFromFile() throws Exception {
        ObjectInputStream reader = new ObjectInputStream(new BufferedInputStream(new FileInputStream("data/keys")));
        BigInteger m1 = (BigInteger) reader.readObject();
        BigInteger e1 = (BigInteger) reader.readObject();
        BigInteger m2 = (BigInteger) reader.readObject();
        BigInteger e2 = (BigInteger) reader.readObject();
        reader.close();

        KeyFactory fact = KeyFactory.getInstance("RSA");
        RSAPublicKeySpec keySpec1 = new RSAPublicKeySpec(m1, e1);
        pubKey = fact.generatePublic(keySpec1);
        RSAPrivateKeySpec keySpec2 = new RSAPrivateKeySpec(m2, e2);
        priKey = fact.generatePrivate(keySpec2);
    }

    public void encrypt() throws Exception {
        Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        cipher.init(Cipher.ENCRYPT_MODE, pubKey);
        String originalFilePath = "data/plaintext.txt";
        String encryptedFilePath = "data/crypt.txt";
        FileInputStream reader = new FileInputStream(originalFilePath);
        OutputStream writer = new FileOutputStream(encryptedFilePath);
        int bytesRead = 0;
        byte[] buffer = new byte[8192];
        byte[] cloneBuffer;
        while ((bytesRead = reader.read(buffer, 0, 8192)) != -1) {
            cloneBuffer = new byte[bytesRead];
            if (bytesRead < buffer.length) {
                for (int i = 0; i < bytesRead; i++) {
                    cloneBuffer[i] = buffer[i];
                }
            }
            writer.write(cipher.doFinal(cloneBuffer));
        }
        reader.close();
        writer.close();
    }

    public void decrypt() throws Exception {
        Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        cipher.init(Cipher.DECRYPT_MODE, priKey);
        String encryptedFilePath = "data/crypt.txt";
        String decryptedFilePath = "data/plaintext2.txt";
        FileInputStream reader = new FileInputStream(encryptedFilePath);
        OutputStream writer = new FileOutputStream(decryptedFilePath);
        int bytesRead = 0;
        byte[] buffer = new byte[8192];
        byte[] cloneBuffer;
        while ((bytesRead = reader.read(buffer, 0, 8192)) != -1) {
            cloneBuffer = new byte[bytesRead];
            if (bytesRead < buffer.length) {
                for (int i = 0; i < bytesRead; i++) {
                    cloneBuffer[i] = buffer[i];
                }
            }
            writer.write(cipher.doFinal(cloneBuffer));
        }
        reader.close();
        writer.close();
    }

    public static void main(String[] args) throws Exception {
        BasicRSAExample obj = new BasicRSAExample();
        if (args.length < 1) {
            System.out.println("Usage: java BasicRSAExample e");
            System.out.println("Or: java BasicRSAExample d");
            System.out.println("Or: java BasicRSAExample g");
        } else if (args[0].equalsIgnoreCase("e")) {
            obj.readKeysFromFile();
            obj.encrypt();
        } else if (args[0].equalsIgnoreCase("d")) {
            obj.readKeysFromFile();
            obj.decrypt();
        } else if (args[0].equalsIgnoreCase("g")) {
            obj.generateKeys();
        } else {
            System.out.println("Invalid option: " + args[0]);
        }
    }
}

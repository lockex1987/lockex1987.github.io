package io;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map.Entry;
import java.util.Scanner;

/**
 * http://stackoverflow.com/questions/2793150/using-java-net-urlconnection-to-fire-and-handle-http-requests
 * @author USER
 *
 */
public class URLConnectionDemo {

	private static String charset = StandardCharsets.UTF_8.name();
	private static String url = "http://example.com";

	private static String param1 = "value1";
	private static String param2 = "value2";
	private static String query;
	private static URLConnection connection;

	public static void main(String[] args) throws Exception {
		query = String.format("param1=%s&param2=%s",
				URLEncoder.encode(param1, charset),
				URLEncoder.encode(param2, charset));

		// fireGetRequest();
		firePostRequest();
		printMoreResponse();
	}

	private static void fireGetRequest() throws Exception {
		connection = new URL(url + "?" + query).openConnection();
		connection.setRequestProperty("Accept-Charset", charset);
		// Do as if you're using Chrome 41 on Windows 7.
		connection.setRequestProperty("User-Agent",
				"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36");
		printResponse();
	}

	private static void firePostRequest() throws Exception {
		connection = new URL(url).openConnection();
		connection.setDoOutput(true); // Triggers POST.
		connection.setRequestProperty("Accept-Charset", charset);
		connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=" + charset);
		try (OutputStream output = connection.getOutputStream()) {
			output.write(query.getBytes(charset));
		}
		printResponse();
	}

	private static void printResponse() throws Exception {
		InputStream response = connection.getInputStream();
		try (Scanner scanner = new Scanner(response)) {
			String responseBody = scanner.useDelimiter("\\A").next();
			System.out.println(responseBody);
		}
	}

	private static void printMoreResponse() throws Exception {
		HttpURLConnection httpConnection = (HttpURLConnection) connection;
		int status = httpConnection.getResponseCode();
		System.out.println("Response code: " + status);

		for (Entry<String, List<String>> header : connection.getHeaderFields().entrySet()) {
			System.out.println(header.getKey() + "=" + header.getValue());
		}
	}
}

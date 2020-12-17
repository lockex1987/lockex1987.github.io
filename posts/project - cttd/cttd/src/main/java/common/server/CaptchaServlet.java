/*
 * NVH.
 */
package common.server;

import com.github.cage.Cage;
import com.github.cage.GCage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet xu ly captcha.
 *
 * @author HuyenNV1
 */
public class CaptchaServlet extends HttpServlet {

	/**
	 * Bien session captcha
	 */
	public static final String SESSION_CAPTCHA_KEY_NAME = "SESSION_CAPTCHA_KEY_NAME";
	private static final char[] DEFAULT_CHARS = {
		'a', 'b', 'd', 'e', 'f', 'h', 'm', 'n', 'r', 't',
		'A', 'B', 'D', 'E', 'F', 'G', 'H', 'M', 'N', 'R', 'T',
		'2', '3', '4', '5', '6', '7', '8'};
	private final Cage captchaBuilder = new GCage();
	private final Random random = new Random();
	private int minCapLen, maxCapLen;

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		String strMinCapLen = getInitParameter("minCapLen");
		if (strMinCapLen != null) {
			minCapLen = Integer.parseInt(strMinCapLen);
		} else {
			minCapLen = 6;
		}
		String strMaxCapLen = getInitParameter("maxCapLen");
		if (strMaxCapLen != null) {
			maxCapLen = Integer.parseInt(getInitParameter("maxCapLen"));
		} else {
			maxCapLen = 8;
		}
	}

	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		int offset = maxCapLen - minCapLen + 1;
		int randomLen = (offset <= 1) ? minCapLen : minCapLen + random.nextInt(offset);
		StringBuilder buf = new StringBuilder();
		for (int i = 0; i < randomLen; i++) {
			buf.append(DEFAULT_CHARS[random.nextInt(DEFAULT_CHARS.length)]);
		}
		String captcha = buf.toString();

		req.getSession(true).setAttribute(SESSION_CAPTCHA_KEY_NAME, captcha);
		resp.setHeader("Cache-Control", "no-cache");
		resp.setDateHeader("Expires", 0L);
		resp.setHeader("Pragma", "no-cache");
		resp.setDateHeader("Max-Age", 0L);
		OutputStream outputStream = resp.getOutputStream();
		try {
			captchaBuilder.draw(captcha, outputStream);
		} finally {
			outputStream.close();
		}
	}
}

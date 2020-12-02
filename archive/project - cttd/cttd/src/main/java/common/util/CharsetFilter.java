/*
 * NVH.
 */
package common.util;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * Charset filter.
 * Neu khong co cai nay, se bi loi Unicode khi submit, cha biet tai sao.
 *
 * @author lockex1987
 */
public class CharsetFilter implements Filter {

	private String charset;

	@Override
	public void init(FilterConfig config) throws ServletException {
		if (config.getInitParameter("charset") != null) {
			charset = config.getInitParameter("charset");
		} else {
			charset = "UTF-8";
		}
	}

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
					throws IOException, ServletException {
		request.setCharacterEncoding(charset);
		chain.doFilter(request, response);
	}
}

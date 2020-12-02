package com.viettel.safenet.crawler.servlet;

import com.viettel.safenet.crawler.util.CrawlerConfig;
import com.viettel.safenet.crawler.util.MailSender;
import com.viettel.safenet.crawler.util.SearchGoogle;
import org.eclipse.jetty.http.HttpStatus;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;

/**
 * Xử lý các request.
 */
@Slf4j
public class CrawlerServlet extends HttpServlet {

    // Số trang search mặc định
    private static final int NUM_PAGE_PER_KEY = 10;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        resp.setStatus(HttpServletResponse.SC_OK);

        // Lấy thêm tham số:
        // - tbm (video, all)
        // - category
        // - keywords
        // - start_page
        // - end_page
        String searchType = req.getParameter("tbm");
        if (searchType == null || searchType.isEmpty()) {
            searchType = "all";
        }

        String category = req.getParameter("category");
        if (category == null) {
            responseError(resp, "don't have category");
            return;
        }

        int cat;
        try {
            cat = Integer.parseInt(category);
        } catch (NumberFormatException e) {
            responseError(resp, "wrong cat");
            return;
        }

        if (cat < 1) {
            responseError(resp, "wrong cat");
            return;
        }

        String keyword = req.getParameter("keywords");
        if (keyword == null) {
            responseError(resp, "don't have keyword");
            return;
        }

        String sPage = req.getParameter("start_page");
        int startPage = 0;
        if (sPage != null) {
            try {
                startPage = Integer.parseInt(sPage);
            } catch (NumberFormatException e) {
                responseError(resp, "wrong start page");
                return;
            }
        }

        int endPage = startPage + NUM_PAGE_PER_KEY;
        String ePage = req.getParameter("end_page");
        if (ePage != null) {
            try {
                endPage = Integer.parseInt(ePage);
            } catch (NumberFormatException e) {
                responseError(resp, "wrong end page");
                return;
            }
        }

        // Bắt đầu craw dữ liệu
        SearchGoogle.startSearchCat(cat, keyword, startPage, endPage, searchType);

        // Trả về cho client
        resp.setStatus(HttpStatus.OK_200);
        resp.getWriter().println("Category: " + category + " keys: " + keyword);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String email = req.getParameter("email");
        String subject = req.getParameter("subject");
        String message = req.getParameter("message");

        MailSender mailSender = new MailSender(CrawlerConfig.data.mailConfig.username,
                CrawlerConfig.data.mailConfig.password,
                CrawlerConfig.data.mailConfig.alias,
                CrawlerConfig.data.mailConfig.host,
                CrawlerConfig.data.mailConfig.port);
        int result = mailSender.sendMail(email, subject, message);
        mailSender.closeTransport();

        resp.setContentType("text/html");
        resp.setStatus(HttpServletResponse.SC_OK);
        log.info("Send email " + email + ": " + result);
        resp.getWriter().println("Send " + email + ": " + result);
    }

    private void responseError(HttpServletResponse resp, String msg) {
        resp.setStatus(HttpStatus.BAD_REQUEST_400);
        try {
            resp.getWriter().println(msg);
        } catch (IOException ex) {
            log.error("Error when responding error", ex);
        }
    }
}

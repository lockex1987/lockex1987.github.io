package com.viettel.safenet.crawler.model;

/**
 * Cấu hình ở file crawler.conf
 * Định dạng của file crawler.conf là TOML (https://en.wikipedia.org/wiki/TOML).
 */
public class CrawlerConfData {

    public SaveServerConf saveServer;
    public ServiceConf serviceConf;
    public MailConfig mailConfig;
}

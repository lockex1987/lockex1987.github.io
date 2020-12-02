package com.viettel.safenet.crawler.model;

public class RuleSaveRequest {

    public String rule_content;
    public String compare_type;
    public String rule_type;
    public int category_id;

    // Từ khóa tìm kiếm trả về kết quả
    public String keyword;

    // Nguồn tìm kiếm (all, image, video)
    public String source;
    public String token;
}

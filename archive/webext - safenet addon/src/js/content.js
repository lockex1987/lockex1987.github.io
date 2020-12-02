var Content = (function() {

    /**
     * Khởi tạo việc lọc nội dung
     * @param checkBlockedWords true nếu chặn theo từ khóa chặn
     * @param checkProfanityWords true nếu không hiển thị từ tục tĩu
     * @param blockedKeywords Danh sách từ khóa chặn
     * @param profanityKeywords Danh sách từ khóa tục tĩu
     */
    function checkContent(checkBlockedWords, checkProfanityWords, blockedKeywords, profanityKeywords) {
        if (checkBlockedWords && blockedKeywords) {
            FilterBlocked.init(blockedKeywords);    
        }

        if (!FilterBlocked.isBlocked() && checkProfanityWords && profanityKeywords) {
            FilterProfanity.init(profanityKeywords);
        }

        //console.log("Đã chạy xong và tốn không nhiều tài nguyên");
    }

    /**
     * Khởi tạo, lấy các giá trị cấu hình.
     */
    function init() {
        var obj = {};
        obj[Config.CHECK_BLOCKED_WORDS_KEY] = Config.CHECK_BLOCKED_WORDS_DEFAULT_VALUE;
        obj[Config.CHECK_PROFANITY_WORDS_KEY] = Config.CHECK_PROFANITY_WORDS_DEFAULT_VALUE;
        
        obj[Config.BLOCKED_WORDS_SOURCE_KEY] = Config.BLOCKED_WORDS_SOURCE_DEFAULT_VALUE;
        obj[Config.BLOCKED_WORDS_FROM_USER_KEY] = Config.BLOCKED_WORDS_FROM_USER_DEFAULT_VALUE;
        obj[Config.BLOCKED_WORDS_FROM_SAFENET_KEY] = Config.BLOCKED_WORDS_FROM_SAFENET_DEFAULT_VALUE;

        obj[Config.PROFANITY_WORDS_SOURCE_KEY] = Config.PROFANITY_WORDS_SOURCE_DEFAULT_VALUE;
        obj[Config.PROFANITY_WORDS_FROM_USER_KEY] = Config.PROFANITY_WORDS_FROM_USER_DEFAULT_VALUE;
        obj[Config.PROFANITY_WORDS_FROM_SAFENET_KEY] = Config.PROFANITY_WORDS_FROM_SAFENET_DEFAULT_VALUE;
        
        chrome.storage.sync.get(obj, function(items) {
            //console.log(items);

            var checkBlockedWords = items[Config.CHECK_BLOCKED_WORDS_KEY];
            var blockedWordsSource = items[Config.BLOCKED_WORDS_SOURCE_KEY];
            var blockedWordsFromUser = items[Config.BLOCKED_WORDS_FROM_USER_KEY];
            var blockedWordsFromSafeNet = items[Config.BLOCKED_WORDS_FROM_SAFENET_KEY];
            var blockedKeywords = (blockedWordsSource === "SafeNet") ?
                    blockedWordsFromSafeNet : blockedWordsFromUser;

            var checkProfanityWords = items[Config.CHECK_PROFANITY_WORDS_KEY];
            var profanityWordsSource = items[Config.PROFANITY_WORDS_SOURCE_KEY];
            var profanityWordsFromUser = items[Config.PROFANITY_WORDS_FROM_USER_KEY];
            var profanityWordsFromSafeNet = items[Config.PROFANITY_WORDS_FROM_SAFENET_KEY];
            var profanityKeywords = (profanityWordsSource === "SafeNet") ?
                    profanityWordsFromSafeNet : profanityWordsFromUser;

            checkContent(checkBlockedWords, checkProfanityWords,
                    blockedKeywords, profanityKeywords);
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();

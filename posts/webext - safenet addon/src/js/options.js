var Options = (function() {

    // Trang hiện tại đang là "browser" hay là "options"
    var pageId = document.body.id;

    // Các phần tử form checkbox, radio trên giao diện
    var googleSafeSearch = document.getElementById('googleSafeSearch');
    var youtubeStrictModes = document.getElementsByName("youtubeStrictMode");
    var checkBlockedWords = document.getElementById("checkBlockedWords");
    var checkProfanityWords = document.getElementById("checkProfanityWords");

    var blockedWordsSources = document.getElementsByName("blockedWordsSource");
    var blockedWordsFromUser = document.getElementById("blockedWordsFromUser");

    var profanityWordsSources = document.getElementsByName("profanityWordsSource");
    var profanityWordsFromUser = document.getElementById("profanityWordsFromUser");

    var blockedSitesCheck = document.getElementById("blockedSitesCheck");
    var blockedSitesList = document.getElementById("blockedSitesList");

    // Cac doi tuong DOM
    var url = document.querySelector("#url");
    var responseText = document.querySelector("#responseText");

    /**
     * Lưu tùy chọn tìm kiếm Safe Search của Google.
     */
    function saveGoogleSafeSearchOption() {
        var obj = {};
        obj[Config.GOOGLE_SAFE_SEARCH_KEY] = this.checked;

        chrome.storage.sync.set(obj, function() {
            // Thông báo cho background
            chrome.runtime.sendMessage({ change: "change-safe-search" });
        });
    }

    /**
     * Lưu tùy chọn chế độ Strict của YouTube.
     */
    function saveYoutubeStrictModeOption() {
        var obj = {};
        obj[Config.YOUTUBE_STRICT_MODE_KEY] = this.value;

        chrome.storage.sync.set(obj, function() {
            // Thông báo cho background
            chrome.runtime.sendMessage({ change: "change-youtube-mode" });
        });
    }

    /**
     * Lưu giá trị ô checkbox, áp dụng với chặn trang web hoặc ẩn từ tục tĩu.
     */
    function saveCheckboxValue() {
        var obj = {};
        obj[this.id] = this.checked;
        chrome.storage.sync.set(obj);
    }

    /**
     * Lưu giá trị của radio, áp dùng với:
     * - Tùy chọn nguồn của các từ khóa tục tĩu
     * - Tùy chọn nguồn của các từ khóa chặn
     */
    function saveRadioValue() {
        var obj = {};
        obj[this.name] = this.value;
        chrome.storage.sync.set(obj);
    }

    /**
     * Lưu giá trị của textarea, áp dùng với:
     * - Danh sách từ khóa tục tĩu của người dùng
     * - Danh sách từ khóa chặn của người dùng
     */
    function saveTextareaValue() {
        var obj = {};
        obj[this.id] = this.value;
        chrome.storage.sync.set(obj);
    }

    /**
     * Lưu tùy chọn có chặn theo URL hay không.
     */
    function saveBockedSitesCheck() {
        var obj = {};
        obj[Config.BLOCKED_SITES_CHECK_KEY] = this.checked;

        chrome.storage.sync.set(obj, function() {
            // Thông báo cho background
            chrome.runtime.sendMessage({ change: "change-blocked-sites" });
        });
    }

    /**
     * Lưu tùy chọn danh sách các site chặn theo URL.
     */
    function saveBockedSitesList() {
        var obj = {};
        obj[Config.BLOCKED_SITES_LIST_KEY] = this.value;

        chrome.storage.sync.set(obj, function() {
            // Thông báo cho background
            chrome.runtime.sendMessage({ change: "change-blocked-sites" });
        });
    }

    /**
     * Lấy các giá trị thiết lập cũ và hiển thị lên giao diện.
     */
    function restoreOptions() {
        var obj = {};
        obj[Config.GOOGLE_SAFE_SEARCH_KEY] = Config.GOOGLE_SAFE_SEARCH_DEFAULT_VALUE;
        obj[Config.YOUTUBE_STRICT_MODE_KEY] = Config.YOUTUBE_STRICT_MODE_DEFAULT_VALUE;
        obj[Config.CHECK_BLOCKED_WORDS_KEY] = Config.CHECK_BLOCKED_WORDS_DEFAULT_VALUE;
        obj[Config.CHECK_PROFANITY_WORDS_KEY] = Config.CHECK_PROFANITY_WORDS_DEFAULT_VALUE;

        obj[Config.BLOCKED_WORDS_SOURCE_KEY] = Config.BLOCKED_WORDS_SOURCE_DEFAULT_VALUE;
        obj[Config.BLOCKED_WORDS_FROM_USER_KEY] = Config.BLOCKED_WORDS_FROM_USER_DEFAULT_VALUE;

        obj[Config.PROFANITY_WORDS_SOURCE_KEY] = Config.PROFANITY_WORDS_SOURCE_DEFAULT_VALUE;
        obj[Config.PROFANITY_WORDS_FROM_USER_KEY] = Config.PROFANITY_WORDS_FROM_USER_DEFAULT_VALUE;

        obj[Config.BLOCKED_SITES_CHECK_KEY] = Config.BLOCKED_SITES_CHECK_DEFAULT_VALUE;
        obj[Config.BLOCKED_SITES_LIST_KEY] = Config.BLOCKED_SITES_LIST_DEFAULT_VALUE;

        chrome.storage.sync.get(obj, function(items) {
            //console.log(items);

            googleSafeSearch.checked = items[Config.GOOGLE_SAFE_SEARCH_KEY];

            for (var i = 0; i < youtubeStrictModes.length; i++) {
                youtubeStrictModes[i].checked = (youtubeStrictModes[i].value == items[Config.YOUTUBE_STRICT_MODE_KEY]) ? true : false;
            }

            checkBlockedWords.checked = items[Config.CHECK_BLOCKED_WORDS_KEY];
            checkProfanityWords.checked = items[Config.CHECK_PROFANITY_WORDS_KEY];

            if (pageId === "options") {
                for (var i = 0; i < blockedWordsSources.length; i++) {
                    blockedWordsSources[i].checked = (blockedWordsSources[i].value == items[Config.BLOCKED_WORDS_SOURCE_KEY]) ? true : false;
                }
                blockedWordsFromUser.value = items[Config.BLOCKED_WORDS_FROM_USER_KEY];

                for (var i = 0; i < profanityWordsSources.length; i++) {
                    profanityWordsSources[i].checked = (profanityWordsSources[i].value == items[Config.PROFANITY_WORDS_SOURCE_KEY]) ? true : false;
                }
                profanityWordsFromUser.value = items[Config.PROFANITY_WORDS_FROM_USER_KEY];

                blockedSitesCheck.checked = items[Config.BLOCKED_SITES_CHECK_KEY];
                blockedSitesList.value = items[Config.BLOCKED_SITES_LIST_KEY];
            }
        });
    }

    /**
     * Chặn hêm một URL.
     */
	function addItem() {
        // Chuẩn hóa dữ liệu
		url.value = url.value.trim();
		
		// Kiểm tra rỗng
		if (!url.value) {
			responseText.textContent = "Bạn phải nhập đường dẫn URL";
			url.focus();
			return;
		}

        // Lấy giá trị cũ
        var obj = {};
		obj[Config.BLOCKED_SITES_LIST_KEY] = Config.BLOCKED_SITES_LIST_DEFAULT_VALUE;
		chrome.storage.sync.get(obj, function(items) {
			var blockedSitesList = items[Config.BLOCKED_SITES_LIST_KEY];
            var newList = blockedSitesList + "\n" + url.value;

			// Thêm mới
            obj[Config.BLOCKED_SITES_LIST_KEY] = newList;
            chrome.storage.sync.set(obj, function() {
                responseText.textContent = "Thêm mới thành công";

                // Thông báo cho background
                chrome.runtime.sendMessage({ change: "change-blocked-sites" });
            }); 
		});
	}

    /**
     * Ẩn hiện thẻ DIV.
     */
    function tooglePanel() {
        var panel = this.parentNode;
        panel.classList.toggle("panel-closed");
        panel.classList.toggle("panel-open");
    }

    /**
     * Khởi tạo.
     */
    function init() {
        document.addEventListener('DOMContentLoaded', restoreOptions);

        googleSafeSearch.addEventListener('click', saveGoogleSafeSearchOption, false);

        for (var i = 0; i < youtubeStrictModes.length; i++) {
            youtubeStrictModes[i].addEventListener('click', saveYoutubeStrictModeOption, false);
        }

        checkBlockedWords.addEventListener('click', saveCheckboxValue, false);
        checkProfanityWords.addEventListener('click', saveCheckboxValue, false);

        if (pageId === "options") {
            // Chặn theo nội dung
            for (var i = 0; i < blockedWordsSources.length; i++) {
                blockedWordsSources[i].addEventListener('click', saveRadioValue, false);
            }
            blockedWordsFromUser.addEventListener('blur', saveTextareaValue, false);

            // Không hiển thị từ tục tĩu
            for (var i = 0; i < profanityWordsSources.length; i++) {
                profanityWordsSources[i].addEventListener('click', saveRadioValue, false);
            }
            profanityWordsFromUser.addEventListener('blur', saveTextareaValue, false);

            // Chặn theo URL
            blockedSitesCheck.addEventListener('click', saveBockedSitesCheck, false);
            blockedSitesList.addEventListener('blur', saveBockedSitesList, false);

            var h2Tags = document.querySelectorAll("h2");
            for (var i = 0; i < h2Tags.length; i++) {
                h2Tags[i].addEventListener('click', tooglePanel, false);
            }
        } else {
            var moreOptionsLink = document.getElementById("moreOptionsLink");
            moreOptionsLink.addEventListener('click', function() {
                chrome.runtime.openOptionsPage();
                window.close();
            }, false);

            // Dang ky su kien submit cho form
            document.querySelector("#addForm")
                    .addEventListener("submit", function(evt) {
                        evt.preventDefault(); 
                        addItem();
                    });

            var queryInfo = { active: true, currentWindow: true };
            chrome.tabs.query(queryInfo, function(tabs) {
                var tab = tabs[0];
                url.value = tab.url;
                url.focus();
                
                responseText.textContent = "";
            });
        }
    }

    init();
})();

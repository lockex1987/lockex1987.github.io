var FilterBlocked = (function() {

    // Biểu thức chính quy
    var blockedWords;

    // Mảng các từ khóa tìm thấy
    var foundedWords;

    // Số lần xuất hiện
    var noOfBlockedWords = 0;

    /**
     * Khởi tạo biểu thức chính quy.
     * @param blockedKeywords Danh sách các từ khóa thô
     */
    function generateBlockedWords(blockedKeywords) {
        var wordList = Common.normalizeWordList(blockedKeywords);
        blockedWords = new RegExp('(\\b|\\s|^)(' + wordList.join('|') + ')(\\b|\\s|$)', 'gi');
    }

    /**
     * Đếm số lần xuất hiện từ khóa.
     * @param text Xâu đầu vào
     * @return Số lần xuất hiện
     */
    function countAppearance(text) {
        foundedWords = text.match(blockedWords) || [];
        noOfBlockedWords = foundedWords.length;
    }

    /**
     * Hiển thị trang chặn.
     */
    function displayBlockedPage() {
        var extensionUrl = chrome.runtime.getURL("");

        document.documentElement.innerHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SafeNet - Thông báo chặn</title>

        <link rel="stylesheet" href="${extensionUrl}css/style.css">
        <link rel="stylesheet" href="${extensionUrl}css/extra.css">
    </head>

    <body>
        <div id="sn-block">
            <div class="main clr" id="sn-notify-content">
                <!-- Màn hình thông báo -->
                <div class="container" id="container1">
                    <div class="block-icon">
                        <img src="${extensionUrl}images/stop.png" alt="Stop"/>
                    </div>
                    <div class="block-message">
                        <h4>Đã bị chặn</h4>
                        <p id="notify_id">
                            Trang web này đã bị chặn bởi <span>SAFENET</span>
                        </p>
                        <p class="url">
                            Trang web bị chặn do tìm thấy <strong id="noOfBlockedWords"></strong> từ khóa không phù hợp.
                        </p>
                        <p id="foundedWords"></p>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>`;

        document.getElementById("noOfBlockedWords").textContent = noOfBlockedWords;

        // Hiển thị các từ khóa tìm thấy
        //console.log("Found blocked words: " + foundedWords);
        var text;
        var maxShow = 10;
        if (noOfBlockedWords <= maxShow) {
            text = foundedWords;
        } else {
            text = "";
            for (var i = 0; i < maxShow; i++) {
                text += ", " + foundedWords[i];
            }
            text += ",...";
            text = text.substr(2);
        }
        document.getElementById("foundedWords").textContent = text;
    }

    /**
     * Trả về xem trang có bị chặn hay không.
     * @return true nếu trang bị chặn
     */
    function isBlocked() {
        return noOfBlockedWords > 0;
    }

    function init(blockedKeywords) {
        generateBlockedWords(blockedKeywords);

        var sourceCode = document.documentElement.innerHTML;
        countAppearance(sourceCode);
        if (noOfBlockedWords > 0) {
		    // Dừng trang web, không load các tài nguyên khác nữa
			window.stop();

			// Hiển thị trang chặn
            displayBlockedPage(noOfBlockedWords);
        }
    }

    return {
        init: init,
        isBlocked: isBlocked
    };
})();

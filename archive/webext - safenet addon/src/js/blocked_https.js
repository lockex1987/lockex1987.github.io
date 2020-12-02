/**
 * Kiểm tra xem có phải trang web đang bị chặn bởi SafeNet hay không.
 * Nếu đúng là bị chặn bởi SafeNet thì redirect đến một trang của SafeNet.
 * Ở trang đó có thông báo bị chặn và cho phép người dùng mở truy cập (nếu người dùng có mật khẩu).
 *
 * Khi SafeNet chặn thì sẽ ăn vào sự kiện onErrorOccurred của của webRequest.
 * Tham khảo webRequest ở:
 *   https://developer.chrome.com/extensions/webRequest
 *
 * Ở sự kiện đó, chúng ta có thể bắt được thuộc tính "error".
 * Thuộc tính này có các giá trị khác nhau khi bị chặn hoặc do lỗi kết nối bình thường, và cũng tùy trình duyệt nữa.
 * - Trình duyệt Chrome:
 *   + Lỗi kết nối: "error" bằng "net::ERR_CONNECTION_TIMED_OUT"
 *   + SafeNet chặn: "error" bằng "net::ERR_CONNECTION_RESET", hoặc "net::ERR_QUIC_PROTOCOL_ERROR" (YouTube) 
 * - Trình duyệt Firefox:
 *   + Lỗi kết nối: "error" bằng "NS_ERROR_NET_ON_CONNECTING_TO"
 *   + SafeNet chặn: "error" bằng "NS_ERROR_NET_UNKNOWN_2152398861"
 **********************************************************************************/

var BlockedHttps = (function() {

	/**
	 * Kiểm tra xem trang web có phải đang bị SafeNet chặn kiểu HTTPS hay không.
	 * Nếu đúng thì redirect đến trang safenet.vn/blocked.html.
	 * @param req Đốit tượng Request
	 */
	function checkBlocked(req) {
		//console.info("error: " + JSON.stringify(req));
		if (req.tabId > -1 &&
				(req.url.indexOf("https") == 0) &&
				(req.error == "net::ERR_CONNECTION_RESET" || req.error == "net::ERR_QUIC_PROTOCOL_ERROR" || req.error == "NS_ERROR_NET_UNKNOWN_2152398861")) {
			var redirectUrl = "https://safenet.vn/blocked.html?url=" + encodeURIComponent(req.url);
			chrome.tabs.update(req.tabId, { url: redirectUrl });
		}
	}

	/**
	 * Khởi tạo việc lắng nghe kiểm tra chặn HTTPS.
	 */
	function initCheckHttpsBlock() {
		chrome.webRequest.onErrorOccurred.addListener(
			checkBlocked,
			{
				urls: [ "<all_urls>" ],
				types: [ "main_frame" ]
			}
		);
	}

	return {
		initCheckHttpsBlock: initCheckHttpsBlock
	};
})();

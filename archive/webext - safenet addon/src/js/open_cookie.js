var OpenCookie = (function() {

	// Các cookie hiện có
	var openCookies;

	// Vùng div trên giao diện
	var openCookiesDiv = document.querySelector("#open_cookies_div");

	/**
	 * Lấy các cookie hiện tại
	 */
	function getExistingOpenCookies() {
		// Giá trị chính xác là { "name": "vrf" },
		// test thì dùng { "name": "snp" } hoặc { "domain": "safenet.vn" }
		var filter = { "name": "vrf" }; // phải xóa tất cả cookie, không chỉ từ domain "safenet.vn"
		//var filter = { ""name": "snp" };
		//var filter = { "domain": "safenet.vn" };

		chrome.cookies.getAll(filter, function(cookies) {
			openCookies = cookies;
			bindOpenCookies();
		});
	}

	/**
	 * Hiển thị cookie lên giao diện
	 */
	function bindOpenCookies() {
		openCookiesDiv.style.display = (openCookies.length > 0) ? "block" : "none";

		if (openCookies.length > 0) {
			var firstCookie = openCookies[0];

			// The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
			var expirationDate = firstCookie.expirationDate;

			var openCookiesTime = document.querySelector("#open_cookies_time");

			if (!expirationDate) {
				openCookiesTime.textContent = "SafeNet đang được mở trên trình duyệt này";
			} else {
				// Chuyển sang milli giây
				expirationDate *= 1000;

				// Thời gian mở tối đa là 1 ngày (24h * 60 * 60 * 1000 = 86,400,000)
				var maxOpenTime = 86400000;
				var date = new Date();
				var diffTime = expirationDate - date.getTime();
				
				if (diffTime <= 0) {
					openCookiesTime.textContent = "Đã hết hạn mở";
					deleteCookie(firstCookie);
				} else if (diffTime > maxOpenTime) {
					openCookiesTime.textContent = "SafeNet đang được mở VĨNH VIỄN trên trình duyệt này";
				} else {
					date.setTime(expirationDate);
					openCookiesTime.textContent = "SafeNet đang được mở trên trình duyệt này đến " +
							//date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " +
							//diffTime + " " +
							date.getHours() + ":" + date.getMinutes();
				}
			}
		}
	}

	/**
	 * Hành động khi nhấn nút xóa cookie.
	 */
	function deleteOpenCookies() {
		for (var i = 0; i < openCookies.length; i++) {
			deleteCookie(openCookies[i]);
		}

		openCookies = undefined;

		// Thông báo thành công
		var openCookiesTime = document.querySelector("#open_cookies_time");
		openCookiesTime.textContent = "Chặn lại thành công";
		
		document.querySelector('#delete_open_cookies').style.display = "none";

		/*
		setTimeout(function() {
			openCookiesDiv.style.display = "none";
		}, 3000);*/
	}

	/**
	 * Xóa một cookie riêng lẻ.
	 * @param cookie Đối tượng cookie
	 */
	function deleteCookie(cookie) {
		//return;
		
		var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
		var name = cookie.name;
		chrome.cookies.remove({ "url": url, "name": name });
	}

	/**
	 * Khởi tạo.
	 */
	function initOpenCookies() {
		getExistingOpenCookies();
		document.querySelector('#delete_open_cookies').addEventListener('click', deleteOpenCookies);
	}

	initOpenCookies();
})();

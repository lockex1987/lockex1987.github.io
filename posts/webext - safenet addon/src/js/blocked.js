var Blocked = (function() {

	/**
	 * Lấy về tham số từ URL.
	 * @param paramName Tên tham số
	 */
	function getParameter(paramName) {
		// location.url trả về undefined
		var urlObj = new URL("https://safenet.vn" + location.search);
		return urlObj.searchParams.get(paramName);
	}

	/**
	 * Hiển thị URL bị chặn
	 */
	function bindUrl() {
		var blockedUrl = getParameter("url");
    	document.querySelector("#blocked_url").textContent = blockedUrl;
	}

	/**
	 * Khởi tạo.
	 */
	function init() {
		document.addEventListener('DOMContentLoaded', bindUrl);
	}

	init();
})();

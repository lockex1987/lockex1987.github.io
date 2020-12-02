(() => {

	/**
	 * Lấy ra giá trị key mà lưu ở storage.
	 */
	function getStorageKey() {
		const today = new Date();
		// const date = today.getDate();
		const month = today.getMonth() + 1;
		const year = today.getFullYear();
		return 'bill-warning-' + month + '/' + year;
	}
	
	/**
	 * Kiểm tra storage xem đã đánh dấu là đóng rồi chưa.
	 */
	function checkAlreadyPaid() {
		const key = getStorageKey();
		const check = localStorage.getItem(key);
		return !!check;
	}
	
	/**
	 * Đánh dấu là đã đóng.
	 */
	function markPaid() {
		const key = getStorageKey();
		localStorage.setItem(key, true);
	}
	
	/**
	 * Kiểm tra ngày hiện tại.
	 */
	function init() {
		const today = new Date();
		const date = today.getDate();
		const WARNING_FROM_DATE = 15;
		if (date >= WARNING_FROM_DATE &&
				!checkAlreadyPaid()) {
			noti.confirm('Hôm nay là ngày ' + date + '.<br />Hãy đóng tiền điện nước!', markPaid, 'OK, đã đóng rồi', 'Để sau đi');
		}
	}
	
	init();
})();


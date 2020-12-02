$(function () {

	// Ngày hiện tại
	var today = new Date();

	// Biến toàn cục: tháng và năm hiện tại
	// Cần đóng gói lại
	var currentMonth = today.getMonth() + 1;
	var currentYear = today.getFullYear();

	// Chỉ số lớn nhất và nhỏ nhất của slide
	var slideMin = -3;
	var slideMax = 3;

	/**
	 * Lấy HTML của 1 tháng
	 * @param {Integer} offset 
	 */
	function getMonth(offset) {
		var m = currentMonth + offset;
		var y = currentYear;
		while (m < 1) {
			m += 12;
			y--;
		}
		while (m > 12) {
			m -= 12;
			y++;
		}
		return '<div class="amlich-item">' + lunarCalendarGui.printMonth(m, y) + "</div>";
	}

	/**
	 * Khởi tạo
	 */
	function init() {
		// Hiển thị 5 tháng
		for (var i = -2; i <= 2; i++) {
			$("#amlich").append(getMonth(i));
		}


		// Ẩn hiện Âm lịch	
		if (localStorage.showLunarDate == 'true') {
			$('#amlich').addClass('show-lunar');
		}

		// Bind nút "Hiện Âm lịch"
		// và gắn sự kiện cho nút đó
		$('#showLunarDate')
			.attr('checked', (localStorage.showLunarDate == 'true'))
			.click(function () {
				var isChecked = $('#showLunarDate').is(':checked');
				localStorage.showLunarDate = isChecked ? 'true' : 'false';
				$('#amlich').toggleClass('show-lunar');
			});


		$('#amlich').slick({
			dots: false,
			infinite: false,
			arrows: false, // chuyển thành true nhưng vẫn có thể không nhìn thấy do nó có color là white
			draggable: true,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			initialSlide: 2 // slide ở giữa
		}).on('swipe', function (event, slickObj, direction) {
			// Get the current slide
			var slideIndex = slickObj.currentSlide;

			// Nếu đã đến cuối bên phải thì thêm vào cuối
			if (slideIndex == slickObj.slideCount - 2) {
				slickObj.slickAdd(getMonth(slideMax));
				slideMax++;
			}

			// Nếu đã đến cuối bên trái thì thêm vào đầu
			if (slideIndex == 1) {
				// Phải chờ slick chuyển slide xong (tầm speed đang là 300)
				setTimeout(function () {
					// Slide có index là 1 bây giờ sẽ chuyển thành 2
					slickObj.currentSlide = slickObj.currentSlide + 1;
					slickObj.slickAdd(getMonth(slideMin), 0, true);
					slideMin--;
				}, 300);
			}
		});
	}

	init();
});

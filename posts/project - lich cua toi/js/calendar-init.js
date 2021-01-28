(function () {
    // Ngày hiện tại
    const today = new Date();

    // Biến toàn cục: tháng và năm hiện tại
    // Cần đóng gói lại
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    // Chỉ số lớn nhất và nhỏ nhất của slide
    let slideMin;
    let slideMax;

    // Vùng chứa lịch các tháng
    const calendarWrapper = document.querySelector('#amlich');

    /**
     * Lấy HTML của 1 tháng
     * @param {Integer} offset
     */
    function getMonth(offset) {
        let m = currentMonth + offset;
        let y = currentYear;
        while (m < 1) {
            m += 12;
            y--;
        }
        while (m > 12) {
            m -= 12;
            y++;
        }
        const div = document.createElement('div');
        div.innerHTML = lunarCalendarGui.printMonth(m, y);
        div.className = 'amlich-item nat-carousel-item';
        div.dataset.debug = m + '-' + y;
        return div;
    }

    /**
     * Bind nút "Hiện Âm lịch" và gắn sự kiện cho nút đó.
     */
    function handleShowLunarDate() {
        const showLunarDate = document.querySelector('#showLunarDate');

        if (localStorage.showLunarDate == 'true') {
            calendarWrapper.classList.add('show-lunar');
        }

        showLunarDate.checked = (localStorage.showLunarDate == 'true');
        showLunarDate.addEventListener('click', () => {
            localStorage.showLunarDate = showLunarDate.checked ? 'true' : 'false';
            calendarWrapper.classList.toggle('show-lunar');
        });
    }

    /**
     * Khởi tạo 7 tháng.
     */
    function initMonths() {
        slideMin = -4;
        slideMax = 4;

        for (let i = -3; i <= 3; i++) {
            calendarWrapper.appendChild(getMonth(i));
        }

        // Chuyển đến slide ở giữa
        Carousel.gotoItem(calendarWrapper, 3, false);
    }

    /**
     * Khởi tạo carousel.
     */
    function initCarousel() {
        calendarWrapper.addEventListener('swipe', () => {
            // Lấy chỉ số slide hiện tại
            const slideIndex = parseInt(calendarWrapper.dataset.startCarouselIndex);

            // Lấy tổng số slide
            const slideCount = calendarWrapper.querySelectorAll('.nat-carousel-item').length;

            // Nếu đã đến cuối bên phải thì thêm vào cuối
            if (slideIndex >= slideCount - 3) {
                // console.log(slideMax);
                calendarWrapper.appendChild(getMonth(slideMax));
                slideMax++;
            }

            // Nếu đã đến cuối bên trái thì thêm vào đầu
            if (slideIndex <= 1) {
                // console.log(slideMin);
                calendarWrapper.insertBefore(getMonth(slideMin), calendarWrapper.firstChild);
                slideMin--;
                Carousel.gotoItem(calendarWrapper, slideIndex + 1, false);
            }
        });
    }

    /**
     * Khởi tạo
     */
    function init() {
        initMonths();
        handleShowLunarDate();
        initCarousel();
    }

    init();
})();

(function () {
    // Ngày hiện tại
    const today = new Date();

    // Biến toàn cục: tháng và năm hiện tại
    // Cần đóng gói lại
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    // Chỉ số lớn nhất và nhỏ nhất của slide
    const slideMin = -3;
    const slideMax = 3;

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
     * Khởi tạo 5 tháng.
     */
    function initMonths() {
        calendarWrapper.style.visibility = 'hidden';
        for (let i = -2; i <= 2; i++) {
            calendarWrapper.appendChild(getMonth(i));
        }
        Carousel.gotoItem(calendarWrapper, 2);
        setTimeout(() => {
            calendarWrapper.style.visibility = 'visible';
        }, 250);
    }

    /**
     * Khởi tạo carousel.
     */
    function initCarousel() {
        // TODO: Bỏ đi
        $(calendarWrapper).slick({
            dots: false,
            infinite: false,
            arrows: false, // chuyển thành true nhưng vẫn có thể không nhìn thấy do nó có color là white
            draggable: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2 // slide ở giữa
        }).on('swipe', function (event, slickObj, direction) {
            /*
            // Get the current slide
            const slideIndex = slickObj.currentSlide;

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
            */
        });
    }

    /**
     * Khởi tạo
     */
    function init() {
        initMonths();
        handleShowLunarDate();
        // initCarousel();
    }

    init();
})();

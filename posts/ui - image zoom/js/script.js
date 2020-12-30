function imageZoom(imgId, resultId, lensId) {
    const img = document.getElementById(imgId);
    const result = document.getElementById(resultId);
    const lens = document.getElementById(lensId);

    // Tính toán tỷ lệ giữa thẻ div kết quả và kính lúp
    const cx = result.offsetWidth / lens.offsetWidth;
    const cy = result.offsetHeight / lens.offsetHeight;

    // set background properties for the result DIV
    // Thiết lập kết quả
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + 'px ' + (img.height * cy) + 'px';

    // Lắng nghe sự kiện di chuyển chuột hoặc touch (cho cả ảnh gốc và kính)
    lens.addEventListener('mousemove', moveLens);
    img.addEventListener('mousemove', moveLens);
    lens.addEventListener('touchmove', moveLens);
    img.addEventListener('touchmove', moveLens);

    /**
     * Hàm xử lý chính.
     * @param {Event} evt Đối tượng sự kiện
     */
    function moveLens(evt) {
        evt.preventDefault();

        // Lấy vị trí tọa độ
        const pos = getCursorPos(evt);

        // Tính toán vị trí của kính
        let x = pos.x - (lens.offsetWidth / 2);
        let y = pos.y - (lens.offsetHeight / 2);

        // Kiểm tra không cho kính ra ngoài ảnh gốc
        if (x > img.width - lens.offsetWidth) {
            x = img.width - lens.offsetWidth;
        }
        if (x < 0) {
            x = 0;
        }
        if (y > img.height - lens.offsetHeight) {
            y = img.height - lens.offsetHeight;
        }
        if (y < 0) {
            y = 0;
        }

        // Thiết lập vị trí kính
        lens.style.left = x + 'px';
        lens.style.top = y + 'px';

        // Thiết lập lại kết quả
        result.style.backgroundPosition = '-' + (x * cx) + 'px -' + (y * cy) + 'px';
    }

    /**
     * Lấy vị trí con trỏ.
     * @param {Event} evt Đối tượng sự kiện
     */
    function getCursorPos(evt) {
        evt = evt || window.event;

        // get the x and y positions of the image
        const a = img.getBoundingClientRect();

        // calculate the cursor's x and y coordinates, relative to the image
        let x = evt.pageX - a.left;
        let y = evt.pageY - a.top;

        // consider any page scrolling
        x -= window.pageXOffset;
        y -= window.pageYOffset;

        return {
            x,
            y
        };
    }
}

// Khởi tạo
imageZoom('myimage', 'myresult', 'mylens');

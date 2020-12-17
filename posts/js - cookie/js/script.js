/**
 * Hiển thị thông tin hiện tại.
 */
function displayInfo() {
    // Lấy cookie số lần
    let visit = getCookie('visit');
    visit = visit ? parseInt(visit) : 0;
    visit++;
    document.querySelector('#div-1').innerHTML = 'Bạn đã truy cập trang web ' + visit + ' lần.';

    // Thiết lập cookie
    setCookie('visit', visit, 1);

    // Lấy cookie thời điểm
    // Không lấy được thời điểm của cookie
    const lv = getCookie('visitc');
    if (lv) {
        document.querySelector('#div-2').innerHTML = 'Thời điểm truy cập cuối cùng là <b>' + lv + '</b>';
    }

    // Thiết lập cookie
    const wh = new Date();
    setCookie('visitc', wh, 1);
}

/**
 * Xóa cookie.
 */
function resetCount() {
    // Thiết lập lại cookie
    // setCookie('visit', 0, 1);
    deleteCookie('visit');
    deleteCookie('visitc');

    // Refresh page
    history.go(0);
}

displayInfo();

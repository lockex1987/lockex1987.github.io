function displayInfo() {
    // Lấy cookie số lần
    var visit = getCookie("visit");
    visit = visit ? parseInt(visit) : 0;
    visit++;
    document.querySelector('#div-1').innerHTML = "Bạn đã truy cập trang web " + visit + " lần.";
    setCookie("visit", visit, 1);
    

    // Lấy cookie thời điểm
    // Không lấy được thời điểm của cookie
    var lv = getCookie("visitc");
    if (lv) {
        document.querySelector('#div-2').innerHTML = "Thời điểm truy cập cuối cùng là <b>[displaydate]</b>".replace("\[displaydate\]", lv);
    }
    var wh = new Date();
    setCookie("visitc", wh, 1);
}

function resetCount() {
    // Thiết lập lại cookie
    setCookie("visit", 0, 1);

    // Refresh page
    history.go(0);
}

displayInfo();

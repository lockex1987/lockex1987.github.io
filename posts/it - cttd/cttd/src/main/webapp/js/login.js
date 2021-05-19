function changeCaptchaImage() {
	document.getElementById('myCaptchaImg').src = "captcha?" + new Date().getTime();
}

$(function() {               
    function checkLogin() {
    	if ($("#frm").invalidForm()) {
    		return;
    	}
    	
		$.ajax({
            url: "login",
            type: "POST",
            data: $("#frm").serialize(),
            success: function(data) {
            	// Kiểm tra có hiển thị mã captcha hay không
            	if (data.useCaptcha) {
            		document.getElementById('myCaptchaImg').src = "captcha?" + new Date().getTime();
            		$("#captchaContainer1, #captchaContainer2").show();
            	} else {
            		document.getElementById('myCaptchaImg').src = "images/no-image.png";
            		$("#captchaContainer1, #captchaContainer2").hide();
            	}

            	switch (data.returnCode) {
	            	case 1:
	            		noti.error("Người dùng hoặc mật khẩu không chính xác", { autoClose: true });
	            		break;
	            	case 5:
	            		noti.error("Mã xác nhận chưa chính xác", { autoClose: true });
	            		break;
	            	case 0:
	            		// Thành công
	            		// Có thể reload luôn để vào trang người dùng đang mong muốn
	            		// Chú ý phải xử lý riêng trường hợp logout
	            		if (window.location.pathname.indexOf("logout") >= 0) {
	            			window.location = "home"
	            		} else {
	            			window.location.reload();
	            		}
	            		
	            		break;
	            }
            }
        });
	}

    $("#frm").on('submit', function(e) {
        e.preventDefault();
        
        checkLogin();
    });
});
            

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <title>Đăng nhập</title>
    
    <jsp:include page="/WEB-INF/fragments/jsCss.jsp"></jsp:include>
	
	<style>
		.login-box {
			max-width: 400px;
		}
	</style>
</head>

<body>
        <div class="login-box container">
            <fieldset>
                <legend>Đăng nhập vào hệ thống</legend>

                <form action="home" method="get" id="frm">
                    <div class="form-group validate-container">
                        <input type="text" class="form-control" id="loginName" name="loginName" placeholder="Người dùng"
                        		data-required="true"
                        		data-required-message="Vui lòng nhập người dùng"/>
                    </div>
                    <div class="form-group validate-container">
                        <input type="password" class="form-control" id="password" name="password" placeholder="Mật khẩu"
                        		data-required="true"
                        		data-required-message="Vui lòng nhập mật khẩu"/>
                    </div>
                    <div id="captchaContainer1" style="display: none">
						<img id="myCaptchaImg" style="width: 200px; height: 70px;"/>
						<a href="" onclick="changeCaptchaImage(); return false;" title="Đổi ảnh khác" class="pull-right" style="margin-top: 25px;">
							<span class="glyphicon glyphicon-refresh"></span>
						</a>
					</div>
                    <div class="form-group validate-container" id="captchaContainer2" style="display: none">
                        <input type="password" class="form-control" id="captcha" name="captcha" placeholder="Mã xác nhận" autocomplete="off"
                        		data-required="true"
                        		data-required-message="Vui lòng nhập mã xác nhận"/>
                    </div>
                    <div>
                    	<button type="submit" class="btn btn-primary btn-block btn-flat">
                        	Đăng nhập
                        </button>
                    </div>
                </form>
            </fieldset>
        </div>
        
        <div>
        	<a href="public/download/index">My Download Manager</a>
        </div>

        <script src="js/login.js"></script>
    </body>
</html>

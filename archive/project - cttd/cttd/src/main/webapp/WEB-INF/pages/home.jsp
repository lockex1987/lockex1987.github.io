<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html>
<head>
	<title>Đăng nhập</title>
	
	<jsp:include page="/WEB-INF/fragments/jsCss.jsp"></jsp:include>
</head>

<body>
	<p>
		${fn:escapeXml(currentUser.fullName)} - Quản trị viên
	</p>

	<p><a href="logout">Sign out</a></p>
	<p><a href="word/index">Word</a></p>
</body>
</html>
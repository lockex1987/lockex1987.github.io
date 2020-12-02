/**
 * Thiết lập cookie.
 * @param cname Tên cookie
 * @param cvalue Giá trị của cookie
 * @param exdays Thời gian tồn tại của cookie (tính theo ngày)
 * @param domain Domain của cookie (thiết lập domain là domain chính để share cookie giữa các sub-domain)
 */
function setCookie(cname, cvalue, exdays, domain, secure) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    document.cookie = cname + "=" + encodeURIComponent(cvalue) +
			";" + "expires=" + d.toUTCString() +
			";path=/" +
            (domain ? ";domain=" + domain : "") +
            (secure ? ";secure" : "");
}

/**
 * Lấy giá trị cookie.
 * @param cname Tên cookie
 * @returns Giá trị của cookie
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        c = c.trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

// name - name of the desired cookie
// * return string containing value of specified cookie or null if cookie does not exist
function getCookie2(name) {
	var prefix = name + "=";
	var cookieStartIndex = document.cookie.indexOf(prefix)
	if (cookieStartIndex == -1)
		return null;
	var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
	if (cookieEndIndex == -1)
		cookieEndIndex = document.cookie.length;
	return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}

/**
 * Xóa cookie.
 * @param cname Tên cookie
 */
function deleteCookie(cname) {
    // Thiết lập giá trị rỗng
    // với thời hạn là một ngày trong quá khứ
	document.cookie = cname + "=" +
            ";expires=Thu, 01 Jan 1970 00:00:00 UTC" +
            ";path=/";
}


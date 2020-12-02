function extractRoomName(url) {
	var regExp = RegExp('room=(.+?)(&|$)');
	//var regExp = RegExp('room=(.+)(&|$)');
	var temp = regExp.exec(url) || [null, null];
	var roomName = decodeURI(temp[1]);
	console.log(url + ": " + roomName);
}

extractRoomName("room=abc123");
extractRoomName("http://myweb.com/?room=abc123");
extractRoomName("http://myweb.com/?");
extractRoomName("http://myweb.com/?room=abc123&user=lockex1987");
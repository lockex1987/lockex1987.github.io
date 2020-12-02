// source: http://stackoverflow.com/a/11058858
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

// source: http://stackoverflow.com/a/11058858
function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function stringToArray(bufferString) {
	let uint8Array = new TextEncoder("utf-8").encode(bufferString);
	return uint8Array;
}
function arrayToString(bufferValue) {
    //var errorMessage = new TextDecoder("utf-8").decode(xhr.response);
	return new TextDecoder("utf-8").decode(bufferValue);
}


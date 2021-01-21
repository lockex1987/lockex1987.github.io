/* W3Data ver 1.1 by W3Schools.com */
var w3DataObject = {};

function w3DisplayData(id, data) {
    var a, rowClone, x, j, i, ii, cc, repeat, repeatObj, repeatX = "";

    var htmlObj = document.getElementById(id);
    var htmlTemplate = w3InitTemplate(id, htmlObj);
    var html = htmlTemplate.cloneNode(true);
    var arr = w3GetElementsByAttribute(html, "w3-repeat");
    var l = arr.length;

    for (j = (l - 1); j >= 0; j -= 1) {
        cc = arr[j].getAttribute("w3-repeat").split(" ");
        if (cc.length == 1) {
            repeat = cc[0];
        } else {
            repeatX = cc[0];
            repeat = cc[2];
        }
        arr[j].removeAttribute("w3-repeat");
        repeatObj = data[repeat];

        if (repeatObj && typeof repeatObj == "object" && repeatObj.length != "undefined") {
            i = 0;
            for (x in repeatObj) {
                i += 1;
                rowClone = arr[j];
                rowClone = w3NeedleInHaystack(rowClone, "element", repeatX, repeatObj[x]);
                a = rowClone.attributes;
                for (ii = 0; ii < a.length; ii += 1) {
                    a[ii].value = w3NeedleInHaystack(a[ii], "attribute", repeatX, repeatObj[x]).value;
                }
                (i === repeatObj.length) ? arr[j].parentNode.replaceChild(rowClone, arr[j]) :
                        arr[j].parentNode.insertBefore(rowClone, arr[j]);
            }
        } else {
            console.log("w3-repeat must be an array. " + repeat + " is not an array.");
            continue;
        }
    }
    html = w3NeedleInHaystack(html, "element");
    htmlObj.parentNode.replaceChild(html, htmlObj);

    // Return the template object
    function w3InitTemplate(id, obj) {
        var template = obj.cloneNode(true);
        if (w3DataObject.hasOwnProperty(id)) {
            return w3DataObject[id];
        }
        w3DataObject[id] = template;
        return template;
    }

    // Get elements by attribute
    function w3GetElementsByAttribute(x, att) {
        var arr = [];
        var arrCount = -1;
        var i;
        var y = x.getElementsByTagName("*");
        var z = att.toUpperCase();
        var l = y.length;
        for (i = -1; i < l; i += 1) {
            if (i == -1) {
                y[i] = x;
            }
            if (y[i].getAttribute(z) !== null) {
                arrCount += 1;
                arr[arrCount] = y[i];
            }
        }
        return arr;
    }

    // ?
    function w3NeedleInHaystack(elmnt, typ, repeatX, x) {
        var value, haystack, pos2;
        var needle = [], needleToReplace, i, cc, r;
        var rowClone = elmnt.cloneNode(true);
        var pos1 = 0;
        while (pos1 > -1) {
            haystack = (typ == "attribute") ? rowClone.value : rowClone.innerHTML;
            pos1 = haystack.indexOf("{{", pos1);
            if (pos1 === -1) {
                break;
            }
            pos2 = haystack.indexOf("}}", pos1 + 1);

            needleToReplace = haystack.substring(pos1 + 2, pos2);
            needle = needleToReplace.split("||");

            value = undefined;
            for (i = 0; i < needle.length; i += 1) {
                needle[i] = needle[i].replace(/^\s+|\s+$/gm, ''); // trim
                //value = ((x && x[needle[i]]) || (data && data[needle[i]]));
                if (x) {
                    value = x[needle[i]];
                }
                if (value == undefined && data) {
                    value = data[needle[i]];
                }
                if (value == undefined) {
                    cc = needle[i].split(".");
                    if (cc[0] == repeatX) {
                        value = x[cc[1]];
                    }
                }
                if (value == undefined) {
                    if (needle[i] == repeatX) {
                        value = x;
                    }
                }
                if (value == undefined) {
                    if (needle[i].substr(0, 1) == '"') {
                        value = needle[i].replace(/"/g, "");
                    } else if (needle[i].substr(0, 1) == "'") {
                        value = needle[i].replace(/'/g, "");
                    }
                }
                if (value != undefined) {
                    break;
                }
            }
            if (value != undefined) {
                r = "{{" + needleToReplace + "}}";
                if (typ == "attribute") {
                    rowClone.value = rowClone.value.replace(r, value);
                } else {
                    w3ReplaceHTML(rowClone, r, value);
                }
            }
            pos1 = pos1 + 1;
        }
        return rowClone;
    }

    function w3ReplaceHTML(a, r, result) {
        var b, l, i, a, x, y, j, ll, nam;
        if (a.hasAttributes()) {
            b = a.attributes;
            l = b.length;
            for (i = 0; i < l; i += 1) {
                if (b[i].value.indexOf(r) > -1) {
                    b[i].value = b[i].value.replace(r, result);
                }
            }
        }
        x = a.getElementsByTagName("*");
        l = x.length;
        a.innerHTML = a.innerHTML.replace(r, result);
    }
}

function w3IncludeHTML() {
    var z = document.getElementsByTagName("*");
    for (var i = 0; i < z.length; i++) {
        if (z[i].getAttribute("w3-include-html")) {
            var a = z[i].cloneNode(false);
            var file = z[i].getAttribute("w3-include-html");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    a.removeAttribute("w3-include-html");
                    a.innerHTML = xhttp.responseText;
                    z[i].parentNode.replaceChild(a, z[i]);
                    w3IncludeHTML(); // Continue with child page?
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

function w3Http(target, readyfunc, xml, method) {
    var httpObj;
    if (!method) {
        method = "GET";
    }
    if (window.XMLHttpRequest) {
        httpObj = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        httpObj = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (httpObj) {
        if (readyfunc) {
            httpObj.onreadystatechange = readyfunc;
        }
        httpObj.open(method, target, true);
        httpObj.send(xml);
    }
}
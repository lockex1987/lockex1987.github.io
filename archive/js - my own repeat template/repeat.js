/*
W3Data ver 1.1 by W3Schools.com
Edited by lockex1987
Simplify, add ordinal template
*/
var cttd = (function() {

    // Main (and only) API
    function repeat(divId, data) {
        var rootHtmlObj = document.getElementById(divId);
        var allRepeatElements = getElementsByAttribute(rootHtmlObj, "cttd-repeat");

        for (var i = 0; i < allRepeatElements.length; i++) {
            var repeatElement = allRepeatElements[i];
            var cc = repeatElement.getAttribute("cttd-repeat").split(" "); // x in cars
            var repeatX = cc[0]; // x
            var repeatProperty = cc[2]; // cars
            repeatElement.removeAttribute("cttd-repeat");
            
            var dataArray = data[repeatProperty];
            if (dataArray && typeof dataArray == "object" && dataArray.length != "undefined") {
                var count = 0;
                for (var index = 0; index < dataArray.length; index++) {
                    var x = dataArray[index];
                    
                    var cloneElement = injectData(repeatElement, "element",   repeatX, x, index);
                    var atts = cloneElement.attributes;
                    for (var k = 0; k < atts.length; k++) {
                        atts[k].value = injectData(atts[k], "attribute", repeatX, x, index).value;
                    }

                    // Insert new element
                    // If it is the last new element, replace the old element with it
                    count++;
                    if (count === dataArray.length) {
                        repeatElement.parentNode.replaceChild(cloneElement, repeatElement);
                    } else {
                        repeatElement.parentNode.insertBefore(cloneElement, repeatElement);
                    }
                }
            } else {
                console.log("cttd-repeat must be an array. " + repeatProperty + " is not an array.");
                continue;
            }
        }
    }

    // Get elements that has the attribute "att" within parent object
    // @param parent HTML object
    // @param att attribute name
    function getElementsByAttribute(parent, att) {
        var a = [];
        var allElements = parent.getElementsByTagName("*");
        for (var i = 0; i < allElements.length; i++) {
            if (allElements[i].getAttribute(att) !== null) {
                a.push(allElements[i]);
            }
        }
        return a;
    }

    // @param repeatElement HTML element or an attribute
    // @param type Type "element" or "attribute"
    // @param repeatX repeat property of repeat objects
    // @param x the new value (object or scalar)
    // @param index The index of current element 
    function injectData(repeatElement, type, repeatX, x, index) {
        var cloneElement = repeatElement.cloneNode(true);
        var haystack = (type == "attribute") ? cloneElement.value : cloneElement.innerHTML;
        
        var pos1 = 0;
        while (pos1 > -1) {
            pos1 = haystack.indexOf("{{", pos1);
            if (pos1 === -1) {
                break;
            }
            var pos2 = haystack.indexOf("}}", pos1 + 1);
            var needle = haystack.substring(pos1 + 2, pos2);

            replaceRealData(cloneElement, type, repeatX, x, index, needle);

            pos1 = pos1 + 1;
        }
        return cloneElement;
    }

    function replaceRealData(cloneElement, type, repeatX, x, index, needle) {
        // Try to get the new value
        var newValue = undefined;
        if (needle === "#") {
            newValue = index + 1;
        } else if (needle == repeatX) {
            newValue = x;
        } else {
            var cc = needle.split(".");
            if (cc.length > 1 && cc[0] == repeatX) {
                newValue = x[cc[1]];
            }
        }

        // Replace template with real data
        if (newValue != undefined) {
            var oldValue = "{{" + needle + "}}";
            if (type == "attribute") {
                cloneElement.value     = cloneElement.value    .replace(oldValue, newValue);
            } else {
                cloneElement.innerHTML = cloneElement.innerHTML.replace(oldValue, newValue);
            }
        }
    }

    return {
        repeat: repeat
    }
})();

function getRect(node) {
    if (node.nodeType === 1) {
        // Nếu là element
        return node.getBoundingClientRect();
    } else if (node.nodeType === 3) {
        // Nếu là text
        let range = document.createRange();
        range.selectNode(node);
        let rect = range.getBoundingClientRect();
        range.detach(); // frees up memory in older browsers
        return rect;
    }
}

/**
 * Khởi tạo.
 */
function init() {
    var contentDiv = document.querySelector('#content');
    var backup = contentDiv.cloneNode(true)

    var container = document.createElement('div');
    container.className = 'row';

    var firstPage = document.createElement('div');
    firstPage.className = 'page';
    firstPage.appendChild(contentDiv);

    var secondPage = document.createElement('div');
    secondPage.className = 'page';

    // Thêm vào trang
    container.appendChild(firstPage);
    container.appendChild(secondPage);
    document.querySelector('article').appendChild(container);

    // Tùy chỉnh
    var cursorLine = document.querySelector('#cursorLine');
    cursorLine.style.width = firstPage.clientWidth + 'px';
    cursorLine.style.top = firstPage.getBoundingClientRect().top + 'px';

    firstPage.addEventListener('mousemove', function (evt) {
        let y = evt.clientY + document.documentElement.scrollTop;
        cursorLine.style.top = y + 'px';
    });

    firstPage.addEventListener('click', function (evt) {
        // Reset
        firstPage.innerHTML = '';
        firstPage.appendChild(backup.cloneNode(true));
        secondPage.innerHTML = '';

        var y = evt.clientY - firstPage.getBoundingClientRect().top; //  + document.documentElement.scrollTop
        //var y = evt.offsetY;
        //console.log(y);
        var parts = split4(firstPage, y)
        if (parts) {
            secondPage.appendChild(parts[1])
        }
    });
}

/**
 * Tách thành 2 phần.
 * @param {DOMNode} div Nội dung ban đầu
 * @param {Float} height Độ cao
 */
function split4(div, height) {
    var containerRect = div.getBoundingClientRect();
    var containerTop = containerRect.top;
    var containerRight = containerRect.right;

    var root = div.firstChild;

    var splitNode = findSplitNode2();

    if (!splitNode) {
        return null;
    }

    var partAfter = cloneAfter(root, splitNode);
    removeAfter(root, splitNode);
    return [
        root,
        partAfter
    ];

    /**
     * Xóa các phần tử còn lại.
     * @param {*} root 
     * @param {*} splitNode 
     */
    function removeAfter(root, splitNode) {
        var node = splitNode;

        do {
            // Xóa các phần tử cùng cấp phía sau
            var sibling = node.nextSibling;
            while (sibling) {
                var toRemove = sibling;
                sibling = sibling.nextSibling;
                toRemove.parentNode.removeChild(toRemove);
            }

            // Tiến lên 1 cấp
            node = node.parentNode;
        } while (node !== root);
    }

    /**
     * Clone các phần tử còn lại.
     * @param {DOMNode} root Phần tử bắt đầu
     * @param {DOMNode} splitNode Phần tử cuối cùng trước khi cắt
     */
    function cloneAfter(root, splitNode) {
        var node = splitNode;

        var newRoot;
        do {
            var tmp = node.parentNode.cloneNode(false);
            if (newRoot) {
                tmp.appendChild(newRoot);
            }
            newRoot = tmp;

            // Clone các phần tử cùng cấp phía sau
            var sibling = node.nextSibling;
            while (sibling) {
                newRoot.appendChild(sibling.cloneNode(true));
                sibling = sibling.nextSibling;
            }

            // Tiến lên 1 cấp
            node = node.parentNode;
        } while (node !== root);

        return newRoot;
    }

    function findSplitNode2() {
        // breakNode là phần tử đầu tiên mà quá chiều cao
        // splitNode là phần tử mà phía trước breakNode
        var splitNode = null;
        
        var breakNode = walk(root, function (node) {
            if (isLeaf(node)) {
                let rect = getRect(node);
                let nodeBottom = rect.bottom - containerTop;
                if (nodeBottom > height) {
                    return node;
                } else {
                    splitNode = node;
                }
            }
        });

        // Thử cắt phần tử text để tìm điểm cắt tốt hơn
        if (breakNode && breakNode.nodeType === 3) {
            var node = breakNode;
            // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue
            var len = node.nodeValue.length;
            var i = len - 2
            while (i > 0) {
                // https://developer.mozilla.org/en-US/docs/Web/API/Text/splitText
                const node2 = node.splitText(i)
                const rect2 = getRect(node2)
                const rect1 = getRect(node)

                if (rect1.bottom - containerTop < height && rect2.left < containerRight) {
                    // Đã tìm thấy vị trí đúng rồi
                    // Nối các phần tử text đã cắt ra về bình thường bằng hàm normalize (https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize)
                    // Tiếp theo thì cắt lại
                    node.parentNode.normalize();
                    node.splitText(i);
                    splitNode = node;
                    break;
                }

                i--;
            }
        }

        return splitNode;
    }

    /**
     * Kiểm tra có phải là lá hay không.
     * @param {DOMNode} node Phần tử
     */
    function isLeaf(node) {
        // Nếu không phải là element
        // hoặc là table
        // hoặc là không có con
        return node.nodeType !== 1 || node.tagName === 'TABLE' || node.childNodes.length === 0;
    }

    /**
     * Tìm phần tử là con cháu mà thỏa mãn hàm cho trước.
     * @param {DOMNode} node Node hiện tại
     * @param {Function} f Hàm kiểm tra
     */
    function walk(node, f) {
        // Nếu null, hoặc không phải element và text
        if (!node || (node.nodeType !== 1 && node.nodeType !== 3)) {
            return;
        }

        // Kiểm tra
        var r = f(node)
        if (r) {
            return r;
        }

        // Nếu là lá rồi thì dừng lại, không kiểm tra sâu xuống tiếp nữa
        if (isLeaf(node)) {
            return;
        }

        // Kiểm tra sâu xuống các con
        var children = Array.prototype.slice.call(node.childNodes)
        for (var i = 0; i < children.length; i++) {
            r = walk(children[i], f);
            if (r) {
                return r;
            }
        }
    }
}

init();

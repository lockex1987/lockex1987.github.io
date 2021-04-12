// Chỉ giữ những thẻ cần thiết nhất.

/**
 * Chuyển nội dung của thẻ ra ngoài (xóa thẻ nhưng vẫn giữ nội dung bên trong).
 * @param {DOMNode} el Phần tử hiện tại.
 */
function unwrapNode(el) {
    // Lấy phần tử cha
    const parent = el.parentNode;

    // Chuyển toàn bộ con của phần tử hiện tại ra ngoài phần tử cha
    while (el.firstChild) {
        parent.insertBefore(el.firstChild, el);
    }

    // Xóa phần tử hiện tại
    parent.removeChild(el);
}

/**
 * Cho nội dung văn bản vào trong thẻ.
 */
function wrapTextNode() {
    const children = document.body.childNodes;
    for (let i = 0; i < children.length; i++) {
        const node = children[i];
        const nodeName = node.nodeName.toLowerCase();
        // ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table']
        if (['#text', 'a'].includes(nodeName)) {
            const pTag = document.createElement('p');
            pTag.appendChild(node.cloneNode(true));
            node.replaceWith(pTag);
        } else if (['img'].includes(nodeName)) {
            const divTag = document.createElement('div');
            divTag.className = 'mb-3';
            divTag.appendChild(node.cloneNode(true));
            node.replaceWith(divTag);
        } else if (['br'].includes(nodeName)) {
            node.remove();
        }
    }
}



/**
 * Bỏ các thẻ div.
 */
function unwrapDiv() {
    document.querySelectorAll('div').forEach(el => unwrapNode(el));
}

/**
 * Bỏ các thẻ span.
 */
function unwrapSpan() {
    document.querySelectorAll('span').forEach(el => unwrapNode(el));
}

/**
 * Xóa thẻ <meta name="theme-color" content="#55acee"> do docs.js tạo ra.
 */
function removeThemeColorMetaTag() {
    const el = document.querySelector('meta[name=theme-color]');
    if (el) {
        el.parentNode.removeChild(el);
    }
}

// TODO: Xóa các thẻ style, script

/**
 * Bỏ các thẻ a mà không có thuộc tính href.
 */
function removeNoHrefLink() {
    document.querySelectorAll('a').forEach(el => {
        if (!el.href) {
            unwrapNode(el)
        }
    });
}

/**
 * Thay thế các phần tử có class là .italic thành phần tử <em>.
 */
function replaceItalicWithEm() {
    document.querySelectorAll('span[class=italic').forEach(spanTag => {
        const emTag = document.createElement('em');
        emTag.innerHTML = spanTag.innerHTML;
        spanTag.replaceWith(emTag);
    });
}

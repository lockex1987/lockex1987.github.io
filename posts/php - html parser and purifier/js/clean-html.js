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
 * Xóa các thuộc tính.
 */
function removeAttributes() {
    const attributes = [
        'style',
        'class',
        'id',
        // 'name',
        'ng-if',
        'ng-click',
        'ng-non-bindable',
        'spellcheck',
        'border',
        'cellpadding',
        'cellspacing',
        'data-lazy-type',
        'data-lazy-src',
        'data-lazy-srcset',
        'data-lazy-sizes',
        'data-file',
        'data-filename',
		'data-reactid',
        // 'rel',
        'height',
        'width',
        'alt',
        'scope',
        'srcset'
    ];
    attributes.forEach(attr => {
        document.querySelectorAll(`[${attr}]`)
            .forEach(ele => ele.removeAttribute(attr));
    });
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

/**
 * Lấy mã HTML.
 */
function getHtmlCode() {
    const code = document.documentElement.outerHTML;
    const normalized = code.replace(/&nbsp;/gi, ' ');
    // .replace(r'<p><a></a></p>', '')
    return normalized;
}

/**
 * Xóa các phần tử rỗng.
 * @param {DOMNode} node DOM node
 */
function removeEmptyNode(node) {
    const nodeName = node.nodeName.toLowerCase();
    if (['#text', 'img', 'script'].includes(nodeName)) {
        return;
    }

    // Xử lý những thằng con trước
    const children = node.childNodes;
    for (let i = 0; i < children.length; i++) {
        removeEmptyNode(children[i]);
    }

    const content = node.textContent.trim();
    if (!content) {
        const hasImage = node.querySelectorAll('img').length > 0;
        if (!hasImage) {
            console.log('Remove', node.outerHTML);
            node.remove();
        }
    }
}

/**
 * Copy văn bản vào clip-board.
 * @param text Văn bản
 */
function copyTextToClipboard(text) {
    // Cách làm là chúng ta tạo một đối tượng textarea,
    // thêm nó vào trang hiện tại (nhưng đừng hiển thị nó ra ngoài),
    // thiết lập nội dung của nó là văn bản,
    // chọn (bôi đen) và thực hiện lệnh copy,
    // cuối cùng thì bỏ đối tượng đi
    const tempElem = document.createElement('textarea');
    tempElem.style.position = 'absolute';
    tempElem.style.left = '-9999px';
    tempElem.style.top = '0px';
    tempElem.value = text;

    document.body.appendChild(tempElem);

    tempElem.select();
    tempElem.setSelectionRange(0, tempElem.value.length);
    document.execCommand('copy');

    document.body.removeChild(tempElem);
}

/**
 * Hàm chính thực hiện.
 */
function cleanHtml() {
    // replaceItalicWithEm();

    removeAttributes();
    removeNoHrefLink();

    unwrapDiv();
    unwrapSpan();
    removeThemeColorMetaTag();

    wrapTextNode();

    // Phải hỏi hàm này nhiều lần (có thể do quá nhiều node)
    for (let i = 0; i < 5; i++) {
        removeEmptyNode(document.body);
    }

    const htmlCode = getHtmlCode();
    copyTextToClipboard(htmlCode);

    alert('Copied');
}

cleanHtml();

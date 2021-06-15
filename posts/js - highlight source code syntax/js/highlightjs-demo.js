/**
Khi sử dụng thư viện highlight.js, HTML structure của đoạn code là:

<pre>
    <code class="lang hljs">
        <span class="hljs-*">...</span>
        <span class="hljs-*">...</span>
        ...
    </code>
</pre>

Thẻ pre không có định dạng gì.

Thẻ code có định dạng theo class hljs:

    background-color
    color

Các thẻ span có định dạng theo class hljs-*:

    color


*/

function highlightJsInlineAll() {
    const codes = document.querySelectorAll('pre > code');
    for (let i = 0; i < codes.length; i++) {
        const code = codes[i];
        highlightJsInlineOne(code);
    }
}

function highlightJsInlineOne(code) {
    const cs = window.getComputedStyle(code, null);
    const color = cs.getPropertyValue('color');
    const backgroundColor = cs.getPropertyValue('background-color');
    code.style.cssText = '';
    code.style.color = color;
    code.style.backgroundColor = backgroundColor;
    // code.style.display = 'block';
    // code.style.padding = '5px';
    // c.className = '';
    // delete c.className;
    code.removeAttribute('class');

    const spans = code.querySelectorAll('span');
    for (let i = 0; i < spans.length; i++) {
        const s = spans[i];
        const cs = window.getComputedStyle(s, null);
        const color = cs.getPropertyValue('color');
        s.style.cssText = '';
        s.style.color = color;
        // s.className = '';
        // delete s.className;
        s.removeAttribute('class');
    }
}

(function () {
    const code = document.querySelector('#code');
    const lang = document.querySelector('#lang');
    const output = document.querySelector('#output');

    const handleClick = (evt) => {
        // output.innerHTML = code.value;
        output.textContent = code.value.trim();
        output.className = lang.value;

        hljs.highlightBlock(output);

        // highlightJsInlineAll();
        highlightJsInlineOne(output);
    };

    document.querySelector('#highlight').addEventListener('click', handleClick);

    document.querySelector('#copy').addEventListener('click', (evt) => {
        copyToClipboard(output.parentNode.outerHTML.replace(' id="output"', ''));
        noti.success('Copied');
    });

    handleClick();
    // hljs.initHighlightingOnLoad();
})();

/**
 * Copy văn bản vào clip-board.
 * @param text Văn bản
 */
function copyToClipboard(text) {
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

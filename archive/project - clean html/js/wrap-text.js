function tagShouldWrap(tagName) {
	return ['#text', 'img', 'a', 'span', 'i', 'em', 'b', 'strong'].includes(tagName);
}

function tagShouldIgnore(tagName) {
	return ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table'].includes(tagName);
}

function tagShouldRemove(tagName) {
	return ['br'].includes(tagName);
}

function wrapTextNode(doc, currentNode) {	
    const children = currentNode.childNodes;
	const group = [];
    for (let i = 0; i < children.length; i++) {
		const node = children[i];
		const tagName = node.nodeName.toLowerCase();

		// Gặp các thẻ này thì dừng lại ngay, vì đã được bao ở thẻ hợp lệ
		if (tagShouldIgnore(tagName)) {
			continue;
		}
		
		// Không cần dùng thẻ br nữa
		if (tagShouldRemove(tagName)) {
			node.remove();
			continue;
		}

		// Các thẻ cần bao
		if (tagShouldWrap(tagName)) {
			group = [];
			group.push(node);
			while (i < children.length - 1 && tagShouldWrap(children[i + 1].nodeName.toLowerCase())) {
				group.push(children[i + 1]);
				i++;
			}
			wrapGroup(doc, group);
			continue;
		}
		
		// Xử lý đệ quy các thẻ div, section,...
        wrapTextNode(doc, node);
    }
}

function wrapGroup(doc, group) {
	console.log(group);
	const parentNode = group[0].parentNode;
	const pTag = doc.createElement('p');
	parentNode.insertBefore(pTag, group[0]);
	group.forEach(node => {
		pTag.appendChild(node); // .cloneNode(true)
		// currentNode.replaceWith(pTag);
	});
	return;
}

/**
 * Lấy mã HTML.
 */
function getHtmlCode(doc) {
    let code = doc.body.innerHTML;
    // code = code.replace(/&nbsp;/gi, ' ');
    return code;
}

/**
 * Parse mã HTML để sử dụng các hàm xử lý DOM.
 * Nếu sử dụng cách tạo 1 thẻ div, sau đó thiết lập innerHTML thì sẽ request đến cả ảnh, có thể chậm.
 * @param {String} htmlCode Mã HTML
 */
function parseDocumentFromString(htmlCode) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');
    return doc;
}

function wrapText(htmlCode) {
	const doc = parseDocumentFromString(htmlCode);
	wrapTextNode(doc, doc.body);
	return getHtmlCode(doc);
}

console.log(wrapText('<div>iabc<img/>xyz<a href="#">vvv</a></div>'));
console.log(wrapText('<div>Toi la <b>Huyen</b>.</div>'));

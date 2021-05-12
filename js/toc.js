const toc = (() => {
    /**
     * Sinh ra ID mặc định.
     * @param {String} text
     */
    function generateUniqueId(text) {
        // Thay thế ký tự . bằng ký tự _
        const baseId = text.replace(/\./g, '_');

        // Kiểm tra xem ID đã tồn tại hay chưa,
        // nếu ID đã tồn tại thì thêm các hậu tố _1, _2,... cho đến khi tìm thấy ID chưa sử dụng
        let suffix = '';
        let count = 1;
        while (document.getElementById(baseId + suffix) !== null) {
            suffix = '_' + count++;
        }

        return baseId + suffix;
    }

    /**
     * Lấy ra cấp độ của thẻ heading
     * @param {String} tagName Tên tag (h1, h2, h3, h4, h5, h6)
     * @param {Array} headingSelectors Mảng các heading tùy chọn
     */
    function getLevel(tagName, headingSelectors) {
        tagName = tagName.toUpperCase();
        return headingSelectors.indexOf(tagName);
    }

    /**
     * Hàm xử lý chính.
     * @param {DOMNode} el Thẻ danh sách gốc
     * @param {String} listTag Tên thẻ (ol hoặc ul)
     * @param {Array} headings Danh sách các heading
     * @param {Array} headingSelectors Danh sách các tag
     */
    function process(el, listTag, headings, headingSelectors) {
        // Level hiện tại
        let currentLevel = 0;

        // Mảng các thẻ ol hoặc ul, có thể là phần tử gốc hoặc các sub group
        const stack = [el];
        stack.push(el);

        // Chỉ số
        const indice = [];
        indice.push(0);

        // Duyệt danh sách heading
        headings.forEach((head) => {
            // Cấp độ của heading hiện tại
            const level = getLevel(head.tagName, headingSelectors);

            if (level > currentLevel) {
                // Level sâu hơn, chúng ta phải tạo một sub group mới
                // Lấy ra phần tử li cuối cùng parentItem
                // Thêm vào đầu stack
                const children = stack[stack.length - 1].children;
                if (children) {
                    const parentItem = children[children.length - 1];
                    const subGroupTag = document.createElement(listTag);
                    parentItem.appendChild(subGroupTag);
                    stack.push(subGroupTag);
                }

                indice.push(1);
            } else if (currentLevel === level) {
                indice[level]++;
            } else {
                // Xóa một số phần tử ở đầu mảng
                // Phải giữ ít nhất một phần tử
                const howMany = currentLevel - level;
                // console.log(level, howMany);
                stack.splice(stack.length - howMany, howMany);

                indice[level]++;
                indice.splice(level + 1, howMany);
            }

            // Cập nhật lại level
            currentLevel = level;

            // console.log(indice);

            // Thêm các số ở đầu
            const headingPrefix = indice.join('.');

            // Cập nhật lại ID cho các heading (nếu chưa có)
            if (!head.id) {
                head.id = generateUniqueId('heading_' + headingPrefix);
            }

            // Thêm phần tử vào danh sách
            appendListItem(stack[stack.length - 1], headingPrefix + '. ' + head.textContent, head.id);
        });
    }

    /**
     * Thêm phần tử vào danh sách.
     * @param {DOMNode} listGroupTag Thẻ ol hoặc ul hiện tại
     * @param {String} textContent Nhãn của heading
     * @param {String} id ID của heading
     */
    function appendListItem(listGroupTag, textContent, id) {
        // Tạo thẻ a, bao bởi thẻ li, rồi thêm vào thẻ ol hoặc ul
        const aTag = document.createElement('a');
        aTag.textContent = textContent;
        aTag.href = '#' + id;

        const liTag = document.createElement('li');
        liTag.appendChild(aTag);

        listGroupTag.appendChild(liTag);
    }

    /**
     * Khởi tạo mục lục.
     * @param {DOMNode} el Đối tượng DOM danh sách
     * @param {Object} options Tùy chọn
     */
    function buildToc(el, options) {
        // Đánh dấu, reset nội dung, thiết lập style
        el.dataset.toc = true;
        el.innerHTML = '';
        el.classList.add('toc');
        el.classList.add('custom-scrollbar');

        // Lấy các tùy chọn
        const thisOptions = Object.assign(
            {},
            // Mặc định
            {
                content: 'article',
                headings: 'h3, h4'
            },
            // Người dùng nhập
            options
        );

        // Chuẩn hóa tùy chọn headings
        const headingSelectors = thisOptions.headings
            .toUpperCase()
            .split(',')
            .map(s => s.trim());

        // Lấy ra phần tử bao
        const rootElement = document.querySelector(thisOptions.content);
        if (!rootElement) {
            return;
        }

        // Lấy ra danh sách các heading và chuẩn hóa
        const headings = rootElement.querySelectorAll(thisOptions.headings);

        // Danh sách là thẻ ol hoặc ul
        const listTag = el.tagName;

        // Xử lý
        process(el, listTag, headings, headingSelectors);
    }

    /**
     * Tự động khởi tạo với các phần tử có thuộc tính 'data-toc'.
     */
    function init() {
        const arr = document.querySelectorAll('[data-toc]');
        if (arr.length > 0) {
			// Chú ý: phải là thẻ UL
            arr.forEach((el) => {
                buildToc(el);
            });
        } else {
            const el = document.createElement('ul');
            const rootElement = document.querySelector('article');
            rootElement.insertBefore(el, rootElement.children[1]);
            buildToc(el);
        }
    }

    // Thêm sự kiện load trang
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Trả lại hàm để sử dụng ở những chỗ khác
    return buildToc;
})();

// Gọi JS bình thường
// toc(document.querySelector('[data-toc]'));

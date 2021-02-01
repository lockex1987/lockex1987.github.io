export default class Gui {
    /**
     * Duyệt cây bookmark, hiển thị folder và node.
     */
    showBookmarks(bookmarkTreeNodes, sourceLabel) {
        // Nhãn nguồn là từ đâu
        document.querySelector('#sourceLabel').textContent = sourceLabel;

        // Nội dung
        const bookmarksDiv = document.querySelector('#bookmarks');
        if (bookmarkTreeNodes.length > 0) {
            bookmarksDiv.innerHTML = '';
            const firstLevelNodes = bookmarkTreeNodes[0].children;
            const bookmarksBar = firstLevelNodes.find(e => e.title == 'Bookmarks bar');
            bookmarksDiv.appendChild(this.traverseChildren(bookmarksBar.children, 2));
        } else {
            bookmarksDiv.innerHTML = '<span class="text-danger">EMPTY</span>';
        }

        // Mục lục
        toc(document.querySelector('[data-toc]'));
    }

    /**
     * Duyệt danh sách các nút gốc, trả về đối tượng DOM gốc.
     * @param Array bookmarkNodes Danh sách bookmark
     */
    traverseChildren(bookmarkNodes, level) {
        const parentDiv = document.createElement('div');
        bookmarkNodes.forEach(b => {
            const childDiv = this.traverseNode(b, level);
            if (childDiv) {
                parentDiv.appendChild(childDiv);
            }
        });
        return parentDiv;
    }

    /**
     * Duyệt một nút bất kỳ. Hàm này sẽ được gọi đệ quy.
     * @param Object bookmarkNode Một nút bookmark
     */
    traverseNode(bookmarkNode, level) {
        // Bỏ qua thư mục rỗng
        if (!bookmarkNode.url &&
            (!bookmarkNode.children || bookmarkNode.children.length == 0)) {
            return null;
        }

        // Bỏ qua các thư mục đặc biệt 'Work' và 'Once'
        if (!bookmarkNode.url &&
            ['Work', 'Once'].includes(bookmarkNode.title)) {
            return null;
        }

        // Bỏ qua các bookmark lẻ không có trong thư mục nào
        // Các bookmark này thường là bookmark nhanh, tùy vào máy
        if (bookmarkNode.url &&
            level == 2 &&
            (!bookmarkNode.children || bookmarkNode.children.length == 0)) {
            return null;
        }

        if (bookmarkNode.url) {
            // Link sẽ có hostname ở đằng trước
            const div = document.createElement('div');
            div.className = 'mb-2';

            const url = new URL(bookmarkNode.url);
            let hostname = url.hostname;
            if (hostname) {
                if (hostname.startsWith('www.')) {
                    hostname = hostname.substring(4);
                }
                const hostnameSpan = document.createElement('div');
                hostnameSpan.className = 'text-muted';
                hostnameSpan.textContent = hostname;
                div.appendChild(hostnameSpan);
            }

            const linkTag = document.createElement('a');
            linkTag.href = bookmarkNode.url;
            linkTag.target = '_blank';
            linkTag.textContent = bookmarkNode.title;
            div.appendChild(linkTag);
            return div;
        } else {
            // Folder
            const heading = document.createElement('h' + (level + 1));
            heading.textContent = bookmarkNode.title;

            const section = document.createElement('section');
            section.appendChild(heading);
            if (bookmarkNode.children && bookmarkNode.children.length > 0) {
                // Duyệt đệ quy các nút con
                section.appendChild(this.traverseChildren(bookmarkNode.children, level + 1));
            }
            return section;
        }

        // Nút xóa
        /*
        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'https://lockex1987.github.io/images/icon/times.svg';
        deleteIcon.className = 'ml-2 align-baseline icon cursor-pointer d-none';
        li.appendChild(deleteIcon);
        */
    }
};

/**
 * Tham khảo https://developer.chrome.com/extensions/bookmarks
 */
export default class Bookmarks {
    /**
     * Lấy danh sách bookmark của trình duyệt.
     * @param {Function} callback Hàm callback, có tham số là danh sách bookmark
     */
    getBrowserBookmarks(callback) {
        chrome.bookmarks.getTree((bookmarkTreeNodes) => {
            callback(bookmarkTreeNodes);
        });
    }

    /**
     * Lấy ID của bookmark đặc biệt "Bookmarks bar".
     * @param {Function} callback
     */
    getBookmarksBarId(callback) {
        chrome.bookmarks.getTree((bookmarkTreeNodes) => {
            const firstChildren = bookmarkTreeNodes[0].children;
            const bookmarksBar = firstChildren.find(e => e.title == 'Bookmarks bar');
            callback(bookmarksBar.id);
        });
    }

    /**
     * Thêm bookmark.
     * @param {Array}} bookmarkTreeNodes
     * @param {*} bookmarksBarId
     */
    addBookmarks(bookmarkTreeNodes, bookmarksBarId) {
        if (bookmarkTreeNodes.length > 0) {
            const firstChildren = bookmarkTreeNodes[0].children;
            const cloudBookmarksBar = firstChildren.find(e => e.title == 'Bookmarks bar');
            this.traverseChildren(cloudBookmarksBar.children, 1, bookmarksBarId);
        }
    }

    /**
     * Duyệt danh sách các nút gốc, trả về đối tượng DOM gốc.
     * @param bookmarkNodes Danh sách bookmark
     */
    traverseChildren(bookmarkNodes, level, parentId) {
        bookmarkNodes.forEach(b => this.traverseNode(b, level, parentId));
    }

    /**
     * Duyệt 1 nút bất kỳ. Hàm này sẽ được gọi đệ quy.
     * @param bookmarkNode Một nút bookmark
     */
    traverseNode(bookmarkNode, level, parentId) {
        const title = bookmarkNode.title;
        const url = bookmarkNode.url;
        const children = bookmarkNode.children;

        const isFolder = !url;

        // Chỉ hiện khi thư mục không rỗng
        if (isFolder && (!children || children.length == 0)) {
            return null;
        }

        // Bỏ qua thư mục Work
        if (isFolder && (title == 'Work' || title == 'Once')) {
            return null;
        }

        // Bỏ qua các bookmark lẻ không có trong thư mục nào
        if (!isFolder && level == 1) {
            return null;
        }

        if (isFolder) {
            const data = {
                parentId: parentId,
                title: title
            };
            chrome.bookmarks.create(data, (newFolder) => {
                // Duyệt đệ quy các nút con
                if (children && children.length > 0) {
                    this.traverseChildren(children, level + 1, newFolder.id);
                }
            });
        } else {
            const data = {
                parentId: parentId,
                title: title,
                url: url
            };
            chrome.bookmarks.create(data);
        }
    }
};

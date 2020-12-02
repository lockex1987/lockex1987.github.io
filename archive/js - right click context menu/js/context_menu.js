/**
 * Kiểm tra xem có đang click ở bên trong phần tử xác định nào đó không.
 * 
 * @param {Object} evt Đối tượng event
 * @param {String} className Tên class mà phần tử chứa
 * @return Đối tượng được click hoặc là false
 */
function clickInsideClassName(evt, className) {
    var el = evt.target;

    if (el.classList.contains(className)) {
        return el;
    } else {
        while (el = el.parentNode) {
            if (el.classList && el.classList.contains(className)) {
                return el;
            }
        }
    }

    return false;
}

/**
 * Khởi tạo.
 * @param {Object} menu Đối tượng DOM menu
 * @param {Function} selectTriggerCallback Hàm gọi khi chọn một đối tượng và nhấn chuột phải
 * @param {Function} selectOptionCallback Hàm gọi khi chọn một tùy chọn từ các option của context menu
 */
function initContextMenu(menu, selectTriggerCallback, selectOptionCallback) {

    /**
     * Hiển thị menu.
     */
    function openMenu() {
        menu.classList.add('open');
    }

    /**
     * Ẩn menu.
     */
    function closeMenu() {
        menu.classList.remove('open');
    }

    /**
     * Thiết lập vị trí của menu, tương đối với vị trí click chuột.
     * Chú ý kiểm tra để không hiển thị ra ngoài window.
     * @param {Object} evt Đối tượng Event
     */
    function setMenuPosition(evt) {
        var clickX = evt.pageX;
        var clickY = evt.pageY;

        var menuWidth = menu.offsetWidth + 4;
        var menuHeight = menu.offsetHeight + 4;

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        
        if ( (windowWidth - clickX) < menuWidth ) {
            menu.style.left = windowWidth - menuWidth + 'px';
        } else {
            menu.style.left = clickX + 'px';
        }
        
        if ( (windowHeight - clickY) < menuHeight ) {
            menu.style.top = windowHeight - menuHeight + 'px';
        } else {
            menu.style.top = clickY + 'px';
        }
    }

    /**
     * Ẩn tất cả các phần tử được chọn.
     */
    function clearSelection() {
        document.querySelectorAll('.context-menu-trigger.selected').forEach(e => {
            e.classList.remove('selected');
        });
    }

    /**
     * Highlight đối tượng đang chọn (khi chuột phải).
     * @param {Object} el Đối tượng DOM đang được chọn
     */
    function setSelection(el) {
        el.classList.add('selected');
    }

    /**
     * Xử lý các sự kiện.
     */
    function handleEvents() {
        // Khi người dùng nhấn chuột phải ở trên phần tử trigger
        document.addEventListener('contextmenu', evt => {
            clearSelection();
    
            var contextMenuTrigger = clickInsideClassName(evt, 'context-menu-trigger');
            if (contextMenuTrigger) {
                evt.preventDefault();

                setMenuPosition(evt);
                openMenu();

                setSelection(contextMenuTrigger);
                if (selectTriggerCallback) {
                    selectTriggerCallback(contextMenuTrigger);
                }
            } else {
                closeMenu();
            }
        });

        // Khi người dùng click vào đâu đó
        document.addEventListener('click', evt => {
            // Mặc định ẩn menu, bỏ chọn
            closeMenu();
            clearSelection();

            // Khi người dùng chọn một tùy chọn nào đó
            var contextMenuOption = clickInsideClassName(evt, 'context-menu-option');
            if (contextMenuOption) {
                if (selectOptionCallback) {
                    selectOptionCallback(contextMenuOption);
                }
            }            
        });
    }

    handleEvents();
}
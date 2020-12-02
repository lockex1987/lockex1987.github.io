(() => {
    document.addEventListener('click', (evt) => {
        var currentNode = evt.target;
    
        // Click vào icon mở
        if (currentNode.classList.contains('sidebar-opener')) {
            document.body.classList.add('sidebar-opened');
            return;
        }
    
        // Click vào icon đóng
        if (currentNode.classList.contains('sidebar-closer')) {
            document.body.classList.remove('sidebar-opened');
            return;
        }
    
        // Kiểm tra nếu click ngoài sidebar
        var clickOnBox = false;
        while (currentNode) {
            if (currentNode.classList && currentNode.classList.contains('sidebar')) {
                clickOnBox = true;
                break;
            }
            currentNode = currentNode.parentNode;
        }
        if (!clickOnBox) {
            document.body.classList.remove('sidebar-opened');
        }
    });

    // Export phương thức ra ngoài scope
    window.closeSidebarNavigation = () => {
        document.body.classList.remove('sidebar-opened');
    };
})();

(function () {
    const pagi = new Pagi({
        container: document.getElementById('pagiId'),
        callbackFunc: gotoPage
    });

    function gotoPage(page) {
        const data = callServer(page);
        pagi.update(data.total, page);
        bindItems(data.items);
    }

    function callServer(page) {
        const pageSize = 10;
        const startIndex = (page - 1) * pageSize;
        const total = 156;
        const items = [];
        const end = Math.min(startIndex + pageSize, total);
        for (let i = startIndex; i < end; i++) {
            items.push('Item ' + (i + 1));
        }
        return {
            total,
            items
        };
    }

    function bindItems(items) {
        const dataDiv = document.getElementById('dataDiv');
        dataDiv.innerHTML = '';
        for (let i = 0; i < items.length; i++) {
            const div = document.createElement('div');
            div.textContent = (pagi.startIndex + i + 1) + '. ' + items[i];
            dataDiv.appendChild(div);
        }
    }

    function init() {
        gotoPage(1);
    }

    init();
})();

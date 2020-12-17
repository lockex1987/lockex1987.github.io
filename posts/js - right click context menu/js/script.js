function init() {
    var selectedId;

    var menu = document.querySelector('#myContextMenu');

    function selectTriggerCallback(contextMenuTrigger) {
        selectedId = contextMenuTrigger.dataset.id;
    }

    function selectOptionCallback(contextMenuOption) {
        var action = contextMenuOption.dataset.action;
        console.log(action, selectedId);
    }

    initContextMenu(menu, selectTriggerCallback, selectOptionCallback);
}

init();
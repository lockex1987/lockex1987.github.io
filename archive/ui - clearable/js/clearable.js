/**
 * Clearable
 */
(() => {

    function _listenToInputOnClearable() {
        document.addEventListener('input', (evt) => {
            if (evt.target.parentNode.classList.contains('clearable')) {
                let inputNode = evt.target;
                checkClearable(inputNode);
            }
        });
    }

    function _listenToClickOnX() {
        document.addEventListener('click', function (evt) {
            if (evt.target.classList.contains('x')) {
                let clearNode = evt.target;

                let inputNode = clearNode.previousElementSibling;
                inputNode.value = '';
                inputNode.focus();

                // Trigger sự kiện input, để những listener khác biết được
                let event = new Event('input', {
                    'bubbles': true,
                    'cancelable': true
                });
                inputNode.dispatchEvent(event);                
            }
        });
    }

    function checkAllClearables() {
        document.querySelectorAll('.clearable input').forEach(inputNode => checkClearable(inputNode));
    }

    function checkClearable(inputNode) {
        if (inputNode.value != '') {
            // Nếu input có giá trị thì hiện clear hoặc là thêm mới clear
            let ns = inputNode.nextElementSibling;
            if (!ns || !ns.classList.contains('x')) {    
                _insertClearNode(inputNode);
            }
        }
    }

    function _insertClearNode(inputNode) {
        let clearNode = document.createElement('span');
        clearNode.innerHTML = '&times;';
        clearNode.className = 'x';
        clearNode.title = 'Click to clear';
        inputNode.parentNode.insertBefore(clearNode, inputNode.nextSibling);
    }

    function _init() {
        _listenToInputOnClearable();
        _listenToClickOnX();
        checkAllClearables();
    }

    _init();
})();

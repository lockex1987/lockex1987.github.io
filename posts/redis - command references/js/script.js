// Based on https://redis.io/commands
(() => {
    // Lọc theo nhóm
    const filter = document.querySelector('#command-reference-filter');

    // Text
    const input = document.querySelector('#js-command-reference-search');

    // Danh sách lệnh
    const commands = document.querySelectorAll('#commands li');

    function filterCommandReference() {
        const group = filter.value;
        // Loại bỏ các ký tự đặc biệt
        const val = input.value.trim().toLowerCase().replace(/[^a-z0-9 ]/g, '');

        commands.forEach(c => {
            c.style.display = shouldShow(c, group, val) ? '' : 'none';
        });
    }

    function shouldShow(c, group, val) {
        if (group.length != 0) {
            const commandGroup = c.dataset.group;
            if (commandGroup != group) {
                return false;
            }
        }

        if (val !== '') {
            const commandName = c.dataset.name;
            if (!commandName.includes(val)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Chỉnh lại đường dẫn đúng của thẻ A.
     */
    function modifyLinks() {
        const links = document.querySelectorAll('#commands li a');
        const baseUrl = 'https://redis.io';
        links.forEach(a => {
            a.href = baseUrl + a.href.replace(location.origin, '');
            a.target = '_blank';
        });
    }

    modifyLinks();

    filter.addEventListener('change', filterCommandReference);
    input.addEventListener('input', filterCommandReference);

    filterCommandReference();
})();

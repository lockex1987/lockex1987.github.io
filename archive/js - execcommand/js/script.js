(() => {

    /**
     * Lệnh có hỗ trợ hay không.
     * @param {String} cmd Lệnh
     * @return true nếu lệnh hỗ trợ, ngược lại thì false
     */
    function isSupportedCommand(cmd) {
        return !!document.queryCommandSupported(cmd);
    }

    /**
     * Xử lý khi mà lệnh được click.
     */
    function processClickCommand() {
        let cmdKey = this.dataset.cmd;
        let cmd = commands.find(e => e.cmd == cmdKey);
        if (!isSupportedCommand(cmd.cmd)) {
            alert('execCommand(“' + cmd.cmd + '”)\nis not supported in your browser');
            return;
        }

        let val = (typeof cmd.val !== 'undefined') ? prompt('Value for ' + cmd.cmd + '?', cmd.val) : '';
        document.execCommand(cmd.cmd, false, (val || ''));
    }

    /**
     * Hiển thị danh sách các lệnh.
     */
    function bindCommandList() {
        let fragment = document.createDocumentFragment();
        commands.map((cmd) => {
            let icon = (typeof cmd.icon !== 'undefined') ? ('fa fa-' + cmd.icon) : '';
            let button = document.createElement('button');
            button.className = isSupportedCommand(cmd.cmd) ? 'btn-succes' : 'btn-error';
            button.title = cmd.desc;
            button.dataset.cmd = cmd.cmd;
            button.innerHTML = `<i class="${icon}"></i> ${cmd.cmd}`;

            // Thêm sự kiện click
            button.addEventListener('click', processClickCommand);

            fragment.appendChild(button);
        });

        let controls = document.querySelector('.editor__controls');
        controls.appendChild(fragment);
    }

    function insertYoutubeCommand() {
        document.querySelector('.editor__controls .youtube').addEventListener('mousedown', function (e) {
            let url = prompt("Link to the YouTube video");
            if (url == null) {
                return;
            }

            let id = '';
            if (url.includes('youtu.be')) {
                id = url.split('youtu.be/')[1];
                id = id.split('?')[0];
            } else {
                id = url.split('watch?v=')[1];
                id = id.split('&')[0];
            }

            let html = `<div class="embed">
                            <iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
                        </div>`;
            document.execCommand('insertHtml', false, html);
        });
    }

    function init() {
        bindCommandList();
        insertYoutubeCommand();
    }

    init();
})();

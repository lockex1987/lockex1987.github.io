<comic-viewer-close>
    <span class="closeButton" onclick={ returnListScreen }>
        &times;
    </span>


    <script>
        /**
         * Chuyển về trang danh sách.
         */
        returnListScreen() {
            Store.trigger('changeScreen', 'issue-list')
        }
    </script>


    <style>
        .closeButton {
            position: fixed;
            top: 10px;
            right: 20px;
            color: #666;
            font-size: 24px;
            font-weight: bold;
            line-height: 1;
        }
    </style>
</comic-viewer-close>
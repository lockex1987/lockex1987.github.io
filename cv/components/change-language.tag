<change-language>
    <div class="change-language">
        <a href="#" onclick={ switchToEnLanguage }>
            <span lang="en">English</span>
            <span lang="vi">Tiếng Anh</span>
        </a> 
        <a href="#" onclick={ switchToViLanguage }>
            <span lang="en">Vietnamese</span>
            <span lang="vi">Tiếng Việt</span>
        </a>
    </div>


    <script>
        switchToEnLanguage(evt) {
            this.switchLanguage('en');
        },

        switchToViLanguage(evt) {
            this.switchLanguage('vi');
        },

        switchLanguage(lang) {
            document.querySelectorAll('span[lang]').forEach((span) => {
                if (lang == span.getAttribute("lang")) {
                    span.style.display = "inline";
                } else {
                    span.style.display = "none";
                }
            });
        }
    </script>


    <style>
        .change-language {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 10;
            display: none;
        }
    </style>
</change-language>
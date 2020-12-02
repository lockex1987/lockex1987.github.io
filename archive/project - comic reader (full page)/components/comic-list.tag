<comic-list>
    <div show={ visible } class="p-15">
        <h2>Comic Reader - Full Page</h2>

        <div>
            <div class="comic" each="{comic in comics}" onclick={ chooseComic }>
                <div>
                    <img src="data/{ comic.path }/{ comic.avatar }"/>
                </div>
                <div>
                    { comic.title }
                </div>
            </div>
        </div>
    </div>

    <script>
        // Có hiển thị màn hình này không
        this.visible = true

        // Danh sách các truyện
        this.comics = [
            {
                title: 'Justice Society of America',
                path: 'justice-society-of-america',
                avatar: 'avatar.jpg'
            },
            {
                title: 'Trạng Quỷnh',
                path: 'trang-quynh',
                avatar: 'avatar.jpg'
            }
        ]

        /**
         * Lắng nghe sự kiện thay đổi màn hình để ẩn hiện màn hình.
         */
        listenChangeScreen() {
            var self = this
            Store.on('changeScreen', function(screen) {
                self.visible = (screen == 'comic-list')
                self.update()
            })
        }

        /**
         * Chọn truyện nào đó.
         */
        chooseComic(evt) {
            // Lấy ra truyện được click
            var comic = evt.item.comic
            //console.log(comic)

            // Đổi sang màn hình list và lấy danh sách các tập của truyện
            Store.trigger('changeScreen', 'issue-list')
            Store.comic = comic
            Store.trigger('chooseComic', comic)
        }

        // Khởi tạo
        this.on("mount", function() {
            this.listenChangeScreen()
        })
    </script>

    <style>
        .comic {
            border: 1px solid #555;
            border-radius: 5px;
            display: flex;
            padding: 10px;
            margin: 10px 0;
        }

        .comic img {
            width: 200px;
            height: 260px;
            object-fit: cover;
            margin-right: 20px;
        }
    </style>
</comic-list>
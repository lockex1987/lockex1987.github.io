<issue-list>
    <div show={ visible } class="p-15">
        <h2 onclick={ returnHomeScreen }>
            &larr;
            { comicTitle }
        </h2>

        <issue-bookmark></issue-bookmark>

        <div>
            <div class="issue" each="{issue in issues}">
                <a href="" onclick={ viewIssue }>
                    { issue.title }
                </a>
            </div>
        </div>
    </div>


    <script>
        // Có hiển thị màn hình này không
        this.visible = false

        // Danh sách các tập truyện
        this.issues = []

        // Tên của truyện hiện tại
        this.comicTitle = ''

        /**
         * Lấy danh sách các tập truyện.
         */
        getIssues() {
            var self = this

            // Đường dẫn đến file JSON chứa các trang của tập truyện
            var url = `data/${Store.comic.path}/list.json`

            // Đọc file JSON và hiển thị ảnh các trang
            fetch(url)
                    .then(res => res.json())
                    .then(issues => {
                        self.issues = issues
                        // Phải gọi cập nhật lại
                        self.update()

                        // Trigger sự kiện issuesLoaded để issue-bookmark.tag biết
                        Store.trigger('issuesLoaded', issues)
                    })
        }

        /**
         * Click vào một link tập truyện nào đó.
         */
        viewIssue(evt) {
            // Bỏ hành vi mặc định của thẻ a
            evt.preventDefault()

            // Lấy ra tập truyện được click
            // Chỗ each kia đang đặt tên biến là issue
            //console.log(evt);
            var issue = evt.item.issue

            // Đổi sang màn hình viewer
            Store.trigger('changeScreen', 'viewer')

            // Hiển thị các ảnh của tập truyện
            Store.trigger('viewIssue', issue)
            
            // Lưu lại index của tập đang đọc
            var issueIdx = this.issues.indexOf(issue)
            //console.log(issueIdx)
            Store.trigger('changeIssueIndex', issueIdx)
        }

        /**
         * Lắng nghe sự kiện thay đổi màn hình để ẩn hiện màn hình.
         */
        listenChangeScreen() {
            var self = this
            Store.on('changeScreen', function(screen) {
                self.visible = (screen == 'issue-list')
                self.update()
            })
        }

        /**
         * Lắng nghe sự kiện chọn truyện.
         */
        listenChooseComic() {
            var self = this
            Store.on('chooseComic', function(comic) {
                // Đổi tiêu đề
                self.comicTitle = comic.title;

                // Sẽ update ở hàm getIssues()
                //self.update()

                // Lấy danh sách các tập
                self.getIssues()
            })
        }

        /**
         * Chuyển về trang chủ.
         */
        returnHomeScreen() {
            Store.trigger('changeScreen', 'comic-list')
        }

        // Khởi tạo
        this.on("mount", function() {
            this.listenChangeScreen()
            this.listenChooseComic()
        })
    </script>


    <style>
        h2 {
            font-weight: 500;
            color: green;
            margin: 10px 0;
        }
        
        a {
            text-decoration: none;
            outline: none;
            word-wrap: break-word;
        }
        
        a:hover {
            text-decoration: underline;
        }
    </style>
</issue-list>

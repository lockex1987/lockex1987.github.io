<issue-bookmark>
    <div>
        <p if={ visibleCurrent }>
            Bạn đang đọc
            <a href="#" onclick={ gotoCurrentSavedChapter }>
                { issues[curIssueIdx].title }
                
            </a>
        </p>
        <p if={ visibleNext }>
            Đọc tập tiếp
            <a href="#" onclick={ gotoNextSavedChapter }>
                { issues[curIssueIdx + 1].title }
            </a>
            
        </p>
        <p if={ visiblePrev }>
            Đọc tập trước
            <a href="#" onclick={ gotoPreviousSavedChapter }>
                { issues[curIssueIdx - 1].title }
            </a>
        </p>
    </div>

    <script>
        // Danh sách các tập truyện
        this.issues = []

        // Trạng thái ẩn hiện các link
        this.visiblePrev = false
        this.visibleCurrent = false
        this.visibleNext = false

        // Tên để lưu vào localStorage
        this.localStorageName = ''

        // Index của tập truyện hiện tại
        var curIssueIdx = -1

        /**
         * Chuyển đến chương đang đọc.
         */
        gotoCurrentSavedChapter() {
            this.viewChapter(this.curIssueIdx);
        }

        /**
         * Chuyển đến chương tiếp.
         */
        gotoNextSavedChapter() {
            this.viewChapter(this.curIssueIdx + 1);
        }

        /**
         * Chuyển đến chương trước.
         */
        gotoPreviousSavedChapter() {
            this.viewChapter(this.curIssueIdx - 1);
        }

        /**
         * Hiển thị chương nào đó.
         * @param idx Chỉ số index của chương
         */
        viewChapter(idx) {
            // Trigger sự kiện thay đổi index
            Store.trigger('changeIssueIndex', idx)

            // Đổi sang màn hình viewer
            Store.trigger('changeScreen', 'viewer')

            // Lấy ra tập truyện được click
            var issue = this.issues[idx]

            // Hiển thị các ảnh của tập truyện
            Store.trigger('viewIssue', issue)
        }

        /**
         * Hiển thị các thông tin đã lưu ở localStorage.
         */
        bindSavedInfo() {
            var chapter = localStorage.getItem(this.localStorageName)
            //console.log('Giá trị ở localStorage', chapter)
            if (chapter != undefined && chapter != null && chapter != "-1") {
                // Trong trường hợp lưu ở localStorage thì là kiểu String
                // Cần chuyển về kiểu số để tính toán cho đúng
                this.curIssueIdx = parseInt(chapter);

                // Hiển thị chương hiện tại
                this.visibleCurrent = true

                // Chương tiếp theo
                if (this.curIssueIdx >= this.issues.length - 1) {
                    this.visibleNext = false
                } else {
                    this.visibleNext = true
                }

                // Chương trước
                if (this.curIssueIdx <= 0) {
                    this.visiblePrev = false
                } else {
                    this.visiblePrev = true
                }
            } else {
                // Ẩn
                this.visibleCurrent = false
                this.visiblePrev = false
                this.visibleNext = false
            }

            // Update lại giao diện
            this.update()
        }

        /**
         * Lắng nghe sự kiện các tập truyện load xong (issuesLoaded).
         */
        listenIssuesLoaded() {
            var self = this
            Store.on('issuesLoaded', function(issues) {
                //console.log('Danh sach da load xong', issues)

                // Lưu lại danh sách tập
                self.issues = issues
                
                // Hiển thị thông tin
                self.bindSavedInfo()
            })
        }

        /**
         * Lắng nghe sự kiện chọn truyện.
         */
        listenChooseComic() {
            var self = this
            Store.on('chooseComic', function(comic) {
                // Tên lưu ở localStorage
                self.localStorageName = comic.path + "-chapter";
                //console.log('Tên localStorage', self.localStorageName)
            })
        }

        /**
         * Lắng nghe sự kiện "changeIssueIndex", ví dụ khi click vào link một tập nào đó.
         */
        listenChangeIssueIndex() {
            var self = this
            Store.on('changeIssueIndex', function(issueIdx) {
                // Lưu lịch sử đọc
                localStorage.setItem(self.localStorageName, issueIdx);

                // Hiển thị lại thông tin
                self.bindSavedInfo()
            })
        }

        // Khởi tạo
        this.on("mount", function() {
            this.listenIssuesLoaded()
            this.listenChooseComic()
            this.listenChangeIssueIndex()
        })
    </script>

    <style>
        :scope {
            margin-bottom: 20px;
            display: block;
        }
    </style>
</issue-bookmark>

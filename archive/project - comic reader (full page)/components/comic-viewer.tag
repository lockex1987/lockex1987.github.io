<comic-viewer>
    <div show={ visible }>
        <comic-viewer-progress></comic-viewer-progress>

        <comic-viewer-close></comic-viewer-close>

        <div ref="readerBox" class="reader-box"></div>
    </div>


    <script>
        // Có hiển thị màn hình này không
        this.visible = false

        // Mảng các phần tử ảnh
	    this.images

        // Chỉ số index của trang hiện tại
        this.currentIndex
        
        viewIssue(jsonLink, title) {
            // Đường dẫn đến file JSON chứa các trang của tập truyện
            var url = `data/${Store.comic.path}/${jsonLink}`

            // Đọc file JSON và hiển thị ảnh các trang
            var self = this
            fetch(url)
                    .then(res => res.json())
                    .then(urls => {
                        self.displayImages(urls)
                    })
        }

        /**
         * Hiển thị ảnh các trang của 1 tập truyện.
         * @param {Array} urls Mảng đường dẫn ảnh các trang
         */
        displayImages(urls) {
            this.addImagesToPage(urls)
            this.currentIndex = 0
            this.displayCurrent()
        }

        /**
         * Thêm các phần tử ảnh vào trang.
         */
        addImagesToPage(urls) {
            this.refs.readerBox.innerHTML = ''
            this.images = []
            urls.forEach(u => {
                //console.log(u)
                var img = document.createElement("img")
                img.className = "img-page"
                img.src = u
                img.style.display = "none"
                this.refs.readerBox.appendChild(img)
                this.images.push(img)
            });
        }

        /**
         * Ẩn trang hiện tại.
         */
        hideCurrent() {
            this.images[this.currentIndex].style.display = "none"
        }

        /**
         * Hiện trang hiện tại
         */
        displayCurrent() {
            this.images[this.currentIndex].style.display = ""

            // Hiển thị chỉ số trang ở thanh trạng thái
            Store.trigger('updateProgress', {
                text: (this.currentIndex + 1) + " / " + this.images.length,
                percent: (this.currentIndex + 1) * 100 / this.images.length
            })
        }

        /**
         * Chuyển trang.
         * @param {Integer} offset Đến trang tiếp (1) hoặc trang trước đó (-1)
         */
        gotoPage(offset) {
            this.hideCurrent()
            this.currentIndex += offset
            this.displayCurrent()
        }

        /**
         * Xử lý full-screen.
         */
        toggleFullScreen() {
            if (isFullscreen()) {
                escapeFullscreen()
            } else {
                fullscreen(this.refs.readerBox)
            }
        }

        /**
        * Thêm sự kiện swipe trái và phải.
        */
        setSwipeEvent() {
            var self = this
            var mc = new Hammer(this.refs.readerBox)
            mc.on("swipeleft swiperight tap", function(ev) {
                if (ev.isFinal) {
                    if (ev.type == 'swipeleft') {
                        if (self.currentIndex + 1 < self.images.length) {
                            self.gotoPage(1)
                        }
                    } else if (ev.type == 'swiperight') {
                        if (self.currentIndex - 1 >= 0) {
                            self.gotoPage(-1)
                        }
                    } else if (ev.type == 'tap') {
                        //self.toggleFullScreen()
                    }
                }
            });
        }

        /**
         * Lắng nghe sự kiện thay đổi màn hình để ẩn hiện màn hình.
         */
        listenChangeScreen() {
            var self = this
            Store.on('changeScreen', function(screen) {
                self.visible = (screen == 'viewer')
                self.update()
            })
        }

        /**
         * Lắng nghe sự kiện 'viewIssue' để hiện thị các trang của một tập truyện nào đó.
         */
        listenViewIssue() {
            var self = this

            Store.on('viewIssue', function(issue) {
                self.viewIssue(issue.jsonLink, issue.title)
            })
        }

        // Khởi tạo
        this.on("mount", function() {
            this.setSwipeEvent()
            this.listenViewIssue()
            this.listenChangeScreen()
        })
    </script>


    <style>
        .reader-box {
            width: 100vw;
            height: 100vh;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .img-page {
            max-width: 100%;
            height: auto;
            max-height: 100%;
        }
    </style>
</comic-viewer>

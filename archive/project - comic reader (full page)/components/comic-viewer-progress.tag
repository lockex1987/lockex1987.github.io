<comic-viewer-progress>
    <div class="current-progress">
        <div class="bar" style="width: { percent }%"></div>

        <span class="current-index-label">
            { text }
        </span>
    </div>


    <script>
        // Text hiển thị
        this.text = '...'

        // Phần trăm hoàn thành
        this.percent = 0

        this.on("mount", function() {
            // Bắt sự kiện cập nhật
            var self = this
            Store.on('updateProgress', function(data) {
                self.text = data.text
                self.percent = data.percent
                self.update()
            })
        })
    </script>


    <style>
        .current-progress {
            position: fixed;
            top: 10px;
            left: 10px;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10;
            height: 20px;
            width: 100px;
        }

        .bar {
            background-color: blue;
            height: 20px;
            position: absolute;
            transition: width 0.5s;
        }

        .current-index-label {
            color: #FFF;
            position: absolute;
            left: 10px;
            line-height: 20px;
        }
    </style>
</comic-viewer-progress>

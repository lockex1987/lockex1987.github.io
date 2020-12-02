<the-right-panel>
    <div class="text-center">
        <img src="images/2019/right-layer-top-1.png" class="img-fluid" style="max-height: 45vh" id="rightTopImage"/>
    </div>
    <div class="text-right">
        <img src="images/2019/right-layer-bottom.png" class="img-fluid" style="max-height: 45vh"/>
    </div>


    <script>
        /**
         * Đổi ảnh để tạo hiệu ứng nhấp nháy.
         */
        changeImages() {
            var n = 1
            setInterval(function() {
                document.querySelector('#rightTopImage').src = `images/2019/right-layer-top-${n}.png`
                n++
                if (n > 2) {
                    n = 1
                }
            }, 1000)
        }

        // Khởi tạo
        this.on("mount", function() {
            this.changeImages()
        })
    </script>
</the-right-panel>

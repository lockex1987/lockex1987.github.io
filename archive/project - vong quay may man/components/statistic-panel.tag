<statistic-panel>
    <div id="statistic">
        <div class="item num_500">500x{ dataObj.num_500 }</div>
        <div class="item num_200">200x{ dataObj.num_200 }</div>
        <div class="item num_100">100x{ dataObj.num_100 }</div>
        <div class="item num_50">50x{ dataObj.num_50 }</div>
        <div class="item num_20">20x{ dataObj.num_20 }</div>
        <div class="item num_10">10x{ dataObj.num_10 }</div>
    </div>


    <script>
        // Dữ liệu thống kê
        this.dataObj = {
            num_500: '',
            num_200: '',
            num_100: '',
            num_50: '',
            num_20: '',
            num_10: ''
        }

        /**
         * Hiển thị thống kê số tiền từng loại (từ localStorage).
         */
        showLocalStatistic() {
            // Lấy thông tin ở localStorage
            this.dataObj = Settings.getData()
            this.update()
        }

        /**
         * Lắng nghe sự kiện cần cập nhật lại vùng thống kê.
         */
        listenShowLocalStatistic() {
            var self = this
            Store.on('ShowLocalStatistic', function(num) {
                self.showLocalStatistic()

                // Highlight thông số thay đổi
                if (num) {
                    $('#statistic .num_' + num).animateCss('shake')
                }
            })
        }

        // Khởi tạo
        this.on("mount", function() {
            // Hiển thị từng loại tiền hiện tại
            this.showLocalStatistic()

            this.listenShowLocalStatistic()
        })
    </script>


    <style>
        #statistic {
            margin: 10px 20px 160px 50px;
            color: rgb(183, 2, 16);
            padding: 50px 100px;
            font-size: 22px;
            background-image: url(./images/2019/statistic.png);
            font-weight: 500;
            background-size: cover;
            background-position: center;
        }

        #statistic .item {
            margin: 15px 0;
        }
    </style>
</statistic-panel>

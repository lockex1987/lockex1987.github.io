<the-wheel>
    <div class="frame position-relative mx-auto mt-5 mt-xl-0">
        <img id="wheel" class="w-100 h-100" src="images/2019/wheel.png" onclick={ processClick }/>
        <img id="kim" class="position-absolute" src="images/2019/kim.png" onclick={ processClick }/>
    </div>

    <div id="chan-vong" class="position-relative">
        <p id="result" class="animated infinite tada position-absolute text-center w-100">
            VTCCLOTT
        </p>
        <img style="width: 100%;" src="images/2019/base.png"/>
    </div>

    <div class="avatars d-none justify-content-between">
        <img id="ga-trai" src="images/ga-trai.png" class="animated infinite rotateImage"/>
        <img id="ga-phai" src="images/ga-phai.png" class="animated infinite rotateImage"/>
    </div>


    <script>
        // Đánh dấu có đang chạy hay không
        this.running = false

        // Góc quay
        // Phải để một biến tăng dần vì nếu không giả sử 2 lần quay giống nhau thì sẽ không có hiệu ứng quay
        this.rotate = 0

        /**
         * Thiết lập những sự kiện mà kích hoạt việc quay.
         * Click vào kim hoặc vòng.
         */
        processClick() {
            var self = this

            // Nếu đang chạy rồi thì không làm gì
            if (!this.running) {
                // Đánh dấu đang chạy
                this.running = true

                // Lấy kết quả ngẫu nhiên từ trên server.
                this.mockServer(function(data) {
                    // Hiển thị animation
                    self.playAnimate(data)
                })
            }
        }

        /**
         * Giả lập server, tính toán kết quả ngẫu nhiên.
         * @param {Function} callback Hàm callback
         */
        mockServer(callback) {
            // Lấy thông tin ở localStorage
            var dataObj = Settings.getData()

            // Mảng các khả năng
            var arr = []
            this.addOptionToArr(arr, dataObj.num_500, 500)
            this.addOptionToArr(arr, dataObj.num_200, 200)
            this.addOptionToArr(arr, dataObj.num_100, 100)
            this.addOptionToArr(arr, dataObj.num_50, 50)
            this.addOptionToArr(arr, dataObj.num_20, 20)
            this.addOptionToArr(arr, dataObj.num_10, 10)
            console.log(arr.length)

            // Tính ra số ngẫu nhiên
            var num
            if (arr.length > 0) {
                // Lấy ngẫu nhiên giá trị
                var rand = getRandomInt(0, arr.length - 1)
                num = arr[rand]

                // Cập nhật lại các tùy chọn
                dataObj['num_' + num] = dataObj['num_' + num] - 1
                Settings.updateData(dataObj)
            } else {
                // Giá trị mặc định
                num = 20
            }

            // Gọi hàm callback
            var serverResponse = {
                num: num,
                option: dataObj
            }
            console.log(serverResponse)
            callback(serverResponse)
        }

        /**
         * Thêm vào mảng các khả năng.
         * @param {Array} arr Mảng các khả năng
         * @param {Integer} num Số lượng
         * @param {Integer} value Mệnh giá
         */
        addOptionToArr(arr, num, value) {
            if (num > 0) {
                for (var i = 0; i < num; i++) {
                    arr.push(value)
                }
            }
            return arr
        }

        /**
         * Hiển thị animation quay quay sau khi có kết quả từ server.
         * @param {Object} serverResponse Kết quả từ server
         */
        playAnimate(serverResponse) {
            var self = this

            // Xóa kết quả cũ
            $('#result').html('')

            // Bắt đầu chơi nhạc
            document.querySelector('#sound').play()

            // Số quay được
            var num = serverResponse.num

            // Tính toán góc quay
            this.calculateRotateAngle(num)

            // Bắt đầu quay
            $('#wheel').rotate({
                animateTo: this.rotate,
                duration: 17 * 1000, // hiện nhạc đang 11 giây, chúng ta cho quay lâu hơn một chút (17 giây)
                easing: $.easing.easeInOutElastic,
                callback: function() {
                    // Hiển thị kết quả
                    self.showResult(serverResponse)
                }
            })
        }

        /**
         * Tính toán góc quay.
         * @param {Integer} num Kết quả quay
         */
        calculateRotateAngle(num) {
            // Số độ cần quay đến
            var addMore = 0

            // Đang quay cùng chiều kim đồng hồ
            // Có 6 vùng, độ dài mỗi vùng là 60
            // Có thể thử lại bằng hàm:
            //   $('#wheel').rotate({ animateTo: 330, duration: 1 * 1000, easing: $.easing.easeInOutElastic })
            switch (num) {
                case 500:
                    addMore = 30
                    break
                case 200:
                    addMore = 90
                    break
                case 100:
                    addMore = 150
                    break
                case 50:
                    addMore = 210
                    break
                case 20:
                    addMore = 270
                    break
                case 10:
                    addMore = 330
                    break
            }

            // Quay 10 vòng
            var numOfRound = 10

            // Reset về "0" độ
            this.rotate -= this.rotate % 360

            // Góc quay
            this.rotate += 360 * numOfRound + addMore
            //console.log(rotate)
        }

        /**
         * Hiển thị kết quả.
         */
        showResult(sr) {
            // Hiển thị số tiền quay được
            $('#result').html(sr.num + '.000')

            // Hiển thị từng loại tiền
            Store.trigger('ShowLocalStatistic', sr.num)

            // Đánh dấu đã chạy xong
            this.running = false
        }
    </script>


    <style>
        .frame {
            width: 550px;
            height: 550px;
        }

        #wheel {
            
        }

        #kim {
            cursor: pointer;
            top: 50%;
            left: 50%;
            width: 50px;
            transform: translate(-50%, calc(-50% - 5px));
        }

        #chan-vong {
            z-index: -1;
            width: 550px;
            margin: -40px auto 0;
        }

        #result {
            color: #f0c28e;
            font-size: 40px;
            height: 50px;
            margin-top: -25px;
            top: 67px;
        }

        .avatars {
            margin-top: -140px;
        }
    </style>
</the-wheel>

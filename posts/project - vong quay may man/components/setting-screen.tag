<setting-screen>
    <div class="container bg-white my-5 p-5 rounded">
        <h3>Cấu hình</h3>

        <form>
            <div class="form-group row">
                <label for="input_10" class="col-sm-2 col-form-label">
                    Số tờ 10.000
                </label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="input_10"/>
                </div>
            </div>
            <div class="form-group row">
                <label for="input_20" class="col-sm-2 col-form-label">
                    Số tờ 20.000
                </label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="input_20">
                </div>
            </div>
            <div class="form-group row">
                <label for="input_50" class="col-sm-2 col-form-label">
                    Số tờ 50.000
                </label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="input_50">
                </div>
            </div>
            <div class="form-group row">
                <label for="input_100" class="col-sm-2 col-form-label">
                    Số tờ 100.000
                </label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="input_100">
                </div>
            </div>
            <div class="form-group row">
                <label for="input_200" class="col-sm-2 col-form-label">
                    Số tờ 200.000
                </label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="input_200">
                </div>
            </div>
            <div class="form-group row">
                <label for="input_500" class="col-sm-2 col-form-label">
                    Số tờ 500.000
                </label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="input_500">
                </div>
            </div>

            <div class="form-group row">
                <div class="col-sm-10 offset-sm-2">
                    <button type="button" class="btn btn-primary" id="saveBtn" onclick={ clickSaveButton }>
                        Lưu
                    </button>
                    <button type="button" class="btn btn-secondary" id="cancelBtn" onclick={ clickCancelButton }>
                        Quay lại
                    </button>
                </div>
            </div>
        </form>
    </div>

    <script>
        /**
         * Nhấn nút Save.
         */
        clickSaveButton() {
            // Ẩn hiện màn hình
            showScreen('#mainScreen')

            // Lưu thông tin vào localStorage
            Settings.updateData({
                num_10: $('#input_10').val(),
                num_20: $('#input_20').val(),
                num_50: $('#input_50').val(),
                num_100: $('#input_100').val(),
                num_200: $('#input_200').val(),
                num_500: $('#input_500').val()
            })

            // Hiển thị từng loại tiền
            Store.trigger('ShowLocalStatistic')
        }

        /**
         * Nhấn nút Cancel.
         */
        clickCancelButton() {
            // Ẩn hiện màn hình
            showScreen('#mainScreen')
        }

        /**
         * Lắng nghe sự kiện cần hiển thị thông tin cấu hình.
         */
        listenShowOldSetting() {
            var self = this
            Store.on('ShowOldSetting', function() {
                //console.log('Vào đây 2')

                // Lấy thông tin ở localStorage
                var dataObj = Settings.getData()

                // Bind các trường input
                $('#input_10').val(dataObj.num_10)
                $('#input_20').val(dataObj.num_20)
                $('#input_50').val(dataObj.num_50)
                $('#input_100').val(dataObj.num_100)
                $('#input_200').val(dataObj.num_200)
                $('#input_500').val(dataObj.num_500)
                
                //self.update()
            })
        }

        // Khởi tạo
        this.on("mount", function() {
            this.listenShowOldSetting()
        })
    </script>
</setting-screen>

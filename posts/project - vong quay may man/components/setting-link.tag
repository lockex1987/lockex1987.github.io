<setting-link>
    <img src="images/setting.png" id="settingLink" title="Cấu hình" onclick={ clickSettingLink }/>


    <script>
        /**
         * Nhấn vào icon setting.
         */
        clickSettingLink() {
            // Ẩn hiện màn hình
            showScreen('#settingScreen')

            // Hiển thị thông tin cấu hình cũ
            Store.trigger('ShowOldSetting')

            //console.log('Vào đây')
        }
    </script>


    <style>
        #settingLink {
            position: fixed;
            top: 10px;
            right: 10px;
            width: 32px;
            height: 32px;
            cursor: pointer;
        }
    </style>
</setting-link>

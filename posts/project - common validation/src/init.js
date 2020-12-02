// Khởi tạo
(() => {
    // Thêm hàm String format
    if (!String.prototype.format) {
        String.prototype.format = function () {
            const args = arguments;

            return this.replace(/{(\d+)}/g, (match, number) => {
                return (typeof args[number] != 'undefined') ? args[number] : match;
            });
        };
    }

    CV.addRealTimeValidation();
})();

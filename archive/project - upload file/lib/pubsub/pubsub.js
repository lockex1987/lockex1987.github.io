var PubSub = (function() {

    // Map sự kiện với mảng các handler của các subscriber
    var events = {};

    /**
     * Publish.
     * @param {String} topic Tên topic
     * @param {Object} data Dữ liệu
     */
    function publish(topic, data) {
        var handlers = events[topic];
        if (!!handlers === false) {
            return;
        }

        // Duyệt các handler và thực hiện
        handlers.forEach(function(handler) {
            handler.call(this, data);
        });
    }

    /**
     * Subscribe.
     * @param {String} topic Tên topic
     * @param {Function} handler Hàm xử lý
     */
    function subscribe(topic, handler) {
        var handlers = events[topic];
        if (!!handlers === false) {
            handlers = events[topic] = [];
        }

        // Thêm handler vào mảng
        handlers.push(handler);
    }
    
    /**
     * Bỏ subscribe.
     * @param {String} topic Tên topic
     * @param {Function} handler Hàm xử lý
     */
    function unsubscribe(topic, handler) {
        var handlers = events[topic];
        if (!!handlers === false) {
            return;
        }

        // Xóa handler khỏi mảng
        var handlerIdx = handlers.indexOf(handler);
        handlers.splice(handlerIdx, 1);
    }

    // Export 3 API
    return {
        publish,
        subscribe,
        unsubscribe
    };
})();

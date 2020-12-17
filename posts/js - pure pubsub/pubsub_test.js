// Thêm subscriber 1
var echoUserHandler = function(user) {
    document.querySelector('#result1').innerHTML += user.name + "\n";
};
PubSub.subscribe('useradded', echoUserHandler);

// Thêm subscriber 2
PubSub.subscribe('useradded', function(user) {
    document.querySelector('#result2').innerHTML += user.name + "\n";
});


/**
 * Giả sử luồng là:
 * - nhấn submit form lên server để thêm user
 * - server trả về đối tượng JSON user
 * - sau đó publish sự kiện 'useradded'
 */
function testPubSub() {
    var user = {
        name: 'lockex1987'
    }
    PubSub.publish('useradded', user);
}

// Gọi lần 1, có 2 subscriber
testPubSub();

// Bỏ subscriber 1
PubSub.unsubscribe('useradded', echoUserHandler);

// Gọi lần 2, chỉ có 1 subscriber
testPubSub();

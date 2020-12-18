function notifyMe() {
    const options = {
        body: 'Whaaa, I\'m becoming well-adjusted, pay attention to me!',
        icon: 'images/happy_head.png'
    }
    const n = new Notification('Emogotchi says', options);
    setTimeout(n.close.bind(n), 5000);
}

function checkNotify(callback) {
    if (!('Notification' in window)) {
        // Kiểm tra trình duyệt có hỗ trợ hay không
        console.log('Trình duyệt không hỗ trợ notification');
    } else if (Notification.permission === 'granted') {
        // Nếu người dùng đã cho phép notification
        callback();
    } else if (Notification.permission !== 'denied') {
        // Nếu người dùng chưa từ chối thì xin phép
        Notification.requestPermission((permission) => {
            // Nếu người dùng cho phép
            if (permission === 'granted') {
                callback();
            }
        });
    }
}

function testCheckNotify() {
    checkNotify(() => {
        const notification = new Notification('Hi there!');
    });
}

function changeNotificationSetting() {
    const checkbox = document.querySelector('#notificationSettingCheckbox');
    if (checkbox.checked) {
        Notification.requestPermission()
            .then((result) => {
                console.log(result);
                checkbox.checked = (result === 'granted');

                updateNotificationSettingCheckbox();
            });
    } else {
        alert('Hiện không có API để revoke :(. Bạn phải cấu hình ở trình duyệt.');
        checkbox.checked = true;
        return;

        navigator.permissions.revoke({ name: 'notifications' })
            .then((result) => {
                console.log(result.state);
            });
    }
}

function updateNotificationSettingCheckbox() {
    const checkbox = document.querySelector('#notificationSettingCheckbox');
    checkbox.checked = (Notification.permission === 'granted');

    const notificationSettingContainer = document.querySelector('#notificationSettingContainer');
    const grantedMessage = document.querySelector('#grantedMessage');
    const deniedMessage = document.querySelector('#deniedMessage');

    notificationSettingContainer.style.display = 'none';
    grantedMessage.style.display = 'none';
    deniedMessage.style.display = 'none';

    if (Notification.permission === 'granted') {
        grantedMessage.style.display = '';
    } else if (Notification.permission === 'denied') {
        deniedMessage.style.display = '';
    } else {
        notificationSettingContainer.style.display = '';
    }
}

updateNotificationSettingCheckbox();

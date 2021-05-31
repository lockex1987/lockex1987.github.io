// Phải để file sw.js ở ngoài cùng
// Service worker chỉ có thể truy cập các file ở ngang cấp hoặc trong thư mục con
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        const file = '/archive/project%20-%20lich%20cua%20toi/sw.js';
        const options = {
            scope: '/archive/project%20-%20lich%20cua%20toi/'
        };
        navigator.serviceWorker.register(file, options);

        // Có thể để sw là global
        const sw = await navigator.serviceWorker.ready;
        console.log('Service worker registered', sw);

        if ('PushManager' in window) {
            const permissionResult = await Notification.requestPermission();
            console.log(permissionResult);

            if (permissionResult === 'granted') {
                // subscribe(sw);
            }
        }
    }
}

async function createNotificationSubscription() {
    // wait for service worker installation to be ready

    const sw = await navigator.serviceWorker.ready;

    // subscribe and return the subscription
    return await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: pushServerPublicKey
    });
}

async function getUserSubscription() {
    const sw = await navigator.serviceWorker.ready;
    const subscription = await sw.pushManager.getSubscription();
    console.log(subscription);
}

function addSubscriptionToDb(subscription) {
    const text = JSON.stringify(subscription);
    // Copy subscription ở điện thoại (share), ở máy tính thì phải bật trình duyệt mới hiển thị
    copyTextToClipboard(text);
    noti.success('Copied');
    console.log(text);
    /*
    const uid = subscription.endpoint.split('gcm/send/')[1];
    const options = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            uid: uid
        })
    };
    fetch(apiUrl, options);
    */
}

function deleteSubscriptionIDFromDB(subscription) {
    console.log(subscription);
    /*
    const uid = subscription.endpoint.split('gcm/send/')[1];
    const options = {
        method: 'DELETE',
        headers: new Headers({ 'Content-Type': 'application/json' })
    };
    fetch(apiUrl + uid, options);
    */
}

async function subscribe(sw) {
    const PUSH_SERVER_PUBLIC_KEY = 'BBnSIAYdc3P9b7YZvIc0omD8XtQpRYfAoxktE8QSnqR3sQtX5ycmoavs9aBT0CBUWM15bE9eib52BfrMJm_4mLA';
    const options = {
        userVisibleOnly: true,
        applicationServerKey: PUSH_SERVER_PUBLIC_KEY
    };
    const subscription = await sw.pushManager.subscribe(options);
    addSubscriptionToDb(subscription);
}

async function unsubscribe(sw) {
    const subscription = await sw.pushManager.getSubscription();
    await subscription.unsubscribe();
    deleteSubscriptionIDFromDB(subscription);
}

// if (window.matchMedia('(display-mode: standalone)').matches) {
// registerServiceWorker();


function handleStateChange() {
    const span = document.querySelector('#onLineStatus');
    if (navigator.onLine) {
        span.textContent = 'Online';
        span.classList.add('text-success');
        span.classList.remove('text-danger');
    } else {
        span.textContent = 'Offline';
        span.classList.remove('text-success');
        span.classList.add('text-danger');
    }
}

window.addEventListener('online', handleStateChange);
window.addEventListener('offline', handleStateChange);

handleStateChange();


async function subscribeNotification() {
    const sw = await navigator.serviceWorker.ready;
    subscribe(sw);
}


/**
 * Copy văn bản vào clip-board.
 * @param text Văn bản
 */
function copyTextToClipboard(text) {
    // Cách làm là chúng ta tạo một đối tượng textarea,
    // thêm nó vào trang hiện tại (nhưng đừng hiển thị nó ra ngoài),
    // thiết lập nội dung của nó là văn bản,
    // chọn (bôi đen) và thực hiện lệnh copy,
    // cuối cùng thì bỏ đối tượng đi
    let tempElem = document.createElement('textarea');
    tempElem.style.position = 'absolute';
    tempElem.style.left = '-9999px';
    tempElem.style.top = '0px';
    tempElem.value = text;

    document.body.appendChild(tempElem);

    tempElem.select();
    tempElem.setSelectionRange(0, tempElem.value.length);
    document.execCommand('copy');

    document.body.removeChild(tempElem);
}

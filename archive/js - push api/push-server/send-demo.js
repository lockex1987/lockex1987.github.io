const webpush = require('web-push');

const subscriptions = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eZy2nKyF6No:APA91bGQ-ILXqcdV4z-bgAxjaOjwraOLTda71UQsIC0Ray3DOmC4GCbDgJyN72mGgRB-RARFd5WX3935BEEWjpLrJMBPGA8VG2AhTm6KXwsDyQJOHDICujE9dDi1qcTUaEruC9DPHMUT",
    "expirationTime": null,
    "keys": {
        "p256dh": "BJ0juWD6cuRR73OEZe47AkQaxI4G7yTQRQA448EK19SyJfsRn4j0KIqoeeASQV-o8MD0eJ_eMcvr0exFyrY1p-Q",
        "auth": "jvkV4TqbiHQSK2yxE0i7gQ"
    }
};


const vapidKeys = {
    privateKey: 'EknRaMxuElWBctSiOcZPJxr_Vx3nH7QKQp6GH9UtDLc',
    publicKey: 'BBnSIAYdc3P9b7YZvIc0omD8XtQpRYfAoxktE8QSnqR3sQtX5ycmoavs9aBT0CBUWM15bE9eib52BfrMJm_4mLA'
};

webpush.setVapidDetails(
    'mailto:lockex1987@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

// Create payload
/*
const payload = JSON.stringify({
    title: 'Push Test',
    message: 'Notified by lockex1987 ' + (new Date()).toTimeString()
});
*/
const payload = 'Test message';


webpush.sendNotification(subscriptions, payload)
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.error(err);
    });

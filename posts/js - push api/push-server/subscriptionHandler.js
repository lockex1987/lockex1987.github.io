const crypto = require('crypto');
const webpush = require('web-push');

const subscriptions = {};

const vapidKeys = {
    privateKey: 'EknRaMxuElWBctSiOcZPJxr_Vx3nH7QKQp6GH9UtDLc',
    publicKey: 'BBnSIAYdc3P9b7YZvIc0omD8XtQpRYfAoxktE8QSnqR3sQtX5ycmoavs9aBT0CBUWM15bE9eib52BfrMJm_4mLA'
};

webpush.setVapidDetails(
    'mailto:lockex1987@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

function createHash(input) {
    const md5sum = crypto.createHash('md5');
    md5sum.update(Buffer.from(input));
    return md5sum.digest('hex');
}

function handlePushNotificationSubscription(req, res) {
    const subscriptionRequest = req.body.data;
    const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
    subscriptions[susbscriptionId] = subscriptionRequest;
    res.status(201)
        .json({
            id: susbscriptionId
        });
}

function sendPushNotification(req, res) {
    const subscriptionId = req.params.id;
    const pushSubscription = subscriptions[subscriptionId];
    const payload = JSON.stringify({
        title: 'New Product Available ',
        text: 'HEY! Take a look at this brand new t-shirt!',
        image: '/images/jason-leung-HM6TMmevbZQ-unsplash.jpg',
        tag: 'new-product',
        url: '/new-product-jason-leung-HM6TMmevbZQ-unsplash.html'
    });
    webpush.sendNotification(pushSubscription, payload)
        .catch((err) => {
            console.log(err);
        });
    res.status(202)
        .json({});
}

module.exports = {
    handlePushNotificationSubscription,
    sendPushNotification
};

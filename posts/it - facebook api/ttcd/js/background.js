/**
 * Chỉnh Origin, Referer các request đến Facebook API.
 */
function modifyHeadersOfFacebookApiRequest() {
    chrome.webRequest.onBeforeSendHeaders.addListener(
        (details) => {
            if (details.url && details.url.indexOf('www.facebook.com/v1.0/dialog/oauth/confirm') > -1) {
                let hasOrigin = false;
                let hasReferer = false;

                for (let i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name.toLowerCase() === 'origin') {
                        details.requestHeaders[i].value = 'https://www.facebook.com';
                        hasOrigin = true;
                    }
                    if (details.requestHeaders[i].name.toLowerCase() === 'referer') {
                        details.requestHeaders[i].value = 'https://www.facebook.com';
                        hasReferer = true;
                    }
                }

                if (!hasOrigin) {
                    details.requestHeaders.push({
                        name: 'Origin',
                        value: 'https://www.facebook.com'
                    });
                }
                if (!hasReferer) {
                    details.requestHeaders.push({
                        name: 'Referer',
                        value: 'https://www.facebook.com/'
                    });
                }
                //console.log('Vào đây', details.requestHeaders);
            }

            return {
                requestHeaders: details.requestHeaders
            };
        },
        {
            urls: ['<all_urls>']
        },
        [
            'blocking',
            'requestHeaders'
        ]
    );
}

modifyHeadersOfFacebookApiRequest();

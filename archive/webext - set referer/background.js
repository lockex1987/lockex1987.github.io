/**
 * https://chrome.google.com/webstore/detail/manga-downloader/fojcpnmhelbpakmgaakfhjlmjokocgjg?hl=en
 */
function checkRequestHeaders(details) {
    const newRef = 'https://mangakakalot.com/';
    let gotRef = false;

    // const originEntry = responseHeaders.find(({ name }) => name.toLowerCase() === 'access-control-allow-origin');

    for (let n in details.requestHeaders) {
        gotRef = details.requestHeaders[n].name.toLowerCase() == 'referer';
        if (gotRef) {
            details.requestHeaders[n].value = newRef;
            break;
        }
    }
    if (!gotRef) {
        details.requestHeaders.push({
            name: 'Referer',
            value: newRef
        });
    }
    return { requestHeaders: details.requestHeaders };
}

const filterObject = {
    urls: [
        // '<all_urls>'
        // 'https://s8.mkklcdnv8.com/*',
        '*://*.mkklcdn.com/*',
        '*://*.mkklcdnv2.com/*',
        '*://*.mkklcdnv3.com/*',
        '*://*.mkklcdnv4.com/*',
        '*://*.mkklcdnv5.com/*',
        '*://*.mkklcdnv6.com/*',
        '*://*.mkklcdnv7.com/*',
        '*://*.mkklcdnv8.com/*',
        '*://*.mkklcdnv31.com/*',
        '*://*.mkklcdnv41.com/*',
        '*://*.mkklcdnbuv1.com/*'
        // '*://*.mgicdn.com/*',
    ]
};

const extraInfoArray = [
    'requestHeaders',
    'blocking',
    'extraHeaders'
];

chrome.webRequest.onBeforeSendHeaders.addListener(checkRequestHeaders, filterObject, extraInfoArray);

// chrome.webRequest.onBeforeSendHeaders.removeListener(checkRequestHeaders);

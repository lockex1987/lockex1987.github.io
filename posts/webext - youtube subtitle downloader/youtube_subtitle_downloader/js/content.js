(async () => {
    const src = chrome.runtime.getURL('js/youtube-subtitle-downloader.js');
    const ysd = await import(src);
    ysd.init();
})();

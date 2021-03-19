(async () => {
    const src = chrome.extension.getURL('js/youtube-subtitle-downloader.js');
    const ysd = await import(src);
    ysd.init();
    // console.log('Nguyễn Anh Tuấn');
})();

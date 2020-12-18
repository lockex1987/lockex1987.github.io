if (!window.pageViewer) {
    function addCss(css) {
        var style = document.createElement('style');
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.head.appendChild(style);
    }
    
    addCss(`html { overflow-y: auto; }
    .viewer { box-sizing: border-box; position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; z-index: 10000; background: #FFF; display: none; overflow: hidden; }
    .viewer.show { display: block; }
    .viewer.show .content-wrapper { animation: fadeIn 0.5s; }
    .viewer .content-wrapper { height: 100%; width: 100%; max-width: 700px; margin: 0 auto; overflow: hidden; cursor: grab; }
    .viewer .content-wrapper .content { height: 100%; user-select: none; pointer-events: none; }
    .viewer .content-wrapper .content p { line-height: 1.5; font-size: 16px; text-align: justify; }
    .viewer .content-wrapper .content table, .viewer .content-wrapper .content figure { break-inside: avoid; }
    .viewer .info { position: absolute; top: 10px; text-align: center; left: 16px; font-size: small; color: rgba(0, 0, 0, 0.5); }
    .viewer .btn { background: transparent; box-shadow: none; border: none; cursor: pointer; min-width: unset; margin: 0; height: auto; line-height: 1; padding: 0 16px; }
    .viewer .btn:hover, .viewer .btn:focus { box-shadow: none; outline: none; }
    .viewer .btn-close { position: absolute; right: 0px; top: 10px; color: #ee3724; font-weight: 700; font-size: 24px; width: 60px; }
    .viewer .btn-nav { color: #007bff; font-size: 96px; position: absolute; top: 50%; transform: translateY(-50%); display: none; }
    .viewer .btn-nav.btn-first { left: 0; }
    .viewer .btn-nav.btn-last { right: 0; }
    @media (min-width: 1000px) { .viewer .btn-nav { display: block; } }
    @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); } }
    `);

    // Khai báo class PageViewer ở đây

    window.pageViewer = new PageViewer();
}

window.pageViewer.show();


// Tích hợp vào docs.js

// Highlight source code syntax
(() => {
    function loadJsFile(filePath) {
        const scriptTag = document.createElement('script');
        // scriptTag.setAttribute('type', 'text/javascript');
        scriptTag.setAttribute('src', filePath);
        scriptTag.async = false; // thêm dòng này thì mới giữ được thứ tự các script
        document.head.appendChild(scriptTag);
    }

    function loadCssFile(filePath) {
        const linkTag = document.createElement('link');
        // linkTag.type = 'text/css';
        linkTag.rel = 'stylesheet';
        linkTag.href = filePath;
        document.head.appendChild(linkTag);
    }

    function highlighSourceCodeSyntax() {
        const codeBlocks = [...document.querySelectorAll('pre[data-code-lang]')];
        if (codeBlocks.length == 0) {
            return;
        }

        // Lấy danh sách các ngôn ngữ sử dụng, không duplicate
        const languages = new Set(codeBlocks.map(code => code.dataset.codeLang));
        if (languages.has('htmlmixed')) {
            languages.add('xml');
            languages.add('javascript');
            languages.add('css');
        }
        if (languages.has('php')) {
            languages.add('xml');
            languages.add('javascript');
            languages.add('css');

            languages.add('htmlmixed');

            languages.add('clike');
        }
        // console.log(languages);

        // Thêm file CSS
        loadCssFile('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.61.1/codemirror.min.css');
        // loadCssFile('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.61.1/theme/monokai.min.css');
        loadCssFile('../../css/typora-codemirror.css');

        // Thêm các file JS
        loadJsFile('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.61.1/codemirror.min.js');
        loadJsFile('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.61.1/addon/runmode/runmode.min.js');
        for (const lang of languages) {
            loadJsFile(`https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.61.1/mode/${lang}/${lang}.min.js`);
        }
        loadJsFile('../../js/highlight-source-code-syntax.js');
    }

    highlighSourceCodeSyntax();
})();

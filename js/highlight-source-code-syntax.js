(() => {
    const codeBlocks = [...document.querySelectorAll('pre.code')];
    codeBlocks.forEach(code => {
        const source = code.textContent;
        // const source = code.innerHTML;
        const lang = code.dataset.lang;
        code.innerHTML = '';

        /*
        CodeMirror(code, {
            value: source,
            mode: lang,
            lineNumbers: false,
            readOnly: true,
            // theme: 'monokai'
        });
        */
        code.classList.add('cm-s-inner'); // cm-s-default, cm-s-monokai, cm-s-inner (Typora)
        code.classList.add('CodeMirror');
        CodeMirror.runMode(source, lang, code);
    });
})();

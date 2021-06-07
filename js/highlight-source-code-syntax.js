(() => {
    const codeBlocks = [...document.querySelectorAll('pre[data-code-lang]')];
    codeBlocks.forEach(code => {
        const source = code.innerText;
		// const source = code.textContent;
        // const source = code.innerHTML;
		// console.log(source);

        const lang = code.dataset.codeLang;
        code.innerHTML = '';
		
		
		const mode = (lang == 'php')
			? {
				name: 'php',
				startOpen: true
			} // làm thế này để không phải khai báo <?php ở đầu
			: lang;

        /*
        CodeMirror(code, {
            value: source,
            mode: mode,
            lineNumbers: false,
            readOnly: true,
            // theme: 'monokai'
        });
        */

        code.classList.add('cm-s-inner'); // cm-s-default, cm-s-monokai, cm-s-inner (Typora)
        code.classList.add('CodeMirror');
        CodeMirror.runMode(source, mode, code);
    });
})();

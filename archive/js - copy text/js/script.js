let btnCopy = document.querySelector('#btnCopy');
let demoTextInput = document.querySelector('#demoTextInput');

btnCopy.addEventListener('click', () => {
    let text = demoTextInput.value.trim();
    copyTextToClipboard(text);
    noti.success('Copy success');
});

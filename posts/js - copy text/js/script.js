const btnCopy = document.querySelector('#btnCopy');
const demoTextInput = document.querySelector('#demoTextInput');

btnCopy.addEventListener('click', () => {
    const text = demoTextInput.value.trim();
    copyTextToClipboard(text);
    noti.success('Copy text thành công');
});

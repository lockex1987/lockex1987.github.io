// https://css-tricks.com/how-to-create-actions-for-selected-text-with-the-selection-api/
const control = document.importNode(document.querySelector('template').content, true).childNodes[0];


document.querySelector('#demoArea').onpointerup = () => {
    const selection = document.getSelection();
    const text = selection.toString();
    if (text !== '') {
        const rect = selection.getRangeAt(0).getBoundingClientRect();
        control.style.top = `calc(${rect.top}px - 48px)`;
        control.style.left = `calc(${rect.left}px + calc(${rect.width}px / 2) - 40px)`;
        control.text = text;
        document.body.appendChild(control);
    }
};

control.addEventListener('pointerdown', oncontroldown, true);

function oncontroldown(evt) {
    evt.stopPropagation();
    window.open(`https://twitter.com/intent/tweet?text=${this.text}`);

    // this.remove();
    document.getSelection().removeAllRanges();
}

document.onpointerdown = () => {
    const control = document.querySelector('#control');
    if (control !== null) {
        // control.remove();
        document.getSelection().removeAllRanges();
    }
};

// We just need the length of the string as a CSS variable...
[...document.querySelectorAll('.data-fit-text')].forEach(el => {
    el.style.setProperty('--length', el.innerText.length);
});